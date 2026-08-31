import { ZONE_ANCHORS } from "@/lib/nmap/sample-network";
import type { GraphLink, GraphNode, HostKind } from "@/lib/nmap/types";

export interface SimNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
  r: number;
  data: GraphNode;
}

interface SimLink {
  source: SimNode;
  target: SimNode;
  label: string;
  proto: string;
}

export interface EngineColors {
  bg: string;
  edge: string;
  edgeActive: string;
  edgeLabel: string;
  nodeLabel: string;
  muted: string;
  highlight: string;
  selected: string;
  kinds: Record<HostKind, string>;
  up: string;
  down: string;
  filtered: string;
}

const KIND_RADIUS: Record<HostKind, number> = {
  internet: 18,
  gateway: 14,
  firewall: 15,
  switch: 13,
  server: 12,
  workstation: 10,
  iot: 9,
  cloud: 14,
};

function readColors(el: HTMLElement): EngineColors {
  const s = getComputedStyle(el);
  const v = (name: string, fallback: string) => {
    const raw = s.getPropertyValue(name).trim();
    return raw || fallback;
  };
  return {
    bg: v("--color-background", "#090a0b"),
    edge: v("--color-graph-edge", "rgba(230,228,223,0.14)"),
    edgeActive: v("--color-graph-edge-active", "rgba(138,164,179,0.7)"),
    edgeLabel: v("--color-graph-edge-label", "rgba(230,228,223,0.48)"),
    nodeLabel: v("--color-foreground", "#e6e4df"),
    muted: v("--color-muted-foreground", "#8b8e92"),
    highlight: v("--color-graph-highlight", "#c5d4dc"),
    selected: v("--color-primary", "#d5d2cb"),
    kinds: {
      internet: v("--color-graph-internet", "#9aa3ab"),
      gateway: v("--color-graph-gateway", "#8aa4b3"),
      firewall: v("--color-graph-firewall", "#b08980"),
      switch: v("--color-graph-switch", "#7a8f9a"),
      server: v("--color-graph-server", "#7d9a8c"),
      workstation: v("--color-graph-workstation", "#9a9b96"),
      iot: v("--color-graph-iot", "#8a8078"),
      cloud: v("--color-graph-cloud", "#7a90a8"),
    },
    up: v("--color-status-up", "#7d9a8c"),
    down: v("--color-status-down", "#b08980"),
    filtered: v("--color-status-filtered", "#a09070"),
  };
}

export class GraphEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  nodes: SimNode[] = [];
  links: SimLink[] = [];
  nodeById = new Map<string, SimNode>();
  tx = 0;
  ty = 0;
  k = 1;
  alpha = 1;
  frozen = false;
  search = "";
  selectedId: string | null = null;
  hoverId: string | null = null;
  activeHostId: string | null = null;
  width = 0;
  height = 0;
  dpr = 1;
  insets = { left: 320, right: 56, top: 56, bottom: 188 };
  private raf = 0;
  private colors: EngineColors;
  private dragging: SimNode | null = null;
  private panning = false;
  private lastX = 0;
  private lastY = 0;
  private pointers = new Map<number, { x: number; y: number }>();
  private pinchDist = 0;
  private running = false;
  private onSelect: (id: string | null) => void;
  private onHover: (node: GraphNode | null, sx: number, sy: number) => void;
  private ro: ResizeObserver;

  constructor(
    canvas: HTMLCanvasElement,
    handlers: {
      onSelect: (id: string | null) => void;
      onHover: (node: GraphNode | null, sx: number, sy: number) => void;
    },
  ) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) throw new Error("canvas");
    this.ctx = ctx;
    this.onSelect = handlers.onSelect;
    this.onHover = handlers.onHover;
    this.colors = readColors(canvas);
    const mobile = typeof window !== "undefined" && window.innerWidth < 768;
    this.insets = mobile
      ? { left: 12, right: 48, top: 56, bottom: 72 }
      : { left: 320, right: 56, top: 56, bottom: 188 };
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement ?? canvas);
    this.bind();
    this.resize();
  }

  setGraph(nodes: GraphNode[], links: GraphLink[]) {
    const prev = this.nodeById;
    this.nodes = nodes.map((data) => {
      const old = prev.get(data.id);
      const anchor = ZONE_ANCHORS[data.zone] ?? { x: 0, y: 0 };
      const r = KIND_RADIUS[data.kind];
      if (old) {
        old.data = data;
        old.r = r;
        return old;
      }
      return {
        id: data.id,
        x: anchor.x + (Math.random() - 0.5) * 80,
        y: anchor.y + (Math.random() - 0.5) * 80,
        vx: 0,
        vy: 0,
        fx: null,
        fy: null,
        r,
        data,
      };
    });
    this.nodeById = new Map(this.nodes.map((n) => [n.id, n]));
    this.links = [];
    for (const l of links) {
      const s = this.nodeById.get(l.source);
      const t = this.nodeById.get(l.target);
      if (s && t) this.links.push({ source: s, target: t, label: l.label, proto: l.proto });
    }
    this.alpha = Math.max(this.alpha, 0.4);
    if (this.k === 1 && this.tx === 0 && this.ty === 0) this.fit();
  }

  setSearch(q: string) {
    this.search = q.trim().toLowerCase();
  }
  setFrozen(v: boolean) {
    this.frozen = v;
    if (!v) this.alpha = Math.max(this.alpha, 0.15);
  }
  setSelected(id: string | null) {
    this.selectedId = id;
  }
  setActiveHost(id: string | null) {
    this.activeHostId = id;
  }

  setInsets(next: { left: number; right: number; top: number; bottom: number }) {
    this.insets = next;
  }

  restart() {
    this.frozen = false;
    this.alpha = 1;
    for (const n of this.nodes) {
      if (this.dragging === n) continue;
      n.fx = null;
      n.fy = null;
      n.vx += (Math.random() - 0.5) * 8;
      n.vy += (Math.random() - 0.5) * 8;
    }
  }

  fit() {
    if (!this.nodes.length || !this.width) return;
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    for (const n of this.nodes) {
      minX = Math.min(minX, n.x - n.r);
      minY = Math.min(minY, n.y - n.r);
      maxX = Math.max(maxX, n.x + n.r);
      maxY = Math.max(maxY, n.y + n.r);
    }
    const bw = maxX - minX || 1;
    const bh = maxY - minY || 1;
    const { left, right, top, bottom } = this.insets;
    const availW = Math.max(120, this.width - left - right);
    const availH = Math.max(120, this.height - top - bottom);
    const k = Math.min(availW / bw, availH / bh, 2.2);
    this.k = Math.max(0.25, k * 0.92);
    this.tx = left + availW / 2 - ((minX + maxX) / 2) * this.k;
    this.ty = top + availH / 2 - ((minY + maxY) / 2) * this.k;
  }

  zoomAt(sx: number, sy: number, factor: number) {
    const wx = (sx - this.tx) / this.k;
    const wy = (sy - this.ty) / this.k;
    this.k = Math.min(6, Math.max(0.18, this.k * factor));
    this.tx = sx - wx * this.k;
    this.ty = sy - wy * this.k;
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      if (!this.frozen && this.alpha > 0.012) this.tick();
      this.draw();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  destroy() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.unbind();
  }

  private resize() {
    const parent = this.canvas.parentElement ?? this.canvas;
    const rect = parent.getBoundingClientRect();
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.colors = readColors(this.canvas);
  }

  private tick() {
    const nodes = this.nodes;
    const n = nodes.length;
    const charge = -220;
    const alpha = this.alpha;

    for (let i = 0; i < n; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < n; j++) {
        const b = nodes[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let dist2 = dx * dx + dy * dy;
        if (dist2 < 0.01) {
          dx = (Math.random() - 0.5) * 0.4;
          dy = (Math.random() - 0.5) * 0.4;
          dist2 = dx * dx + dy * dy;
        }
        const dist = Math.sqrt(dist2);
        const minD = a.r + b.r + 18;
        let f = (charge * alpha) / dist2;
        if (dist < minD) f -= ((minD - dist) * 0.35) / dist;
        const fx = (dx / dist) * f;
        const fy = (dy / dist) * f;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }
    }

    for (const l of this.links) {
      const a = l.source;
      const b = l.target;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const rest = 92 + a.r + b.r;
      const kSpring = 0.045 * alpha;
      const f = (dist - rest) * kSpring;
      const fx = (dx / dist) * f;
      const fy = (dy / dist) * f;
      a.vx += fx;
      a.vy += fy;
      b.vx -= fx;
      b.vy -= fy;
    }

    for (const node of nodes) {
      const anchor = ZONE_ANCHORS[node.data.zone];
      if (anchor) {
        node.vx += (anchor.x - node.x) * 0.012 * alpha;
        node.vy += (anchor.y - node.y) * 0.012 * alpha;
      }
      node.vx += -node.x * 0.002 * alpha;
      node.vy += -node.y * 0.002 * alpha;

      if (node.fx != null) {
        node.x = node.fx;
        node.vx = 0;
      } else {
        node.vx *= 0.82;
        node.x += node.vx;
      }
      if (node.fy != null) {
        node.y = node.fy;
        node.vy = 0;
      } else {
        node.vy *= 0.82;
        node.y += node.vy;
      }
    }

    this.alpha *= 0.985;
  }

  private matches(node: SimNode): boolean {
    const q = this.search;
    if (!q) return true;
    const d = node.data;
    if (d.hostname.toLowerCase().includes(q) || d.ip.includes(q) || d.os.toLowerCase().includes(q)) return true;
    if (d.kind.includes(q) || d.zone.includes(q)) return true;
    return d.ports.some((p) => p.service.includes(q) || String(p.port).includes(q));
  }

  private draw() {
    const { ctx, width, height, colors, k } = this;
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, width, height);

    this.drawGrid();

    ctx.save();
    ctx.translate(this.tx, this.ty);
    ctx.scale(k, k);

    const searching = this.search.length > 0;
    const showEdgeLabels = k > 0.72;
    const showNodeLabels = k > 0.48;

    for (const l of this.links) {
      const a = l.source;
      const b = l.target;
      const aHit = !searching || this.matches(a);
      const bHit = !searching || this.matches(b);
      const hot =
        this.selectedId === a.id ||
        this.selectedId === b.id ||
        this.hoverId === a.id ||
        this.hoverId === b.id;
      ctx.globalAlpha = searching && !(aHit && bHit) ? 0.08 : hot ? 0.95 : 0.55;
      ctx.strokeStyle = hot ? colors.edgeActive : colors.edge;
      ctx.lineWidth = (hot ? 1.6 : 1) / k;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      if (showEdgeLabels && (!searching || (aHit && bHit))) {
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        ctx.save();
        ctx.globalAlpha = hot ? 0.9 : 0.55;
        ctx.font = `${11 / k}px "IBM Plex Mono", ui-monospace, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const padX = 4 / k;
        const tw = ctx.measureText(l.label).width;
        ctx.fillStyle = colors.bg;
        ctx.fillRect(mx - tw / 2 - padX, my - 7 / k, tw + padX * 2, 14 / k);
        ctx.fillStyle = colors.edgeLabel;
        ctx.fillText(l.label, mx, my);
        ctx.restore();
      }
    }

    ctx.globalAlpha = 1;
    for (const node of this.nodes) {
      const hit = this.matches(node);
      const dim = searching && !hit;
      ctx.globalAlpha = dim ? 0.16 : 1;
      this.drawNode(node, hit && searching, k);
    }

    if (showNodeLabels) {
      ctx.font = `${12 / k}px "IBM Plex Sans", system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (const node of this.nodes) {
        const hit = this.matches(node);
        if (searching && !hit) continue;
        ctx.globalAlpha = 0.88;
        ctx.fillStyle = colors.nodeLabel;
        ctx.fillText(node.data.hostname.split(".")[0] ?? node.data.hostname, node.x, node.y + node.r + 5 / k);
        ctx.font = `${10 / k}px "IBM Plex Mono", ui-monospace, monospace`;
        ctx.fillStyle = colors.muted;
        ctx.fillText(node.data.ip, node.x, node.y + node.r + 18 / k);
        ctx.font = `${12 / k}px "IBM Plex Sans", system-ui, sans-serif`;
      }
    }

    ctx.restore();
    ctx.globalAlpha = 1;
  }

  private drawGrid() {
    const { ctx, width, height, colors, k, tx, ty } = this;
    const step = 48 * k;
    if (step < 18) return;
    ctx.save();
    ctx.strokeStyle = colors.edge;
    ctx.globalAlpha = 0.18;
    ctx.lineWidth = 1;
    const ox = ((tx % step) + step) % step;
    const oy = ((ty % step) + step) % step;
    ctx.beginPath();
    for (let x = ox; x < width; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = oy; y < height; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  private drawNode(node: SimNode, searched: boolean, k: number) {
    const { ctx, colors } = this;
    const { x, y, r, data } = node;
    const fill = colors.kinds[data.kind];
    const selected = this.selectedId === node.id;
    const hover = this.hoverId === node.id;
    const active = this.activeHostId === node.id;

    if (selected || searched || active) {
      ctx.beginPath();
      ctx.arc(x, y, r + 8 / k, 0, Math.PI * 2);
      ctx.strokeStyle = searched ? colors.highlight : selected ? colors.selected : colors.edgeActive;
      ctx.globalAlpha = active ? 0.9 : searched ? 1 : 0.7;
      ctx.lineWidth = (searched ? 3 : 2) / k;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = fill;
    ctx.strokeStyle = hover || selected ? colors.selected : colors.bg;
    ctx.lineWidth = 1.4 / k;
    this.kindPath(data.kind, x, y, r);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x + r * 0.55, y - r * 0.55, 2.4, 0, Math.PI * 2);
    ctx.fillStyle = data.status === "up" ? colors.up : data.status === "down" ? colors.down : colors.filtered;
    ctx.fill();

    if (data.findings.some((f) => f.severity === "critical" || f.severity === "high")) {
      ctx.beginPath();
      ctx.arc(x - r * 0.55, y - r * 0.55, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = colors.down;
      ctx.fill();
    }
  }

  private kindPath(kind: HostKind, x: number, y: number, r: number) {
    const ctx = this.ctx;
    ctx.beginPath();
    if (kind === "firewall") {
      hex(ctx, x, y, r);
    } else if (kind === "gateway" || kind === "cloud") {
      diamond(ctx, x, y, r);
    } else if (kind === "switch") {
      roundRect(ctx, x - r, y - r * 0.7, r * 2, r * 1.4, r * 0.25);
    } else if (kind === "iot") {
      ctx.rect(x - r * 0.85, y - r * 0.85, r * 1.7, r * 1.7);
    } else if (kind === "internet") {
      ctx.arc(x, y, r, 0, Math.PI * 2);
    } else {
      ctx.arc(x, y, r, 0, Math.PI * 2);
    }
  }

  private hit(sx: number, sy: number): SimNode | null {
    const wx = (sx - this.tx) / this.k;
    const wy = (sy - this.ty) / this.k;
    let best: SimNode | null = null;
    let bestD = Infinity;
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i];
      const dx = n.x - wx;
      const dy = n.y - wy;
      const d = dx * dx + dy * dy;
      const rr = (n.r + 6) * (n.r + 6);
      if (d <= rr && d < bestD) {
        best = n;
        bestD = d;
      }
    }
    return best;
  }

  private bind() {
    this.canvas.addEventListener("pointerdown", this.onPointerDown);
    this.canvas.addEventListener("pointermove", this.onPointerMove);
    this.canvas.addEventListener("pointerup", this.onPointerUp);
    this.canvas.addEventListener("pointercancel", this.onPointerUp);
    this.canvas.addEventListener("pointerleave", this.onPointerLeave);
    this.canvas.addEventListener("wheel", this.onWheel, { passive: false });
    this.canvas.addEventListener("dblclick", this.onDblClick);
  }

  private unbind() {
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerup", this.onPointerUp);
    this.canvas.removeEventListener("pointercancel", this.onPointerUp);
    this.canvas.removeEventListener("pointerleave", this.onPointerLeave);
    this.canvas.removeEventListener("wheel", this.onWheel);
    this.canvas.removeEventListener("dblclick", this.onDblClick);
  }

  private onPointerDown = (e: PointerEvent) => {
    this.canvas.setPointerCapture(e.pointerId);
    this.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });
    if (this.pointers.size === 2) {
      const pts = [...this.pointers.values()];
      this.pinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      this.dragging = null;
      this.panning = false;
      return;
    }
    const hit = this.hit(e.offsetX, e.offsetY);
    this.lastX = e.offsetX;
    this.lastY = e.offsetY;
    if (hit) {
      this.dragging = hit;
      hit.fx = hit.x;
      hit.fy = hit.y;
      this.alpha = Math.max(this.alpha, 0.25);
    } else {
      this.panning = true;
    }
  };

  private onPointerMove = (e: PointerEvent) => {
    if (this.pointers.has(e.pointerId)) this.pointers.set(e.pointerId, { x: e.offsetX, y: e.offsetY });
    if (this.pointers.size === 2) {
      const pts = [...this.pointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (this.pinchDist > 0 && dist > 0) {
        const midX = (pts[0].x + pts[1].x) / 2;
        const midY = (pts[0].y + pts[1].y) / 2;
        this.zoomAt(midX, midY, dist / this.pinchDist);
      }
      this.pinchDist = dist;
      return;
    }
    if (this.dragging) {
      const wx = (e.offsetX - this.tx) / this.k;
      const wy = (e.offsetY - this.ty) / this.k;
      this.dragging.fx = wx;
      this.dragging.fy = wy;
      this.dragging.x = wx;
      this.dragging.y = wy;
      this.alpha = Math.max(this.alpha, 0.2);
      return;
    }
    if (this.panning) {
      this.tx += e.offsetX - this.lastX;
      this.ty += e.offsetY - this.lastY;
      this.lastX = e.offsetX;
      this.lastY = e.offsetY;
      return;
    }
    const hit = this.hit(e.offsetX, e.offsetY);
    const id = hit?.id ?? null;
    if (id !== this.hoverId) {
      this.hoverId = id;
      this.canvas.style.cursor = hit ? "grab" : "default";
    }
    this.onHover(hit?.data ?? null, e.clientX, e.clientY);
  };

  private onPointerUp = (e: PointerEvent) => {
    const wasDrag = this.dragging;
    const moved =
      Math.abs(e.offsetX - this.lastX) + Math.abs(e.offsetY - this.lastY) > 4 || this.panning;
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinchDist = 0;
    if (wasDrag) {
      wasDrag.fx = null;
      wasDrag.fy = null;
      if (!moved) {
        this.selectedId = wasDrag.id;
        this.onSelect(wasDrag.id);
      }
    } else if (!moved && this.pointers.size === 0) {
      this.selectedId = null;
      this.onSelect(null);
    }
    this.dragging = null;
    this.panning = false;
    try {
      this.canvas.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  private onPointerLeave = () => {
    this.hoverId = null;
    this.onHover(null, 0, 0);
  };

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 0.92;
    this.zoomAt(e.offsetX, e.offsetY, factor);
  };

  private onDblClick = (e: MouseEvent) => {
    const hit = this.hit(e.offsetX, e.offsetY);
    if (hit) {
      this.k = Math.min(3.2, this.k * 1.4);
      this.tx = this.width / 2 - hit.x * this.k;
      this.ty = this.height / 2 - hit.y * this.k;
    } else {
      this.fit();
    }
  };
}

function hex(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.moveTo(x + r, y);
  for (let i = 1; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
  }
  ctx.closePath();
}

function diamond(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.moveTo(x, y - r);
  ctx.lineTo(x + r, y);
  ctx.lineTo(x, y + r);
  ctx.lineTo(x - r, y);
  ctx.closePath();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

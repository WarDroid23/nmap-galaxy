import { useEffect, useRef, useState } from "react";
import { GraphEngine } from "@/lib/graph/force-engine";
import type { GraphNode } from "@/lib/nmap/types";
import { KIND_LABEL } from "@/lib/nmap/sample-network";
import { useWorkspace } from "@/store/workspace";
import { registerEngine } from "./engine-bridge";

export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GraphEngine | null>(null);
  const didFit = useRef(false);
  const [tip, setTip] = useState<{ node: GraphNode; x: number; y: number } | null>(null);

  const nodes = useWorkspace((s) => s.nodes);
  const links = useWorkspace((s) => s.links);
  const search = useWorkspace((s) => s.search);
  const frozen = useWorkspace((s) => s.frozen);
  const simNonce = useWorkspace((s) => s.simNonce);
  const fitNonce = useWorkspace((s) => s.fitNonce);
  const selectedId = useWorkspace((s) => s.selectedNodeId);
  const activeHostId = useWorkspace((s) => s.activeHostId);
  const selectNode = useWorkspace((s) => s.selectNode);
  const leftOpen = useWorkspace((s) => s.leftOpen);
  const terminalOpen = useWorkspace((s) => s.terminalOpen);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const instance = new GraphEngine(canvas, {
      onSelect: selectNode,
      onHover: (node, x, y) => {
        setTip(node ? { node, x, y } : null);
      },
    });
    engineRef.current = instance;
    registerEngine(instance);
    instance.start();
    return () => {
      registerEngine(null);
      instance.destroy();
      engineRef.current = null;
    };
  }, [selectNode]);

  useEffect(() => {
    engineRef.current?.setGraph(nodes, links);
  }, [nodes, links]);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const left = !mobile && leftOpen ? 320 : 12;
    const right = !mobile && selectedId ? 320 : 52;
    const bottom = terminalOpen ? 196 : 64;
    const engine = engineRef.current;
    if (!engine) return;
    engine.setInsets({ left, right, top: 56, bottom });
    if (!didFit.current && engine.nodes.length) {
      engine.fit();
      didFit.current = true;
    }
  }, [leftOpen, terminalOpen, selectedId, nodes]);

  useEffect(() => {
    engineRef.current?.setSearch(search);
  }, [search]);

  useEffect(() => {
    engineRef.current?.setFrozen(frozen);
  }, [frozen]);

  useEffect(() => {
    engineRef.current?.setSelected(selectedId);
  }, [selectedId]);

  useEffect(() => {
    engineRef.current?.setActiveHost(activeHostId);
  }, [activeHostId]);

  useEffect(() => {
    if (simNonce > 0) engineRef.current?.restart();
  }, [simNonce]);

  useEffect(() => {
    if (fitNonce > 0) engineRef.current?.fit();
  }, [fitNonce]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full touch-none"
        aria-label="Síťový graf"
      />
      {tip ? (
        <div
          className="pointer-events-none fixed z-30 max-w-xs rounded-lg bg-card px-3 py-2 text-xs text-card-foreground shadow-[var(--shadow-border)]"
          style={{ left: tip.x + 14, top: tip.y + 14 }}
        >
          <div className="font-medium">{tip.node.hostname}</div>
          <div className="font-mono text-muted-foreground">{tip.node.ip}</div>
          <div className="mt-1 text-muted-foreground">
            {KIND_LABEL[tip.node.kind]} · {tip.node.os}
          </div>
        </div>
      ) : null}
    </>
  );
}

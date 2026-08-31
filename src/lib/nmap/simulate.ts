import { LAB_FINDINGS } from "./sample-network";
import type { GraphNode, ScanEvent, ScriptFinding } from "./types";

function stamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())} CEST`;
}

export function timingDelay(timing: number): number {
  return [90, 70, 48, 28, 16, 8][Math.max(0, Math.min(5, timing))] ?? 16;
}

export async function* runScan(opts: {
  target: string;
  command: string;
  nodes: GraphNode[];
  selectedScripts: string[];
  signal: AbortSignal;
  delay: number;
}): AsyncGenerator<ScanEvent> {
  const { target, command, nodes, selectedScripts, signal, delay } = opts;
  const sleep = (ms: number) =>
    new Promise<void>((resolve, reject) => {
      const t = window.setTimeout(resolve, ms);
      const onAbort = () => {
        window.clearTimeout(t);
        reject(new DOMException("aborted", "AbortError"));
      };
      if (signal.aborted) {
        window.clearTimeout(t);
        reject(new DOMException("aborted", "AbortError"));
        return;
      }
      signal.addEventListener("abort", onAbort, { once: true });
    });

  const hosts = nodes.filter((n) => n.kind !== "internet");
  yield { type: "line", text: `Starting Nmap 7.95 ( https://nmap.org ) at ${stamp()}` };
  yield { type: "line", text: `Nmap scan initiated as: ${command}` };
  await sleep(delay);
  yield {
    type: "line",
    text: `Initiating Ping Scan at ${stamp().slice(11, 16)}`,
  };
  yield { type: "line", text: `Scanning ${target} [${hosts.length} hosts]` };
  await sleep(delay);

  const wantVuln =
    selectedScripts.includes("vuln") ||
    selectedScripts.includes("all") ||
    selectedScripts.some((s) => s.startsWith("smb-vuln") || s.startsWith("http-vuln") || s === "vulners");

  for (const host of hosts) {
    if (signal.aborted) return;
    yield { type: "host", id: host.id };
    yield { type: "line", text: "" };
    yield { type: "line", text: `Nmap scan report for ${host.hostname} (${host.ip})` };
    yield {
      type: "line",
      text: `Host is up (${(host.latencyMs / 1000).toFixed(4)}s latency).`,
    };
    await sleep(delay);

    const closed = Math.max(0, 1000 - host.ports.length);
    if (host.ports.length) {
      yield { type: "line", text: `Not shown: ${closed} closed tcp ports` };
      yield { type: "line", text: "PORT      STATE SERVICE        VERSION" };
      for (const p of host.ports) {
        const left = `${p.port}/${p.proto}`.padEnd(9);
        const mid = p.state.padEnd(5);
        const svc = p.service.padEnd(14);
        yield { type: "line", text: `${left} ${mid} ${svc} ${p.version ?? ""}`.trimEnd() };
        await sleep(Math.max(4, delay * 0.35));
      }
    } else {
      yield { type: "line", text: "All 1000 scanned ports on this host are closed" };
    }

    yield { type: "line", text: `MAC Address: ${host.mac ?? "unknown"}` };
    yield { type: "line", text: `OS details: ${host.os}` };

    const findings = findingsFor(host.id, selectedScripts, wantVuln);
    for (const f of findings) {
      await sleep(delay);
      yield { type: "line", text: `| ${f.script}:` };
      for (const line of f.output.split("\n")) {
        yield { type: "line", text: `|   ${line}` };
      }
      yield { type: "finding", id: host.id, finding: f };
    }
  }

  await sleep(delay);
  yield { type: "line", text: "" };
  yield {
    type: "line",
    text: `Nmap done: ${hosts.length} IP addresses (${hosts.length} hosts up) scanned in ${(hosts.length * delay) / 1000 + 0.8} seconds`,
  };
  yield { type: "done" };
}

function findingsFor(id: string, selected: string[], wantVuln: boolean): ScriptFinding[] {
  const lab = LAB_FINDINGS[id];
  if (!lab) return [];
  if (selected.includes("all") || selected.length === 0) return wantVuln ? lab : lab.filter((f) => f.severity === "info");
  return lab.filter((f) => {
    if (selected.includes(f.script)) return true;
    if (wantVuln && (f.severity === "high" || f.severity === "critical" || f.severity === "medium")) return true;
    if (selected.includes("default") && f.severity === "info") return true;
    if (selected.includes("discovery") && f.severity === "info") return true;
    return false;
  });
}

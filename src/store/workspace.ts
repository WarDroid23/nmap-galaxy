import { create } from "zustand";
import { buildNmapCommand } from "@/lib/nmap/command";
import { SCAN_PROFILES } from "@/lib/nmap/profiles";
import { cloneSampleNetwork } from "@/lib/nmap/sample-network";
import { CATEGORY_SCRIPTS, NSE_SCRIPTS } from "@/lib/nmap/scripts";
import { runScan, timingDelay } from "@/lib/nmap/simulate";
import type { GraphLink, GraphNode, ScriptFinding } from "@/lib/nmap/types";

const sample = cloneSampleNetwork();

interface WorkspaceState {
  target: string;
  profileId: string;
  timing: number;
  ports: string;
  selectedScripts: string[];
  syn: boolean;
  version: boolean;
  osDetect: boolean;
  aggressive: boolean;
  skipPing: boolean;
  nodes: GraphNode[];
  links: GraphLink[];
  selectedNodeId: string | null;
  search: string;
  frozen: boolean;
  simNonce: number;
  fitNonce: number;
  isScanning: boolean;
  progress: number;
  output: string[];
  activeHostId: string | null;
  leftOpen: boolean;
  leftUserToggled: boolean;
  leftTab: "scan" | "scripts";
  terminalOpen: boolean;
  scriptQuery: string;
  scriptCategory: string;
  setTarget: (v: string) => void;
  setProfile: (id: string) => void;
  setTiming: (n: number) => void;
  setPorts: (v: string) => void;
  toggleFlag: (key: "syn" | "version" | "osDetect" | "aggressive" | "skipPing") => void;
  toggleScript: (name: string) => void;
  selectCategory: (cat: string) => void;
  clearScripts: () => void;
  setSearch: (v: string) => void;
  selectNode: (id: string | null) => void;
  setFrozen: (v: boolean) => void;
  toggleFrozen: () => void;
  restartSim: () => void;
  fitGraph: () => void;
  setLeftOpen: (v: boolean) => void;
  setLeftTab: (t: "scan" | "scripts") => void;
  setTerminalOpen: (v: boolean) => void;
  setScriptQuery: (v: string) => void;
  setScriptCategory: (v: string) => void;
  startScan: () => void;
  stopScan: () => void;
  command: () => string;
}

let abort: AbortController | null = null;

export const useWorkspace = create<WorkspaceState>()((set, get) => ({
      target: "10.0.0.0/8",
      profileId: "intense",
      timing: 4,
      ports: "1-1024",
      selectedScripts: [...(CATEGORY_SCRIPTS.default ?? [])],
      syn: true,
      version: true,
      osDetect: true,
      aggressive: true,
      skipPing: false,
      nodes: sample.nodes,
      links: sample.links,
      selectedNodeId: null,
      search: "",
      frozen: false,
      simNonce: 0,
      fitNonce: 0,
      isScanning: false,
      progress: 0,
      output: [
        "# NEXUS lab — nmap 7.95",
        "# Topologie ACME.LAB je načtená. Upravte cíl a skripty, pak spusťte sken.",
        "# Simulace běží lokálně nad modelem sítě, ne proti živým hostitelům.",
      ],
      activeHostId: null,
      leftOpen: true,
      leftUserToggled: false,
      leftTab: "scan",
      terminalOpen: true,
      scriptQuery: "",
      scriptCategory: "all",
      setTarget: (target) => set({ target }),
      setProfile: (profileId) => {
        const p = SCAN_PROFILES.find((x) => x.id === profileId);
        if (!p) return;
        const scripts =
          p.defaultScripts.includes("all")
            ? NSE_SCRIPTS.map((s) => s.name)
            : p.defaultScripts.flatMap((c) => CATEGORY_SCRIPTS[c] ?? [c]);
        set({
          profileId,
          ports: p.ports || get().ports,
          selectedScripts: [...new Set(scripts)],
          aggressive: p.flags.includes("-A"),
          version: p.flags.includes("-sV") || p.flags.includes("-A"),
          osDetect: p.flags.includes("-O") || p.flags.includes("-A"),
          syn: p.flags.includes("-sS") || profileId !== "quick",
        });
      },
      setTiming: (timing) => set({ timing }),
      setPorts: (ports) => set({ ports }),
      toggleFlag: (key) => set({ [key]: !get()[key] }),
      toggleScript: (name) => {
        const cur = get().selectedScripts;
        set({
          selectedScripts: cur.includes(name) ? cur.filter((s) => s !== name) : [...cur, name],
        });
      },
      selectCategory: (cat) => {
        const names = CATEGORY_SCRIPTS[cat] ?? [];
        set({ selectedScripts: [...names] });
      },
      clearScripts: () => set({ selectedScripts: [] }),
      setSearch: (search) => set({ search }),
      selectNode: (selectedNodeId) => set({ selectedNodeId }),
      setFrozen: (frozen) => set({ frozen }),
      toggleFrozen: () => set({ frozen: !get().frozen }),
      restartSim: () => set({ frozen: false, simNonce: get().simNonce + 1 }),
      fitGraph: () => set({ fitNonce: get().fitNonce + 1 }),
      setLeftOpen: (leftOpen) => set({ leftOpen, leftUserToggled: true }),
      setLeftTab: (leftTab) => set({ leftTab, leftOpen: true, leftUserToggled: true }),
      setTerminalOpen: (terminalOpen) => set({ terminalOpen }),
      setScriptQuery: (scriptQuery) => set({ scriptQuery }),
      setScriptCategory: (scriptCategory) => set({ scriptCategory }),
      command: () => {
        const s = get();
        return buildNmapCommand({
          target: s.target,
          profileId: s.profileId,
          timing: s.timing,
          ports: s.ports,
          selectedScripts: s.selectedScripts,
          syn: s.syn,
          version: s.version,
          osDetect: s.osDetect,
          aggressive: s.aggressive,
          skipPing: s.skipPing,
        });
      },
      stopScan: () => {
        abort?.abort();
        abort = null;
        set({ isScanning: false, activeHostId: null });
      },
      startScan: () => {
        abort?.abort();
        abort = new AbortController();
        const signal = abort.signal;
        const s = get();
        const command = s.command();
        const fresh = cloneSampleNetwork();
        set({
          isScanning: true,
          progress: 0,
          output: [],
          nodes: fresh.nodes,
          links: fresh.links,
          activeHostId: null,
          terminalOpen: true,
        });
        const hostCount = fresh.nodes.filter((n) => n.kind !== "internet").length;
        let seen = 0;
        void (async () => {
          try {
            for await (const ev of runScan({
              target: s.target,
              command,
              nodes: fresh.nodes,
              selectedScripts: s.selectedScripts,
              signal,
              delay: timingDelay(s.timing),
            })) {
              if (ev.type === "line") {
                set((st) => ({ output: pushLine(st.output, ev.text) }));
              } else if (ev.type === "host") {
                seen += 1;
                set({ activeHostId: ev.id, progress: seen / hostCount, selectedNodeId: ev.id });
              } else if (ev.type === "finding") {
                set((st) => ({
                  nodes: st.nodes.map((n) =>
                    n.id === ev.id ? { ...n, findings: appendFinding(n.findings, ev.finding) } : n,
                  ),
                }));
              } else if (ev.type === "done") {
                set({ isScanning: false, activeHostId: null, progress: 1 });
              }
            }
          } catch (err) {
            if (err instanceof DOMException && err.name === "AbortError") {
              set((st) => ({
                isScanning: false,
                activeHostId: null,
                output: pushLine(st.output, "# sken přerušen"),
              }));
              return;
            }
            set({ isScanning: false, activeHostId: null });
          }
        })();
      },
    }),
);

function pushLine(lines: string[], line: string): string[] {
  const next = lines.length > 800 ? lines.slice(-700) : lines.slice();
  next.push(line);
  return next;
}

function appendFinding(list: ScriptFinding[], f: ScriptFinding): ScriptFinding[] {
  if (list.some((x) => x.script === f.script)) return list;
  return [...list, f];
}

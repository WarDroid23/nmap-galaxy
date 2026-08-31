import { useEffect } from "react";
import { NetworkCanvas } from "@/components/graph/NetworkCanvas";
import { GraphControls } from "@/components/workspace/GraphControls";
import { NodeDetails } from "@/components/workspace/NodeDetails";
import { ScanDock } from "@/components/workspace/ScanDock";
import { Terminal } from "@/components/workspace/Terminal";
import { TopBar } from "@/components/workspace/TopBar";
import { useWorkspace } from "@/store/workspace";

export function Workspace() {
  const toggleFrozen = useWorkspace((s) => s.toggleFrozen);
  const restartSim = useWorkspace((s) => s.restartSim);
  const selectNode = useWorkspace((s) => s.selectNode);
  const setLeftOpen = useWorkspace((s) => s.setLeftOpen);
  const startScan = useWorkspace((s) => s.startScan);
  const stopScan = useWorkspace((s) => s.stopScan);
  const isScanning = useWorkspace((s) => s.isScanning);

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      const s = useWorkspace.getState();
      s.setLeftOpen(false);
      s.setTerminalOpen(false);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (e.key === "Escape") {
        selectNode(null);
        if (window.matchMedia("(max-width: 767px)").matches) setLeftOpen(false);
        return;
      }
      if (typing) return;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        toggleFrozen();
      } else if (e.key === "r" || e.key === "R") {
        restartSim();
      } else if (e.key === "/") {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>('input[aria-label="Hledat uzly"]');
        input?.focus();
      } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isScanning) stopScan();
        else startScan();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleFrozen, restartSim, selectNode, setLeftOpen, startScan, stopScan, isScanning]);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-background text-foreground">
      <NetworkCanvas />
      <div className="pointer-events-none absolute inset-0 flex flex-col">
        <TopBar />
        <div className="relative min-h-0 flex-1">
          <ScanDock />
          <NodeDetails />
          <GraphControls />
        </div>
        <Terminal />
      </div>
    </div>
  );
}

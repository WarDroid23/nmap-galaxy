import { Focus, Minus, Pause, Play, Plus, RotateCcw } from "lucide-react";
import { zoomGraph } from "@/components/graph/engine-bridge";
import { Button } from "@/components/ui/button";
import { KIND_LABEL } from "@/lib/nmap/sample-network";
import type { HostKind } from "@/lib/nmap/types";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/store/workspace";

const LEGEND: HostKind[] = ["firewall", "gateway", "switch", "server", "workstation", "iot", "cloud"];

const KIND_CLASS: Record<HostKind, string> = {
  internet: "bg-graph-internet",
  gateway: "bg-graph-gateway",
  firewall: "bg-graph-firewall",
  switch: "bg-graph-switch",
  server: "bg-graph-server",
  workstation: "bg-graph-workstation",
  iot: "bg-graph-iot",
  cloud: "bg-graph-cloud",
};

export function GraphControls() {
  const frozen = useWorkspace((s) => s.frozen);
  const toggleFrozen = useWorkspace((s) => s.toggleFrozen);
  const restartSim = useWorkspace((s) => s.restartSim);
  const fitGraph = useWorkspace((s) => s.fitGraph);
  const leftOpen = useWorkspace((s) => s.leftOpen);
  const terminalOpen = useWorkspace((s) => s.terminalOpen);

  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute bottom-16 z-10 hidden flex-col gap-1.5 text-xs text-muted-foreground md:flex",
          leftOpen ? "left-80 ml-3" : "left-3",
          terminalOpen ? "bottom-52" : "bottom-16",
        )}
      >
        {LEGEND.map((k) => (
          <div key={k} className="flex items-center gap-2">
            <span className={`size-2.5 rounded-sm ${KIND_CLASS[k]}`} />
            <span>{KIND_LABEL[k]}</span>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "pointer-events-auto absolute right-3 z-10 flex flex-col gap-1",
          terminalOpen ? "bottom-52" : "bottom-16",
        )}
      >
        <Button type="button" variant="secondary" size="icon" onClick={fitGraph} aria-label="Přizpůsobit pohled">
          <Focus />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={toggleFrozen}
          aria-label={frozen ? "Spustit simulaci" : "Zmrazit simulaci"}
        >
          {frozen ? <Play /> : <Pause />}
        </Button>
        <Button type="button" variant="secondary" size="icon" onClick={restartSim} aria-label="Restartovat simulaci">
          <RotateCcw />
        </Button>
        <Button type="button" variant="secondary" size="icon" aria-label="Přiblížit" onClick={() => zoomGraph(1.15)}>
          <Plus />
        </Button>
        <Button type="button" variant="secondary" size="icon" aria-label="Oddálit" onClick={() => zoomGraph(0.87)}>
          <Minus />
        </Button>
      </div>
    </>
  );
}

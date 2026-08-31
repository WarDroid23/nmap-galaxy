import { Pause, Play, RotateCcw, ScanSearch, Search, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NSE_SCRIPTS } from "@/lib/nmap/scripts";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/store/workspace";

export function TopBar() {
  const search = useWorkspace((s) => s.search);
  const setSearch = useWorkspace((s) => s.setSearch);
  const frozen = useWorkspace((s) => s.frozen);
  const toggleFrozen = useWorkspace((s) => s.toggleFrozen);
  const restartSim = useWorkspace((s) => s.restartSim);
  const leftOpen = useWorkspace((s) => s.leftOpen);
  const setLeftOpen = useWorkspace((s) => s.setLeftOpen);
  const terminalOpen = useWorkspace((s) => s.terminalOpen);
  const setTerminalOpen = useWorkspace((s) => s.setTerminalOpen);
  const isScanning = useWorkspace((s) => s.isScanning);
  const progress = useWorkspace((s) => s.progress);
  const nodes = useWorkspace((s) => s.nodes);
  const selectedScripts = useWorkspace((s) => s.selectedScripts);

  const matchCount = search.trim()
    ? nodes.filter((n) => {
        const q = search.trim().toLowerCase();
        return (
          n.hostname.toLowerCase().includes(q) ||
          n.ip.includes(q) ||
          n.os.toLowerCase().includes(q) ||
          n.ports.some((p) => p.service.includes(q) || String(p.port).includes(q))
        );
      }).length
    : nodes.length;

  return (
    <header className="pointer-events-auto flex items-center gap-2 border-b border-border bg-background/85 px-3 py-2 backdrop-blur-sm md:gap-3 md:px-4">
      <button
        type="button"
        onClick={() => setLeftOpen(!leftOpen)}
        className="flex items-center gap-2 rounded-md px-1 py-1 text-left transition-[background-color,opacity] duration-150 hover:bg-muted"
        aria-label="Přepnout panel skenu"
      >
        <span className="font-display text-sm font-semibold tracking-tight text-foreground">NEXUS</span>
        <span className="hidden text-xs text-muted-foreground sm:inline">nmap lab</span>
      </button>

      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            const q = search.trim().toLowerCase();
            if (!q) return;
            const match = nodes.find(
              (n) =>
                n.hostname.toLowerCase().includes(q) ||
                n.ip.includes(q) ||
                n.os.toLowerCase().includes(q) ||
                n.ports.some((p) => p.service.includes(q) || String(p.port).includes(q)),
            );
            if (match) useWorkspace.getState().selectNode(match.id);
          }}
          placeholder="Hledat uzly, IP, služby…"
          className="h-10 pl-9 pr-16"
          aria-label="Hledat uzly"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs tabular-nums text-muted-foreground">
          {matchCount}/{nodes.length}
        </span>
      </div>

      <div className="hidden items-center gap-1 md:flex">
        <Button
          type="button"
          variant={frozen ? "secondary" : "outline"}
          size="sm"
          onClick={toggleFrozen}
          aria-pressed={frozen}
        >
          {frozen ? <Play /> : <Pause />}
          {frozen ? "Spustit" : "Zmrazit"}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={restartSim}>
          <RotateCcw />
          Restart
        </Button>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleFrozen}
        aria-label={frozen ? "Spustit simulaci" : "Zmrazit simulaci"}
      >
        {frozen ? <Play /> : <Pause />}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={restartSim}
        aria-label="Restartovat simulaci"
      >
        <RotateCcw />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setTerminalOpen(!terminalOpen)}
        aria-label="Terminál"
        aria-pressed={terminalOpen}
      >
        <TerminalSquare />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setLeftOpen(!leftOpen)}
        aria-label="Sken"
      >
        <ScanSearch />
      </Button>

      <div className="hidden items-center gap-2 font-mono text-xs tabular-nums text-muted-foreground lg:flex">
        <span>{selectedScripts.length}/{NSE_SCRIPTS.length} NSE</span>
        {isScanning ? (
          <span className={cn("text-accent")}>{Math.round(progress * 100)}%</span>
        ) : null}
      </div>
    </header>
  );
}

import { useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/store/workspace";

export function Terminal() {
  const open = useWorkspace((s) => s.terminalOpen);
  const setOpen = useWorkspace((s) => s.setTerminalOpen);
  const output = useWorkspace((s) => s.output);
  const isScanning = useWorkspace((s) => s.isScanning);
  const progress = useWorkspace((s) => s.progress);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [output.length, open]);

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 border-t border-border bg-background/90 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-3 py-1.5">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex min-h-10 flex-1 items-center gap-2 text-left text-xs text-muted-foreground"
        >
          {open ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
          <span className="font-mono">nmap</span>
          {isScanning ? (
            <span className="tabular-nums text-accent">{Math.round(progress * 100)}%</span>
          ) : (
            <span>výstup</span>
          )}
        </button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(!open)}>
          {open ? "Skrýt" : "Zobrazit"}
        </Button>
      </div>
      {open ? (
        <div className="max-h-40 overflow-auto px-4 pb-3 md:max-h-52">
          <pre className="font-mono text-xs leading-relaxed text-foreground">{output.join("\n")}</pre>
          <div ref={endRef} />
        </div>
      ) : null}
      {isScanning ? (
        <div className="h-0.5 bg-muted">
          <div
            className="h-full bg-accent transition-[width] duration-200 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}

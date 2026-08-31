import { Copy, Play, Square } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SCAN_PROFILES, TIMING_LABELS } from "@/lib/nmap/profiles";
import { NSE_SCRIPTS } from "@/lib/nmap/scripts";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/store/workspace";
import { ScriptCatalog } from "./ScriptCatalog";

export function ScanDock() {
  const leftOpen = useWorkspace((s) => s.leftOpen);
  const leftUserToggled = useWorkspace((s) => s.leftUserToggled);
  const leftTab = useWorkspace((s) => s.leftTab);
  const setLeftTab = useWorkspace((s) => s.setLeftTab);
  const setLeftOpen = useWorkspace((s) => s.setLeftOpen);
  const target = useWorkspace((s) => s.target);
  const setTarget = useWorkspace((s) => s.setTarget);
  const profileId = useWorkspace((s) => s.profileId);
  const setProfile = useWorkspace((s) => s.setProfile);
  const timing = useWorkspace((s) => s.timing);
  const setTiming = useWorkspace((s) => s.setTiming);
  const ports = useWorkspace((s) => s.ports);
  const setPorts = useWorkspace((s) => s.setPorts);
  const syn = useWorkspace((s) => s.syn);
  const version = useWorkspace((s) => s.version);
  const osDetect = useWorkspace((s) => s.osDetect);
  const aggressive = useWorkspace((s) => s.aggressive);
  const skipPing = useWorkspace((s) => s.skipPing);
  const toggleFlag = useWorkspace((s) => s.toggleFlag);
  const selectedScripts = useWorkspace((s) => s.selectedScripts);
  const isScanning = useWorkspace((s) => s.isScanning);
  const startScan = useWorkspace((s) => s.startScan);
  const stopScan = useWorkspace((s) => s.stopScan);
  const command = useWorkspace((s) => s.command());
  const [copied, setCopied] = useState(false);

  if (!leftOpen) return null;

  return (
    <aside className={cn(
      "pointer-events-auto absolute inset-y-0 left-0 z-20 flex w-full max-w-full flex-col border-r border-border bg-card/95 shadow-[var(--shadow-border)] backdrop-blur-sm max-md:top-14 max-md:h-[min(78dvh,640px)] md:w-80",
      !leftUserToggled && "max-md:hidden",
    )}>
      <div className="flex items-center gap-1 p-2 md:hidden">
        <Button type="button" variant="ghost" size="sm" className="ml-auto" onClick={() => setLeftOpen(false)}>
          Zavřít
        </Button>
      </div>
      <div className="flex gap-1 px-3 pt-3">
        {(
          [
            ["scan", "Sken"],
            ["scripts", `Skripty (${selectedScripts.length})`],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setLeftTab(id)}
            className={cn(
              "h-9 flex-1 rounded-md text-sm font-medium transition-[background-color,color] duration-150",
              leftTab === id ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {leftTab === "scripts" ? (
        <ScriptCatalog />
      ) : (
        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col gap-4 p-3 pb-6">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">Cíl</span>
              <Input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="10.0.0.0/8, host.acme.lab"
                className="font-mono text-sm"
              />
            </label>

            <div>
              <div className="mb-1.5 text-xs font-medium text-muted-foreground">Profil</div>
              <div className="grid grid-cols-2 gap-1.5">
                {SCAN_PROFILES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProfile(p.id)}
                    className={cn(
                      "rounded-lg px-2.5 py-2 text-left transition-[background-color,box-shadow] duration-150",
                      profileId === p.id
                        ? "bg-muted shadow-[var(--shadow-border-hover)]"
                        : "shadow-[var(--shadow-border)] hover:bg-muted/60",
                    )}
                  >
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{p.blurb}</div>
                  </button>
                ))}
              </div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">Porty</span>
              <Input
                value={ports}
                onChange={(e) => setPorts(e.target.value)}
                placeholder="1-1024, T:22,80,443"
                className="font-mono text-sm"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="flex justify-between text-xs font-medium text-muted-foreground">
                Časování
                <span className="font-mono tabular-nums text-foreground">{TIMING_LABELS[timing]}</span>
              </span>
              <input
                type="range"
                min={0}
                max={5}
                step={1}
                value={timing}
                onChange={(e) => setTiming(Number(e.target.value))}
                className="w-full accent-accent"
                aria-label="Časování T0 až T5"
              />
            </label>

            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  ["syn", "-sS", syn],
                  ["version", "-sV", version],
                  ["osDetect", "-O", osDetect],
                  ["aggressive", "-A", aggressive],
                  ["skipPing", "-Pn", skipPing],
                ] as const
              ).map(([key, label, on]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleFlag(key)}
                  className={cn(
                    "h-8 rounded-full px-3 font-mono text-xs transition-[background-color,color] duration-150",
                    on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <Separator />

            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Příkaz</span>
                <span className="font-mono tabular-nums">
                  {selectedScripts.length}/{NSE_SCRIPTS.length}
                </span>
              </div>
              <pre className="max-h-24 overflow-auto rounded-md bg-muted p-2 font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap break-all">
                {command}
              </pre>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(command);
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1200);
                  } catch {
                    setCopied(false);
                  }
                }}
              >
                <Copy />
                {copied ? "Zkopírováno" : "Kopírovat nmap příkaz"}
              </Button>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Laboratorní simulace nad modelem ACME.LAB. Příkaz lze spustit na vlastní stanici.
            </p>
          </div>
        </ScrollArea>
      )}

      <div className="border-t border-border p-3">
        {isScanning ? (
          <Button type="button" variant="destructive" className="w-full" onClick={stopScan}>
            <Square />
            Zastavit sken
          </Button>
        ) : (
          <Button type="button" className="w-full" onClick={startScan}>
            <Play />
            Spustit sken
          </Button>
        )}
      </div>
    </aside>
  );
}

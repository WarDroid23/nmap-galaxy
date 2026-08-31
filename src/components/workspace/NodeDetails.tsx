import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { KIND_LABEL } from "@/lib/nmap/sample-network";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/store/workspace";

const SEV: Record<string, "default" | "accent" | "up" | "down" | "warn"> = {
  info: "default",
  low: "accent",
  medium: "warn",
  high: "down",
  critical: "down",
};

export function NodeDetails() {
  const id = useWorkspace((s) => s.selectedNodeId);
  const nodes = useWorkspace((s) => s.nodes);
  const links = useWorkspace((s) => s.links);
  const selectNode = useWorkspace((s) => s.selectNode);
  const node = nodes.find((n) => n.id === id);
  if (!node) return null;

  const edges = links.filter((l) => l.source === node.id || l.target === node.id);

  return (
    <aside className="pointer-events-auto absolute inset-x-0 bottom-0 z-20 flex max-h-[70dvh] flex-col rounded-t-2xl border border-border bg-card/95 shadow-[var(--shadow-border)] backdrop-blur-sm md:inset-y-0 md:right-0 md:bottom-auto md:left-auto md:w-80 md:rounded-none md:border-y-0 md:border-r-0">
      <div className="flex items-start gap-2 px-4 py-3">
        <div className="min-w-0 flex-1">
          <div className="truncate font-medium text-foreground">{node.hostname}</div>
          <div className="font-mono text-xs text-muted-foreground">{node.ip}</div>
        </div>
        <Button type="button" variant="ghost" size="icon-sm" onClick={() => selectNode(null)} aria-label="Zavřít podrobnosti">
          <X />
        </Button>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-4 px-4 pb-6">
          <div className="flex flex-wrap gap-1.5">
            <Badge>{KIND_LABEL[node.kind]}</Badge>
            <Badge variant={node.status === "up" ? "up" : node.status === "down" ? "down" : "warn"}>
              {node.status}
            </Badge>
            <Badge>{node.zone}</Badge>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
            <dt className="text-muted-foreground">OS</dt>
            <dd>{node.os}</dd>
            <dt className="text-muted-foreground">MAC</dt>
            <dd className="font-mono text-xs">{node.mac ?? "—"}</dd>
            <dt className="text-muted-foreground">Latence</dt>
            <dd className="font-mono tabular-nums">{node.latencyMs.toFixed(1)} ms</dd>
          </dl>
          <p className="text-sm leading-relaxed text-muted-foreground">{node.notes}</p>

          <section>
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Porty</h3>
            {node.ports.length === 0 ? (
              <p className="text-sm text-muted-foreground">Žádné otevřené porty.</p>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="pb-1 font-medium">Port</th>
                    <th className="pb-1 font-medium">Služba</th>
                    <th className="pb-1 font-medium">Verze</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {node.ports.map((p) => (
                    <tr key={`${p.proto}-${p.port}`} className="border-t border-border">
                      <td className="py-1.5 tabular-nums">
                        {p.port}/{p.proto}
                      </td>
                      <td className="py-1.5">{p.service}</td>
                      <td className="py-1.5 text-muted-foreground">{p.version ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section>
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">NSE</h3>
            {node.findings.length === 0 ? (
              <p className="text-sm text-muted-foreground">Spusťte sken pro výsledky skriptů.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {node.findings.map((f) => (
                  <li key={f.script} className="rounded-lg bg-muted p-2.5">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-mono text-xs">{f.script}</span>
                      <Badge variant={SEV[f.severity] ?? "default"} className={cn("ml-auto")}>
                        {f.severity}
                      </Badge>
                    </div>
                    <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
                      {f.output}
                    </pre>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Hrany</h3>
            <ul className="flex flex-col gap-1">
              {edges.map((e) => {
                const otherId = e.source === node.id ? e.target : e.source;
                const other = nodes.find((n) => n.id === otherId);
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => selectNode(otherId)}
                      className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
                    >
                      <span className="truncate">{other?.hostname ?? otherId}</span>
                      <span className="ml-2 font-mono text-xs text-muted-foreground">{e.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </ScrollArea>
    </aside>
  );
}

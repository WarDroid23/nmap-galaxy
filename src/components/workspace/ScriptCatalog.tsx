import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SCRIPT_CATEGORIES, scriptsMatching } from "@/lib/nmap/scripts";
import type { ScriptCategory } from "@/lib/nmap/types";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/store/workspace";

export function ScriptCatalog() {
  const query = useWorkspace((s) => s.scriptQuery);
  const setQuery = useWorkspace((s) => s.setScriptQuery);
  const category = useWorkspace((s) => s.scriptCategory);
  const setCategory = useWorkspace((s) => s.setScriptCategory);
  const selected = useWorkspace((s) => s.selectedScripts);
  const toggle = useWorkspace((s) => s.toggleScript);
  const selectCategory = useWorkspace((s) => s.selectCategory);
  const clearScripts = useWorkspace((s) => s.clearScripts);

  const cat = (category === "all" ? "all" : category) as ScriptCategory | "all";
  const list = scriptsMatching(query, cat);
  const selectedSet = new Set(selected);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-col gap-2 px-3 pt-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filtrovat NSE skripty…"
          className="h-9"
          aria-label="Filtrovat skripty"
        />
        <div className="flex flex-wrap gap-1">
          {SCRIPT_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={cn(
                "h-7 rounded-full px-2.5 font-mono text-xs transition-[background-color,color] duration-150",
                category === c.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          <Button type="button" variant="outline" size="sm" onClick={() => selectCategory(category === "all" ? "all" : category)}>
            Vybrat sadu
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={clearScripts}>
            Vymazat
          </Button>
        </div>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <ul className="flex flex-col gap-px p-2 pb-4">
          {list.map((s) => {
            const on = selectedSet.has(s.name);
            return (
              <li key={s.name}>
                <button
                  type="button"
                  onClick={() => toggle(s.name)}
                  className={cn(
                    "flex w-full flex-col rounded-md px-2.5 py-2 text-left transition-[background-color] duration-150",
                    on ? "bg-muted" : "hover:bg-muted/50",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "size-3.5 rounded-sm shadow-[var(--shadow-border)]",
                        on ? "bg-primary" : "bg-transparent",
                      )}
                      aria-hidden
                    />
                    <span className="font-mono text-xs text-foreground">{s.name}</span>
                  </span>
                  <span className="mt-0.5 pl-6 text-xs leading-snug text-muted-foreground">{s.description}</span>
                  <span className="mt-1 pl-6 font-mono text-xs text-muted-foreground/80">
                    {s.categories.join(" · ")}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
}

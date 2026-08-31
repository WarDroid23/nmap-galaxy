import type { GraphEngine } from "@/lib/graph/force-engine";

let engine: GraphEngine | null = null;

export function registerEngine(instance: GraphEngine | null) {
  engine = instance;
}

export function zoomGraph(factor: number) {
  if (!engine) return;
  engine.zoomAt(engine.width / 2, engine.height / 2, factor);
}

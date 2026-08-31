import { SCAN_PROFILES } from "./profiles";
import { NSE_SCRIPTS } from "./scripts";

export interface CommandInput {
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
}

export function buildNmapCommand(input: CommandInput): string {
  const parts: string[] = ["nmap"];
  const profile = SCAN_PROFILES.find((p) => p.id === input.profileId);

  if (input.syn) parts.push("-sS");
  if (input.version) parts.push("-sV");
  if (input.osDetect) parts.push("-O");
  if (input.aggressive) parts.push("-A");
  if (input.skipPing) parts.push("-Pn");

  parts.push(`-T${input.timing}`);

  const ports = input.ports.trim() || profile?.ports || "";
  if (ports) parts.push("-p", ports);

  const scripts = resolveScriptArg(input.selectedScripts);
  if (scripts) parts.push("--script", scripts);

  const extra = (profile?.flags ?? []).filter(
    (f) =>
      !["-sS", "-sV", "-O", "-A", "-Pn", "-T4", "-T2", "-T3", "-T5"].includes(f) &&
      f !== "--script" &&
      f !== "vuln" &&
      f !== "all" &&
      f !== "default",
  );
  for (const f of extra) {
    if (f.startsWith("-") && !parts.includes(f)) parts.push(f);
  }

  parts.push(input.target.trim() || "10.0.0.0/8");
  return parts.join(" ");
}

function resolveScriptArg(selected: string[]): string | null {
  if (selected.length === 0) return null;
  if (selected.includes("all") || selected.length >= NSE_SCRIPTS.length) return "all";
  const cats = ["default", "safe", "discovery", "vuln", "auth", "brute", "exploit", "malware"];
  const onlyCats = selected.filter((s) => cats.includes(s));
  const named = selected.filter((s) => !cats.includes(s));
  if (onlyCats.length && named.length === 0) return onlyCats.join(",");
  if (named.length <= 12) return named.join(",");
  if (onlyCats.length) return `(${onlyCats.join(" or ")})`;
  return named.slice(0, 8).join(",") + ",...";
}

import type { ScanProfile } from "./types";

export const SCAN_PROFILES: ScanProfile[] = [
  {
    id: "quick",
    name: "Rychlý",
    blurb: "Top porty, T4. První přehled sítě.",
    flags: ["-T4", "-F", "-n"],
    defaultScripts: ["default"],
    ports: "",
  },
  {
    id: "intense",
    name: "Intenzivní",
    blurb: "Detekce OS, verzí a výchozí skripty.",
    flags: ["-T4", "-A", "-v"],
    defaultScripts: ["default", "safe"],
    ports: "1-1024",
  },
  {
    id: "stealth",
    name: "Stealth SYN",
    blurb: "Poloviční handshake, pomalejší časování.",
    flags: ["-sS", "-T2", "-f", "-n"],
    defaultScripts: [],
    ports: "1-1024",
  },
  {
    id: "udp",
    name: "UDP + TCP",
    blurb: "Kombinovaný sken služeb včetně UDP.",
    flags: ["-sS", "-sU", "-T4", "-A"],
    defaultScripts: ["discovery"],
    ports: "U:53,67,123,161,500,T:1-1024",
  },
  {
    id: "vuln",
    name: "Zranitelnosti",
    blurb: "Verze služeb a sada vuln skriptů.",
    flags: ["-sV", "-T4", "--script", "vuln"],
    defaultScripts: ["vuln"],
    ports: "1-65535",
  },
  {
    id: "all",
    name: "Všechny skripty",
    blurb: "Plný NSE katalog. Pomalé, hlučné, důkladné.",
    flags: ["-sS", "-sV", "-O", "-T4", "--script", "all"],
    defaultScripts: ["all"],
    ports: "1-65535",
  },
];

export const TIMING_LABELS = [
  "T0 paranoid",
  "T1 sneaky",
  "T2 polite",
  "T3 normal",
  "T4 aggressive",
  "T5 insane",
] as const;

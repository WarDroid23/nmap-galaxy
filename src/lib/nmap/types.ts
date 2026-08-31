export type ScriptCategory =
  | "auth"
  | "broadcast"
  | "brute"
  | "default"
  | "discovery"
  | "dos"
  | "exploit"
  | "external"
  | "fuzzer"
  | "intrusive"
  | "malware"
  | "safe"
  | "version"
  | "vuln";

export interface NseScript {
  name: string;
  categories: ScriptCategory[];
  description: string;
}

export type HostKind =
  | "internet"
  | "gateway"
  | "firewall"
  | "switch"
  | "server"
  | "workstation"
  | "iot"
  | "cloud";

export type HostStatus = "up" | "down" | "filtered";

export interface PortRecord {
  port: number;
  proto: "tcp" | "udp";
  state: "open" | "closed" | "filtered";
  service: string;
  version?: string;
}

export interface ScriptFinding {
  script: string;
  output: string;
  severity: "info" | "low" | "medium" | "high" | "critical";
}

export interface GraphNode {
  id: string;
  hostname: string;
  ip: string;
  mac?: string;
  kind: HostKind;
  zone: string;
  status: HostStatus;
  os: string;
  latencyMs: number;
  ports: PortRecord[];
  findings: ScriptFinding[];
  notes: string;
}

export interface GraphLink {
  id: string;
  source: string;
  target: string;
  label: string;
  proto: string;
}

export interface ScanProfile {
  id: string;
  name: string;
  blurb: string;
  flags: string[];
  defaultScripts: string[];
  ports: string;
}

export type ScanEvent =
  | { type: "line"; text: string }
  | { type: "host"; id: string }
  | { type: "finding"; id: string; finding: ScriptFinding }
  | { type: "done" };

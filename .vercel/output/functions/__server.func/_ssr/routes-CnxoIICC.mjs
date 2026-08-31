import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Search, c as Plus, d as Minus, f as Focus, h as ChevronDown, i as SquareTerminal, l as Play, m as ChevronUp, o as ScanSearch, p as Copy, r as Square, s as RotateCcw, t as X, u as Pause } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { r as Slot } from "../_libs/@radix-ui/react-primitive+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root, r as ScrollAreaScrollbar, t as Corner } from "../_libs/@radix-ui/react-scroll-area+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CnxoIICC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ports(...rows) {
	return rows.map(([port, proto, service, version]) => ({
		port,
		proto,
		state: "open",
		service,
		version
	}));
}
function node(partial) {
	return {
		status: "up",
		latencyMs: 1 + partial.id.charCodeAt(0) % 9 + partial.id.length % 5,
		findings: [],
		mac: partial.mac,
		...partial
	};
}
var SAMPLE_NODES = [
	node({
		id: "inet",
		hostname: "internet",
		ip: "0.0.0.0",
		kind: "internet",
		zone: "wan",
		os: "—",
		ports: [],
		notes: "Veřejná síť. Výchozí bod topologie."
	}),
	node({
		id: "isp",
		hostname: "edge.isp.net",
		ip: "203.0.113.1",
		kind: "cloud",
		zone: "wan",
		os: "ISP PE router",
		mac: "00:00:5E:00:53:01",
		ports: ports([
			179,
			"tcp",
			"bgp"
		], [
			22,
			"tcp",
			"ssh",
			"Cisco IOS"
		]),
		notes: "Hrana poskytovatele. BGP peering."
	}),
	node({
		id: "fw",
		hostname: "fw-edge.acme.lab",
		ip: "10.0.0.1",
		kind: "firewall",
		zone: "perimeter",
		os: "pfSense 2.7.2",
		mac: "00:0C:29:AA:00:01",
		ports: ports([
			443,
			"tcp",
			"https",
			"nginx"
		], [
			22,
			"tcp",
			"ssh",
			"OpenSSH 9.6"
		]),
		notes: "Perimetrický firewall, NAT, VPN terminator."
	}),
	node({
		id: "ids",
		hostname: "ids-01.acme.lab",
		ip: "10.0.0.2",
		kind: "server",
		zone: "perimeter",
		os: "Debian 12 / Suricata",
		mac: "00:0C:29:AA:00:02",
		ports: ports([
			22,
			"tcp",
			"ssh",
			"OpenSSH 9.6"
		], [
			8e3,
			"tcp",
			"http",
			"Suricata eve"
		]),
		notes: "IDS/IPS v inline módu na SPAN."
	}),
	node({
		id: "vpn",
		hostname: "vpn-gw.acme.lab",
		ip: "10.0.0.3",
		kind: "gateway",
		zone: "perimeter",
		os: "VyOS 1.4",
		mac: "00:0C:29:AA:00:03",
		ports: ports([
			500,
			"udp",
			"isakmp"
		], [
			4500,
			"udp",
			"ipsec-nat-t"
		], [
			1194,
			"udp",
			"openvpn"
		]),
		notes: "IPSec + OpenVPN pro vzdálený přístup."
	}),
	node({
		id: "web1",
		hostname: "web-01.acme.lab",
		ip: "10.10.10.10",
		kind: "server",
		zone: "dmz",
		os: "Ubuntu 20.04",
		mac: "00:0C:29:BB:10:10",
		ports: ports([
			80,
			"tcp",
			"http",
			"Apache httpd 2.4.41"
		], [
			443,
			"tcp",
			"https",
			"Apache httpd 2.4.41"
		], [
			22,
			"tcp",
			"ssh",
			"OpenSSH 8.2p1"
		]),
		notes: "Veřejný web. Directory listing na /backup."
	}),
	node({
		id: "web2",
		hostname: "web-02.acme.lab",
		ip: "10.10.10.11",
		kind: "server",
		zone: "dmz",
		os: "Ubuntu 22.04",
		mac: "00:0C:29:BB:10:11",
		ports: ports([
			80,
			"tcp",
			"http",
			"nginx 1.24.0"
		], [
			443,
			"tcp",
			"https",
			"nginx 1.24.0"
		], [
			22,
			"tcp",
			"ssh",
			"OpenSSH 9.6"
		]),
		notes: "Reverse proxy / load balancer."
	}),
	node({
		id: "mail",
		hostname: "mail-01.acme.lab",
		ip: "10.10.10.20",
		kind: "server",
		zone: "dmz",
		os: "Debian 11",
		mac: "00:0C:29:BB:10:20",
		ports: ports([
			25,
			"tcp",
			"smtp",
			"Postfix 3.5.23"
		], [
			587,
			"tcp",
			"submission",
			"Postfix"
		], [
			993,
			"tcp",
			"imaps",
			"Dovecot 2.3"
		], [
			22,
			"tcp",
			"ssh",
			"OpenSSH 8.4"
		]),
		notes: "Pošta. Open relay na interních sítích."
	}),
	node({
		id: "dns1",
		hostname: "ns1.acme.lab",
		ip: "10.10.10.53",
		kind: "server",
		zone: "dmz",
		os: "Debian 12",
		mac: "00:0C:29:BB:10:53",
		ports: ports([
			53,
			"udp",
			"domain",
			"BIND 9.18"
		], [
			53,
			"tcp",
			"domain",
			"BIND 9.18"
		], [
			22,
			"tcp",
			"ssh",
			"OpenSSH 9.6"
		]),
		notes: "Autoritative + rekurzivní DNS. Recursion otevřená interně."
	}),
	node({
		id: "dns2",
		hostname: "ns2.acme.lab",
		ip: "10.10.10.54",
		kind: "server",
		zone: "dmz",
		os: "Debian 12",
		mac: "00:0C:29:BB:10:54",
		ports: ports([
			53,
			"udp",
			"domain",
			"BIND 9.18"
		], [
			53,
			"tcp",
			"domain"
		], [
			22,
			"tcp",
			"ssh",
			"OpenSSH 9.6"
		]),
		notes: "Sekundární DNS."
	}),
	node({
		id: "jump",
		hostname: "jump-01.acme.lab",
		ip: "10.10.10.5",
		kind: "server",
		zone: "dmz",
		os: "Ubuntu 22.04",
		mac: "00:0C:29:BB:10:05",
		ports: ports([
			22,
			"tcp",
			"ssh",
			"OpenSSH 8.9"
		]),
		notes: "Bastion. Password auth stále zapnuté."
	}),
	node({
		id: "rtr",
		hostname: "rtr-core.acme.lab",
		ip: "10.0.1.1",
		kind: "gateway",
		zone: "core",
		os: "Cisco IOS-XE 17.9",
		mac: "00:1B:54:CC:01:01",
		ports: ports([
			22,
			"tcp",
			"ssh",
			"Cisco SSH"
		], [
			161,
			"udp",
			"snmp",
			"SNMPv2c"
		]),
		notes: "L3 core. SNMP community public."
	}),
	node({
		id: "sw1",
		hostname: "sw-core-01.acme.lab",
		ip: "10.0.1.2",
		kind: "switch",
		zone: "core",
		os: "Cisco IOS 15.2",
		mac: "00:1B:54:CC:01:02",
		ports: ports([
			22,
			"tcp",
			"ssh"
		], [
			161,
			"udp",
			"snmp"
		], [
			443,
			"tcp",
			"https"
		]),
		notes: "Stack master. VLAN 10/20/30/40."
	}),
	node({
		id: "sw2",
		hostname: "sw-core-02.acme.lab",
		ip: "10.0.1.3",
		kind: "switch",
		zone: "core",
		os: "Cisco IOS 15.2",
		mac: "00:1B:54:CC:01:03",
		ports: ports([
			22,
			"tcp",
			"ssh"
		], [
			161,
			"udp",
			"snmp"
		]),
		notes: "Stack member."
	}),
	node({
		id: "dc1",
		hostname: "dc-01.acme.lab",
		ip: "10.20.0.10",
		kind: "server",
		zone: "servers",
		os: "Windows Server 2019",
		mac: "00:50:56:DD:00:10",
		ports: ports([
			53,
			"tcp",
			"domain"
		], [
			88,
			"tcp",
			"kerberos-sec"
		], [
			135,
			"tcp",
			"msrpc"
		], [
			139,
			"tcp",
			"netbios-ssn"
		], [
			389,
			"tcp",
			"ldap"
		], [
			445,
			"tcp",
			"microsoft-ds"
		], [
			636,
			"tcp",
			"ldapssl"
		], [
			3389,
			"tcp",
			"ms-wbt-server",
			"RDP"
		]),
		notes: "Primary Domain Controller, DNS, Kerberos."
	}),
	node({
		id: "dc2",
		hostname: "dc-02.acme.lab",
		ip: "10.20.0.11",
		kind: "server",
		zone: "servers",
		os: "Windows Server 2019",
		mac: "00:50:56:DD:00:11",
		ports: ports([
			53,
			"tcp",
			"domain"
		], [
			88,
			"tcp",
			"kerberos-sec"
		], [
			389,
			"tcp",
			"ldap"
		], [
			445,
			"tcp",
			"microsoft-ds"
		], [
			3389,
			"tcp",
			"ms-wbt-server"
		]),
		notes: "Replica DC."
	}),
	node({
		id: "fs1",
		hostname: "fs-01.acme.lab",
		ip: "10.20.0.20",
		kind: "server",
		zone: "servers",
		os: "Windows Server 2012 R2",
		mac: "00:50:56:DD:00:20",
		ports: ports([
			139,
			"tcp",
			"netbios-ssn"
		], [
			445,
			"tcp",
			"microsoft-ds",
			"SMBv1"
		], [
			3389,
			"tcp",
			"ms-wbt-server"
		]),
		notes: "Souborový server. SMBv1, kandidát na MS17-010."
	}),
	node({
		id: "db1",
		hostname: "db-prod.acme.lab",
		ip: "10.20.0.30",
		kind: "server",
		zone: "servers",
		os: "RHEL 8.9",
		mac: "00:50:56:DD:00:30",
		ports: ports([
			5432,
			"tcp",
			"postgresql",
			"PostgreSQL 13.14"
		], [
			22,
			"tcp",
			"ssh",
			"OpenSSH 8.0"
		]),
		notes: "Produkční DB. Trust auth z app subnetu."
	}),
	node({
		id: "db2",
		hostname: "db-repl.acme.lab",
		ip: "10.20.0.31",
		kind: "server",
		zone: "servers",
		os: "RHEL 8.9",
		mac: "00:50:56:DD:00:31",
		ports: ports([
			5432,
			"tcp",
			"postgresql",
			"PostgreSQL 13.14"
		], [
			22,
			"tcp",
			"ssh"
		]),
		notes: "Streaming replica."
	}),
	node({
		id: "app1",
		hostname: "app-01.acme.lab",
		ip: "10.20.0.40",
		kind: "server",
		zone: "servers",
		os: "Ubuntu 22.04",
		mac: "00:50:56:DD:00:40",
		ports: ports([
			8080,
			"tcp",
			"http-proxy",
			"Tomcat 9.0.83"
		], [
			22,
			"tcp",
			"ssh",
			"OpenSSH 9.6"
		]),
		notes: "Java app server."
	}),
	node({
		id: "app2",
		hostname: "app-02.acme.lab",
		ip: "10.20.0.41",
		kind: "server",
		zone: "servers",
		os: "Ubuntu 22.04",
		mac: "00:50:56:DD:00:41",
		ports: ports([
			8080,
			"tcp",
			"http-proxy",
			"Tomcat 9.0.83"
		], [
			22,
			"tcp",
			"ssh"
		]),
		notes: "Java app server (HA)."
	}),
	node({
		id: "bak",
		hostname: "backup-01.acme.lab",
		ip: "10.20.0.50",
		kind: "server",
		zone: "servers",
		os: "Ubuntu 20.04",
		mac: "00:50:56:DD:00:50",
		ports: ports([
			22,
			"tcp",
			"ssh"
		], [
			873,
			"tcp",
			"rsync"
		], [
			8006,
			"tcp",
			"http"
		]),
		notes: "Veeam-like zálohy. rsync modul open."
	}),
	node({
		id: "k8s",
		hostname: "k8s-cp.acme.lab",
		ip: "10.20.0.60",
		kind: "server",
		zone: "servers",
		os: "Ubuntu 22.04 / k8s 1.29",
		mac: "00:50:56:DD:00:60",
		ports: ports([
			6443,
			"tcp",
			"https",
			"kube-apiserver"
		], [
			22,
			"tcp",
			"ssh"
		]),
		notes: "Kubernetes control plane."
	}),
	node({
		id: "k8w1",
		hostname: "k8s-w1.acme.lab",
		ip: "10.20.0.61",
		kind: "server",
		zone: "servers",
		os: "Ubuntu 22.04",
		mac: "00:50:56:DD:00:61",
		ports: ports([
			10250,
			"tcp",
			"http",
			"kubelet"
		], [
			22,
			"tcp",
			"ssh"
		]),
		notes: "Worker node."
	}),
	node({
		id: "k8w2",
		hostname: "k8s-w2.acme.lab",
		ip: "10.20.0.62",
		kind: "server",
		zone: "servers",
		os: "Ubuntu 22.04",
		mac: "00:50:56:DD:00:62",
		ports: ports([
			10250,
			"tcp",
			"http",
			"kubelet"
		], [
			22,
			"tcp",
			"ssh"
		]),
		notes: "Worker node."
	}),
	node({
		id: "siem",
		hostname: "siem.acme.lab",
		ip: "10.20.0.70",
		kind: "server",
		zone: "servers",
		os: "Ubuntu 22.04",
		mac: "00:50:56:DD:00:70",
		ports: ports([
			5601,
			"tcp",
			"http",
			"Kibana"
		], [
			9200,
			"tcp",
			"http",
			"Elasticsearch 7.17"
		], [
			22,
			"tcp",
			"ssh"
		]),
		notes: "Elastic SIEM. Elasticsearch bez TLS interně."
	}),
	node({
		id: "ntp",
		hostname: "ntp-01.acme.lab",
		ip: "10.20.0.123",
		kind: "server",
		zone: "servers",
		os: "Debian 12",
		mac: "00:50:56:DD:00:7B",
		ports: ports([
			123,
			"udp",
			"ntp",
			"chrony"
		], [
			22,
			"tcp",
			"ssh"
		]),
		notes: "Interní NTP. monlist vypnutý."
	}),
	node({
		id: "wsf1",
		hostname: "ws-fin-01.acme.lab",
		ip: "10.30.1.21",
		kind: "workstation",
		zone: "workstations",
		os: "Windows 11 23H2",
		mac: "A4:4C:C8:10:01:21",
		ports: ports([
			445,
			"tcp",
			"microsoft-ds"
		], [
			3389,
			"tcp",
			"ms-wbt-server"
		]),
		notes: "Finance. Uživatel: mnovak."
	}),
	node({
		id: "wsf2",
		hostname: "ws-fin-02.acme.lab",
		ip: "10.30.1.22",
		kind: "workstation",
		zone: "workstations",
		os: "Windows 11 23H2",
		mac: "A4:4C:C8:10:01:22",
		ports: ports([
			445,
			"tcp",
			"microsoft-ds"
		]),
		notes: "Finance."
	}),
	node({
		id: "wse1",
		hostname: "ws-eng-01.acme.lab",
		ip: "10.30.2.31",
		kind: "workstation",
		zone: "workstations",
		os: "Windows 11 23H2",
		mac: "A4:4C:C8:10:02:31",
		ports: ports([
			445,
			"tcp",
			"microsoft-ds"
		], [
			22,
			"tcp",
			"ssh",
			"OpenSSH for Windows"
		]),
		notes: "Engineering. WSL + SSH."
	}),
	node({
		id: "wse2",
		hostname: "ws-eng-02.acme.lab",
		ip: "10.30.2.32",
		kind: "workstation",
		zone: "workstations",
		os: "macOS 14.5",
		mac: "F0:18:98:10:02:32",
		ports: ports([
			22,
			"tcp",
			"ssh",
			"OpenSSH_9.6"
		], [
			5900,
			"tcp",
			"vnc",
			"Screen Sharing"
		]),
		notes: "Engineering Mac."
	}),
	node({
		id: "wshr",
		hostname: "ws-hr-01.acme.lab",
		ip: "10.30.3.11",
		kind: "workstation",
		zone: "workstations",
		os: "Windows 10 22H2",
		mac: "A4:4C:C8:10:03:11",
		ports: ports([
			445,
			"tcp",
			"microsoft-ds"
		], [
			3389,
			"tcp",
			"ms-wbt-server"
		]),
		notes: "HR. Starší image, chybí patch."
	}),
	node({
		id: "ceo",
		hostname: "laptop-ceo.acme.lab",
		ip: "10.30.9.2",
		kind: "workstation",
		zone: "workstations",
		os: "Windows 11 23H2",
		mac: "F8:E4:3B:CE:00:02",
		ports: ports([
			445,
			"tcp",
			"microsoft-ds"
		]),
		notes: "Notebook vedení. BitLocker zapnutý."
	}),
	node({
		id: "cam1",
		hostname: "cam-lobby.acme.lab",
		ip: "10.40.0.10",
		kind: "iot",
		zone: "iot",
		os: "embedded Linux / Hikvision",
		mac: "44:19:B6:40:00:0A",
		ports: ports([
			80,
			"tcp",
			"http",
			"Hikvision-Webs"
		], [
			8e3,
			"tcp",
			"http"
		], [
			554,
			"tcp",
			"rtsp"
		]),
		notes: "IP kamera. Výchozí credentials admin/12345."
	}),
	node({
		id: "cam2",
		hostname: "cam-parking.acme.lab",
		ip: "10.40.0.11",
		kind: "iot",
		zone: "iot",
		os: "embedded Linux",
		mac: "44:19:B6:40:00:0B",
		ports: ports([
			80,
			"tcp",
			"http"
		], [
			554,
			"tcp",
			"rtsp"
		]),
		notes: "IP kamera parkoviště."
	}),
	node({
		id: "prn",
		hostname: "printer-3f.acme.lab",
		ip: "10.40.1.8",
		kind: "iot",
		zone: "iot",
		os: "HP FutureSmart",
		mac: "3C:4A:92:40:01:08",
		ports: ports([
			80,
			"tcp",
			"http"
		], [
			443,
			"tcp",
			"https"
		], [
			9100,
			"tcp",
			"jetdirect"
		], [
			161,
			"udp",
			"snmp",
			"public"
		]),
		notes: "Tiskárna bez autentizace, SNMP public."
	}),
	node({
		id: "hvac",
		hostname: "hvac-ctrl.acme.lab",
		ip: "10.40.2.2",
		kind: "iot",
		zone: "iot",
		os: "Niagara AX",
		mac: "00:80:77:40:02:02",
		ports: ports([
			23,
			"tcp",
			"telnet"
		], [
			80,
			"tcp",
			"http"
		], [
			1911,
			"tcp",
			"fox"
		]),
		notes: "MaR / HVAC. Telnet otevřený."
	}),
	node({
		id: "badge",
		hostname: "badge-01.acme.lab",
		ip: "10.40.3.4",
		kind: "iot",
		zone: "iot",
		os: "HID VertX",
		mac: "00:06:8E:40:03:04",
		ports: ports([
			80,
			"tcp",
			"http"
		], [
			4070,
			"tcp",
			"unknown"
		]),
		notes: "Kontrola vstupu."
	}),
	node({
		id: "apg",
		hostname: "ap-guest.acme.lab",
		ip: "10.50.0.1",
		kind: "gateway",
		zone: "guest",
		os: "UniFi",
		mac: "78:8A:20:50:00:01",
		ports: ports([
			22,
			"tcp",
			"ssh"
		], [
			8080,
			"tcp",
			"http"
		]),
		notes: "Guest SSID. Chybí klientská izolace."
	}),
	node({
		id: "gdhcp",
		hostname: "guest-dhcp.acme.lab",
		ip: "10.50.0.2",
		kind: "server",
		zone: "guest",
		os: "dnsmasq",
		mac: "78:8A:20:50:00:02",
		ports: ports([
			67,
			"udp",
			"dhcps"
		], [
			53,
			"udp",
			"domain"
		]),
		notes: "DHCP/DNS pro hosty."
	})
];
function L(source, target, label, proto) {
	return {
		id: `${source}->${target}:${label}`,
		source,
		target,
		label,
		proto
	};
}
var SAMPLE_LINKS = [
	L("inet", "isp", "WAN", "bgp"),
	L("isp", "fw", "BGP/179", "tcp"),
	L("fw", "ids", "SPAN", "mirror"),
	L("fw", "vpn", "LAN", "ipsec"),
	L("fw", "web1", "DNAT :443", "tcp"),
	L("fw", "web2", "DNAT :80", "tcp"),
	L("fw", "mail", "DNAT :25", "tcp"),
	L("fw", "dns1", "DNAT :53", "udp"),
	L("web2", "web1", "proxy_pass", "https"),
	L("dns1", "dns2", "AXFR", "tcp"),
	L("fw", "jump", "mgmt", "ssh"),
	L("fw", "rtr", "trunk", "802.1q"),
	L("rtr", "sw1", "LACP", "eth"),
	L("rtr", "sw2", "LACP", "eth"),
	L("sw1", "sw2", "stack", "stackwise"),
	L("sw1", "dc1", "VLAN 20", "ldap"),
	L("sw1", "dc2", "VLAN 20", "ldap"),
	L("dc1", "dc2", "repl.", "rpc"),
	L("sw1", "fs1", "VLAN 20", "smb"),
	L("dc1", "fs1", "SMB/445", "smb"),
	L("sw1", "db1", "VLAN 20", "pgsql"),
	L("db1", "db2", "WAL", "pgsql"),
	L("sw1", "app1", "VLAN 20", "http"),
	L("sw1", "app2", "VLAN 20", "http"),
	L("app1", "db1", "5432", "pgsql"),
	L("app2", "db1", "5432", "pgsql"),
	L("web1", "app1", "8080", "http"),
	L("web2", "app2", "8080", "http"),
	L("sw1", "bak", "VLAN 20", "rsync"),
	L("fs1", "bak", "rsync", "tcp"),
	L("sw1", "k8s", "VLAN 20", "https"),
	L("k8s", "k8w1", "kubelet", "https"),
	L("k8s", "k8w2", "kubelet", "https"),
	L("sw1", "siem", "VLAN 20", "beats"),
	L("ids", "siem", "eve.json", "tcp"),
	L("sw1", "ntp", "VLAN 20", "ntp"),
	L("sw2", "wsf1", "VLAN 30", "smb"),
	L("sw2", "wsf2", "VLAN 30", "smb"),
	L("sw2", "wse1", "VLAN 30", "smb"),
	L("sw2", "wse2", "VLAN 30", "ssh"),
	L("sw2", "wshr", "VLAN 30", "rdp"),
	L("sw2", "ceo", "VLAN 30", "smb"),
	L("dc1", "wsf1", "LDAP/389", "ldap"),
	L("dc1", "wse1", "Kerberos", "tcp"),
	L("dc1", "wshr", "GPO", "smb"),
	L("sw2", "cam1", "VLAN 40", "rtsp"),
	L("sw2", "cam2", "VLAN 40", "rtsp"),
	L("sw2", "prn", "VLAN 40", "jetdirect"),
	L("sw2", "hvac", "VLAN 40", "fox"),
	L("sw2", "badge", "VLAN 40", "http"),
	L("fw", "apg", "guest", "wifi"),
	L("apg", "gdhcp", "DHCP", "udp"),
	L("jump", "dc1", "RDP", "tcp"),
	L("jump", "rtr", "SSH", "tcp"),
	L("vpn", "rtr", "IPSec", "udp")
];
var ZONE_ANCHORS = {
	wan: {
		x: -420,
		y: -40
	},
	perimeter: {
		x: -220,
		y: 10
	},
	dmz: {
		x: -40,
		y: -200
	},
	core: {
		x: 40,
		y: 20
	},
	servers: {
		x: 280,
		y: -80
	},
	workstations: {
		x: 300,
		y: 200
	},
	iot: {
		x: 80,
		y: 280
	},
	guest: {
		x: -180,
		y: 220
	}
};
var KIND_LABEL = {
	internet: "Internet",
	gateway: "Brána",
	firewall: "Firewall",
	switch: "Switch",
	server: "Server",
	workstation: "Stanice",
	iot: "IoT / OT",
	cloud: "Cloud / ISP"
};
var LAB_FINDINGS = {
	fs1: [{
		script: "smb-vuln-ms17-010",
		severity: "critical",
		output: "VULNERABLE:\n  Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)\n  State: VULNERABLE\n  Risk factor: HIGH\n  References:\n    https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0143"
	}, {
		script: "smb-protocols",
		severity: "high",
		output: "dialects: NT LM 0.12 (SMBv1) 2.0.2 2.1\nSMBv1: enabled"
	}],
	web1: [
		{
			script: "http-enum",
			severity: "medium",
			output: "/backup/   200 OK  directory listing\n/server-status   200 OK  Apache status\n/.git/HEAD   200 OK"
		},
		{
			script: "http-git",
			severity: "high",
			output: "Git repository found at http://10.10.10.10/.git/"
		},
		{
			script: "ssl-heartbleed",
			severity: "info",
			output: "Not vulnerable"
		}
	],
	mail: [{
		script: "smtp-open-relay",
		severity: "high",
		output: "Server is an open relay (16/16 tests)"
	}, {
		script: "smtp-commands",
		severity: "info",
		output: "EHLO, STARTTLS, AUTH LOGIN PLAIN, VRFY, EXPN"
	}],
	jump: [{
		script: "ssh-auth-methods",
		severity: "medium",
		output: "publickey, password, keyboard-interactive"
	}, {
		script: "ssh2-enum-algos",
		severity: "low",
		output: "kex: diffie-hellman-group14-sha1, curve25519-sha256\nencryption: aes128-ctr, 3des-cbc"
	}],
	cam1: [{
		script: "http-default-accounts",
		severity: "critical",
		output: "credentials found: admin / 12345  (Hikvision)"
	}, {
		script: "http-title",
		severity: "info",
		output: "Web Service"
	}],
	prn: [{
		script: "snmp-sysdescr",
		severity: "medium",
		output: "HP LaserJet MFP E57540\nsnmp community: public (read-write)"
	}],
	hvac: [{
		script: "telnet-encryption",
		severity: "high",
		output: "Telnet encryption: not supported. Banner: Niagara AX login:"
	}, {
		script: "fox-info",
		severity: "medium",
		output: "Fox protocol, station name HVAC-L1, vendor Tridium"
	}],
	rtr: [{
		script: "snmp-brute",
		severity: "high",
		output: "valid community: public\nvalid community: private"
	}, {
		script: "snmp-ios-config",
		severity: "high",
		output: "Running-config obtained via SNMP (private). Enable secret is type 5."
	}],
	siem: [{
		script: "http-vuln-cve2015-1427",
		severity: "medium",
		output: "Elasticsearch 7.17 groovy scripting disabled — not vulnerable to CVE-2015-1427.\nTLS: off on :9200"
	}],
	wshr: [{
		script: "smb-os-discovery",
		severity: "low",
		output: "OS: Windows 10 Pro 19045\nComputer name: WS-HR-01\nDomain: ACME"
	}, {
		script: "smb-security-mode",
		severity: "medium",
		output: "account_used: guest\nmessage_signing: disabled"
	}],
	dns1: [{
		script: "dns-recursion",
		severity: "medium",
		output: "Recursion: enabled (from 10.0.0.0/8)"
	}, {
		script: "dns-zone-transfer",
		severity: "high",
		output: "Zone transfer successful for acme.lab (42 records)"
	}],
	db1: [{
		script: "pgsql-brute",
		severity: "high",
		output: "Valid credentials: app_rw / app_rw against database acme_prod"
	}],
	apg: [{
		script: "broadcast-dhcp-discover",
		severity: "info",
		output: "IP offered: 10.50.12.84  gateway 10.50.0.1  no client isolation"
	}]
};
function cloneSampleNetwork() {
	return {
		nodes: SAMPLE_NODES.map((n) => ({
			...n,
			ports: n.ports.map((p) => ({ ...p })),
			findings: []
		})),
		links: SAMPLE_LINKS.map((l) => ({ ...l }))
	};
}
var KIND_RADIUS = {
	internet: 18,
	gateway: 14,
	firewall: 15,
	switch: 13,
	server: 12,
	workstation: 10,
	iot: 9,
	cloud: 14
};
function readColors(el) {
	const s = getComputedStyle(el);
	const v = (name, fallback) => {
		return s.getPropertyValue(name).trim() || fallback;
	};
	return {
		bg: v("--color-background", "#090a0b"),
		edge: v("--color-graph-edge", "rgba(230,228,223,0.14)"),
		edgeActive: v("--color-graph-edge-active", "rgba(138,164,179,0.7)"),
		edgeLabel: v("--color-graph-edge-label", "rgba(230,228,223,0.48)"),
		nodeLabel: v("--color-foreground", "#e6e4df"),
		muted: v("--color-muted-foreground", "#8b8e92"),
		highlight: v("--color-graph-highlight", "#c5d4dc"),
		selected: v("--color-primary", "#d5d2cb"),
		kinds: {
			internet: v("--color-graph-internet", "#9aa3ab"),
			gateway: v("--color-graph-gateway", "#8aa4b3"),
			firewall: v("--color-graph-firewall", "#b08980"),
			switch: v("--color-graph-switch", "#7a8f9a"),
			server: v("--color-graph-server", "#7d9a8c"),
			workstation: v("--color-graph-workstation", "#9a9b96"),
			iot: v("--color-graph-iot", "#8a8078"),
			cloud: v("--color-graph-cloud", "#7a90a8")
		},
		up: v("--color-status-up", "#7d9a8c"),
		down: v("--color-status-down", "#b08980"),
		filtered: v("--color-status-filtered", "#a09070")
	};
}
var GraphEngine = class {
	canvas;
	ctx;
	nodes = [];
	links = [];
	nodeById = /* @__PURE__ */ new Map();
	tx = 0;
	ty = 0;
	k = 1;
	alpha = 1;
	frozen = false;
	search = "";
	selectedId = null;
	hoverId = null;
	activeHostId = null;
	width = 0;
	height = 0;
	dpr = 1;
	raf = 0;
	colors;
	dragging = null;
	panning = false;
	lastX = 0;
	lastY = 0;
	pointers = /* @__PURE__ */ new Map();
	pinchDist = 0;
	running = false;
	onSelect;
	onHover;
	ro;
	constructor(canvas, handlers) {
		this.canvas = canvas;
		const ctx = canvas.getContext("2d", {
			alpha: false,
			desynchronized: true
		});
		if (!ctx) throw new Error("canvas");
		this.ctx = ctx;
		this.onSelect = handlers.onSelect;
		this.onHover = handlers.onHover;
		this.colors = readColors(canvas);
		this.ro = new ResizeObserver(() => this.resize());
		this.ro.observe(canvas.parentElement ?? canvas);
		this.bind();
		this.resize();
	}
	setGraph(nodes, links) {
		const prev = this.nodeById;
		this.nodes = nodes.map((data) => {
			const old = prev.get(data.id);
			const anchor = ZONE_ANCHORS[data.zone] ?? {
				x: 0,
				y: 0
			};
			const r = KIND_RADIUS[data.kind];
			if (old) {
				old.data = data;
				old.r = r;
				return old;
			}
			return {
				id: data.id,
				x: anchor.x + (Math.random() - .5) * 80,
				y: anchor.y + (Math.random() - .5) * 80,
				vx: 0,
				vy: 0,
				fx: null,
				fy: null,
				r,
				data
			};
		});
		this.nodeById = new Map(this.nodes.map((n) => [n.id, n]));
		this.links = [];
		for (const l of links) {
			const s = this.nodeById.get(l.source);
			const t = this.nodeById.get(l.target);
			if (s && t) this.links.push({
				source: s,
				target: t,
				label: l.label,
				proto: l.proto
			});
		}
		this.alpha = Math.max(this.alpha, .4);
		if (this.k === 1 && this.tx === 0 && this.ty === 0) this.fit();
	}
	setSearch(q) {
		this.search = q.trim().toLowerCase();
	}
	setFrozen(v) {
		this.frozen = v;
		if (!v) this.alpha = Math.max(this.alpha, .15);
	}
	setSelected(id) {
		this.selectedId = id;
	}
	setActiveHost(id) {
		this.activeHostId = id;
	}
	restart() {
		this.frozen = false;
		this.alpha = 1;
		for (const n of this.nodes) {
			if (this.dragging === n) continue;
			n.fx = null;
			n.fy = null;
			n.vx += (Math.random() - .5) * 8;
			n.vy += (Math.random() - .5) * 8;
		}
	}
	fit() {
		if (!this.nodes.length || !this.width) return;
		let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
		for (const n of this.nodes) {
			minX = Math.min(minX, n.x - n.r);
			minY = Math.min(minY, n.y - n.r);
			maxX = Math.max(maxX, n.x + n.r);
			maxY = Math.max(maxY, n.y + n.r);
		}
		const bw = maxX - minX || 1;
		const bh = maxY - minY || 1;
		const k = Math.min((this.width - 176) / bw, (this.height - 176) / bh, 2.2);
		this.k = Math.max(.25, k);
		this.tx = this.width / 2 - (minX + maxX) / 2 * this.k;
		this.ty = this.height / 2 - (minY + maxY) / 2 * this.k;
	}
	zoomAt(sx, sy, factor) {
		const wx = (sx - this.tx) / this.k;
		const wy = (sy - this.ty) / this.k;
		this.k = Math.min(6, Math.max(.18, this.k * factor));
		this.tx = sx - wx * this.k;
		this.ty = sy - wy * this.k;
	}
	start() {
		if (this.running) return;
		this.running = true;
		const loop = () => {
			if (!this.running) return;
			if (!this.frozen && this.alpha > .012) this.tick();
			this.draw();
			this.raf = requestAnimationFrame(loop);
		};
		this.raf = requestAnimationFrame(loop);
	}
	destroy() {
		this.running = false;
		cancelAnimationFrame(this.raf);
		this.ro.disconnect();
		this.unbind();
	}
	resize() {
		const rect = (this.canvas.parentElement ?? this.canvas).getBoundingClientRect();
		this.width = Math.max(1, rect.width);
		this.height = Math.max(1, rect.height);
		this.dpr = Math.min(2, window.devicePixelRatio || 1);
		this.canvas.width = Math.floor(this.width * this.dpr);
		this.canvas.height = Math.floor(this.height * this.dpr);
		this.canvas.style.width = `${this.width}px`;
		this.canvas.style.height = `${this.height}px`;
		this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
		this.colors = readColors(this.canvas);
	}
	tick() {
		const nodes = this.nodes;
		const n = nodes.length;
		const charge = -220;
		const alpha = this.alpha;
		for (let i = 0; i < n; i++) {
			const a = nodes[i];
			for (let j = i + 1; j < n; j++) {
				const b = nodes[j];
				let dx = b.x - a.x;
				let dy = b.y - a.y;
				let dist2 = dx * dx + dy * dy;
				if (dist2 < .01) {
					dx = (Math.random() - .5) * .4;
					dy = (Math.random() - .5) * .4;
					dist2 = dx * dx + dy * dy;
				}
				const dist = Math.sqrt(dist2);
				const minD = a.r + b.r + 18;
				let f = charge * alpha / dist2;
				if (dist < minD) f -= (minD - dist) * .35 / dist;
				const fx = dx / dist * f;
				const fy = dy / dist * f;
				a.vx += fx;
				a.vy += fy;
				b.vx -= fx;
				b.vy -= fy;
			}
		}
		for (const l of this.links) {
			const a = l.source;
			const b = l.target;
			const dx = b.x - a.x;
			const dy = b.y - a.y;
			const dist = Math.sqrt(dx * dx + dy * dy) || .01;
			const rest = 92 + a.r + b.r;
			const kSpring = .045 * alpha;
			const f = (dist - rest) * kSpring;
			const fx = dx / dist * f;
			const fy = dy / dist * f;
			a.vx += fx;
			a.vy += fy;
			b.vx -= fx;
			b.vy -= fy;
		}
		for (const node of nodes) {
			const anchor = ZONE_ANCHORS[node.data.zone];
			if (anchor) {
				node.vx += (anchor.x - node.x) * .012 * alpha;
				node.vy += (anchor.y - node.y) * .012 * alpha;
			}
			node.vx += -node.x * .002 * alpha;
			node.vy += -node.y * .002 * alpha;
			if (node.fx != null) {
				node.x = node.fx;
				node.vx = 0;
			} else {
				node.vx *= .82;
				node.x += node.vx;
			}
			if (node.fy != null) {
				node.y = node.fy;
				node.vy = 0;
			} else {
				node.vy *= .82;
				node.y += node.vy;
			}
		}
		this.alpha *= .985;
	}
	matches(node) {
		const q = this.search;
		if (!q) return true;
		const d = node.data;
		if (d.hostname.toLowerCase().includes(q) || d.ip.includes(q) || d.os.toLowerCase().includes(q)) return true;
		if (d.kind.includes(q) || d.zone.includes(q)) return true;
		return d.ports.some((p) => p.service.includes(q) || String(p.port).includes(q));
	}
	draw() {
		const { ctx, width, height, colors, k } = this;
		ctx.fillStyle = colors.bg;
		ctx.fillRect(0, 0, width, height);
		this.drawGrid();
		ctx.save();
		ctx.translate(this.tx, this.ty);
		ctx.scale(k, k);
		const searching = this.search.length > 0;
		const showEdgeLabels = k > .72;
		const showNodeLabels = k > .48;
		for (const l of this.links) {
			const a = l.source;
			const b = l.target;
			const aHit = !searching || this.matches(a);
			const bHit = !searching || this.matches(b);
			const hot = this.selectedId === a.id || this.selectedId === b.id || this.hoverId === a.id || this.hoverId === b.id;
			ctx.globalAlpha = searching && !(aHit && bHit) ? .08 : hot ? .95 : .55;
			ctx.strokeStyle = hot ? colors.edgeActive : colors.edge;
			ctx.lineWidth = (hot ? 1.6 : 1) / k;
			ctx.beginPath();
			ctx.moveTo(a.x, a.y);
			ctx.lineTo(b.x, b.y);
			ctx.stroke();
			if (showEdgeLabels && (!searching || aHit && bHit)) {
				const mx = (a.x + b.x) / 2;
				const my = (a.y + b.y) / 2;
				ctx.save();
				ctx.globalAlpha = hot ? .9 : .55;
				ctx.font = `${11 / k}px "IBM Plex Mono", ui-monospace, monospace`;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				const padX = 4 / k;
				const tw = ctx.measureText(l.label).width;
				ctx.fillStyle = colors.bg;
				ctx.fillRect(mx - tw / 2 - padX, my - 7 / k, tw + padX * 2, 14 / k);
				ctx.fillStyle = colors.edgeLabel;
				ctx.fillText(l.label, mx, my);
				ctx.restore();
			}
		}
		ctx.globalAlpha = 1;
		for (const node of this.nodes) {
			const hit = this.matches(node);
			ctx.globalAlpha = searching && !hit ? .16 : 1;
			this.drawNode(node, hit && searching, k);
		}
		if (showNodeLabels) {
			ctx.font = `${12 / k}px "IBM Plex Sans", system-ui, sans-serif`;
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			for (const node of this.nodes) {
				const hit = this.matches(node);
				if (searching && !hit) continue;
				ctx.globalAlpha = .88;
				ctx.fillStyle = colors.nodeLabel;
				ctx.fillText(node.data.hostname.split(".")[0] ?? node.data.hostname, node.x, node.y + node.r + 5 / k);
				ctx.font = `${10 / k}px "IBM Plex Mono", ui-monospace, monospace`;
				ctx.fillStyle = colors.muted;
				ctx.fillText(node.data.ip, node.x, node.y + node.r + 18 / k);
				ctx.font = `${12 / k}px "IBM Plex Sans", system-ui, sans-serif`;
			}
		}
		ctx.restore();
		ctx.globalAlpha = 1;
	}
	drawGrid() {
		const { ctx, width, height, colors, k, tx, ty } = this;
		const step = 48 * k;
		if (step < 18) return;
		ctx.save();
		ctx.strokeStyle = colors.edge;
		ctx.globalAlpha = .18;
		ctx.lineWidth = 1;
		const ox = (tx % step + step) % step;
		const oy = (ty % step + step) % step;
		ctx.beginPath();
		for (let x = ox; x < width; x += step) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
		}
		for (let y = oy; y < height; y += step) {
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
		}
		ctx.stroke();
		ctx.restore();
	}
	drawNode(node, searched, k) {
		const { ctx, colors } = this;
		const { x, y, r, data } = node;
		const fill = colors.kinds[data.kind];
		const selected = this.selectedId === node.id;
		const hover = this.hoverId === node.id;
		const active = this.activeHostId === node.id;
		if (selected || searched || active) {
			ctx.beginPath();
			ctx.arc(x, y, r + 7 / k, 0, Math.PI * 2);
			ctx.strokeStyle = searched ? colors.highlight : selected ? colors.selected : colors.edgeActive;
			ctx.globalAlpha = active ? .85 : .7;
			ctx.lineWidth = 2 / k;
			ctx.stroke();
			ctx.globalAlpha = 1;
		}
		ctx.fillStyle = fill;
		ctx.strokeStyle = hover || selected ? colors.selected : colors.bg;
		ctx.lineWidth = 1.4 / k;
		this.kindPath(data.kind, x, y, r);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(x + r * .55, y - r * .55, 2.4, 0, Math.PI * 2);
		ctx.fillStyle = data.status === "up" ? colors.up : data.status === "down" ? colors.down : colors.filtered;
		ctx.fill();
		if (data.findings.some((f) => f.severity === "critical" || f.severity === "high")) {
			ctx.beginPath();
			ctx.arc(x - r * .55, y - r * .55, 2.6, 0, Math.PI * 2);
			ctx.fillStyle = colors.down;
			ctx.fill();
		}
	}
	kindPath(kind, x, y, r) {
		const ctx = this.ctx;
		ctx.beginPath();
		if (kind === "firewall") hex(ctx, x, y, r);
		else if (kind === "gateway" || kind === "cloud") diamond(ctx, x, y, r);
		else if (kind === "switch") roundRect(ctx, x - r, y - r * .7, r * 2, r * 1.4, r * .25);
		else if (kind === "iot") ctx.rect(x - r * .85, y - r * .85, r * 1.7, r * 1.7);
		else if (kind === "internet") ctx.arc(x, y, r, 0, Math.PI * 2);
		else ctx.arc(x, y, r, 0, Math.PI * 2);
	}
	hit(sx, sy) {
		const wx = (sx - this.tx) / this.k;
		const wy = (sy - this.ty) / this.k;
		let best = null;
		let bestD = Infinity;
		for (let i = this.nodes.length - 1; i >= 0; i--) {
			const n = this.nodes[i];
			const dx = n.x - wx;
			const dy = n.y - wy;
			const d = dx * dx + dy * dy;
			if (d <= (n.r + 6) * (n.r + 6) && d < bestD) {
				best = n;
				bestD = d;
			}
		}
		return best;
	}
	bind() {
		this.canvas.addEventListener("pointerdown", this.onPointerDown);
		this.canvas.addEventListener("pointermove", this.onPointerMove);
		this.canvas.addEventListener("pointerup", this.onPointerUp);
		this.canvas.addEventListener("pointercancel", this.onPointerUp);
		this.canvas.addEventListener("pointerleave", this.onPointerLeave);
		this.canvas.addEventListener("wheel", this.onWheel, { passive: false });
		this.canvas.addEventListener("dblclick", this.onDblClick);
	}
	unbind() {
		this.canvas.removeEventListener("pointerdown", this.onPointerDown);
		this.canvas.removeEventListener("pointermove", this.onPointerMove);
		this.canvas.removeEventListener("pointerup", this.onPointerUp);
		this.canvas.removeEventListener("pointercancel", this.onPointerUp);
		this.canvas.removeEventListener("pointerleave", this.onPointerLeave);
		this.canvas.removeEventListener("wheel", this.onWheel);
		this.canvas.removeEventListener("dblclick", this.onDblClick);
	}
	onPointerDown = (e) => {
		this.canvas.setPointerCapture(e.pointerId);
		this.pointers.set(e.pointerId, {
			x: e.offsetX,
			y: e.offsetY
		});
		if (this.pointers.size === 2) {
			const pts = [...this.pointers.values()];
			this.pinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
			this.dragging = null;
			this.panning = false;
			return;
		}
		const hit = this.hit(e.offsetX, e.offsetY);
		this.lastX = e.offsetX;
		this.lastY = e.offsetY;
		if (hit) {
			this.dragging = hit;
			hit.fx = hit.x;
			hit.fy = hit.y;
			this.alpha = Math.max(this.alpha, .25);
		} else this.panning = true;
	};
	onPointerMove = (e) => {
		if (this.pointers.has(e.pointerId)) this.pointers.set(e.pointerId, {
			x: e.offsetX,
			y: e.offsetY
		});
		if (this.pointers.size === 2) {
			const pts = [...this.pointers.values()];
			const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
			if (this.pinchDist > 0 && dist > 0) {
				const midX = (pts[0].x + pts[1].x) / 2;
				const midY = (pts[0].y + pts[1].y) / 2;
				this.zoomAt(midX, midY, dist / this.pinchDist);
			}
			this.pinchDist = dist;
			return;
		}
		if (this.dragging) {
			const wx = (e.offsetX - this.tx) / this.k;
			const wy = (e.offsetY - this.ty) / this.k;
			this.dragging.fx = wx;
			this.dragging.fy = wy;
			this.dragging.x = wx;
			this.dragging.y = wy;
			this.alpha = Math.max(this.alpha, .2);
			return;
		}
		if (this.panning) {
			this.tx += e.offsetX - this.lastX;
			this.ty += e.offsetY - this.lastY;
			this.lastX = e.offsetX;
			this.lastY = e.offsetY;
			return;
		}
		const hit = this.hit(e.offsetX, e.offsetY);
		const id = hit?.id ?? null;
		if (id !== this.hoverId) {
			this.hoverId = id;
			this.canvas.style.cursor = hit ? "grab" : "default";
		}
		this.onHover(hit?.data ?? null, e.clientX, e.clientY);
	};
	onPointerUp = (e) => {
		const wasDrag = this.dragging;
		const moved = Math.abs(e.offsetX - this.lastX) + Math.abs(e.offsetY - this.lastY) > 4 || this.panning;
		this.pointers.delete(e.pointerId);
		if (this.pointers.size < 2) this.pinchDist = 0;
		if (wasDrag) {
			wasDrag.fx = null;
			wasDrag.fy = null;
			if (!moved) {
				this.selectedId = wasDrag.id;
				this.onSelect(wasDrag.id);
			}
		} else if (!moved && this.pointers.size === 0) {
			this.selectedId = null;
			this.onSelect(null);
		}
		this.dragging = null;
		this.panning = false;
		try {
			this.canvas.releasePointerCapture(e.pointerId);
		} catch {}
	};
	onPointerLeave = () => {
		this.hoverId = null;
		this.onHover(null, 0, 0);
	};
	onWheel = (e) => {
		e.preventDefault();
		const factor = e.deltaY < 0 ? 1.08 : .92;
		this.zoomAt(e.offsetX, e.offsetY, factor);
	};
	onDblClick = (e) => {
		const hit = this.hit(e.offsetX, e.offsetY);
		if (hit) {
			this.k = Math.min(3.2, this.k * 1.4);
			this.tx = this.width / 2 - hit.x * this.k;
			this.ty = this.height / 2 - hit.y * this.k;
		} else this.fit();
	};
};
function hex(ctx, x, y, r) {
	ctx.moveTo(x + r, y);
	for (let i = 1; i < 6; i++) {
		const a = Math.PI / 3 * i;
		ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
	}
	ctx.closePath();
}
function diamond(ctx, x, y, r) {
	ctx.moveTo(x, y - r);
	ctx.lineTo(x + r, y);
	ctx.lineTo(x, y + r);
	ctx.lineTo(x - r, y);
	ctx.closePath();
}
function roundRect(ctx, x, y, w, h, r) {
	const rr = Math.min(r, w / 2, h / 2);
	ctx.moveTo(x + rr, y);
	ctx.arcTo(x + w, y, x + w, y + h, rr);
	ctx.arcTo(x + w, y + h, x, y + h, rr);
	ctx.arcTo(x, y + h, x, y, rr);
	ctx.arcTo(x, y, x + w, y, rr);
	ctx.closePath();
}
var SCAN_PROFILES = [
	{
		id: "quick",
		name: "Rychlý",
		blurb: "Top porty, T4. První přehled sítě.",
		flags: [
			"-T4",
			"-F",
			"-n"
		],
		defaultScripts: ["default"],
		ports: ""
	},
	{
		id: "intense",
		name: "Intenzivní",
		blurb: "Detekce OS, verzí a výchozí skripty.",
		flags: [
			"-T4",
			"-A",
			"-v"
		],
		defaultScripts: ["default", "safe"],
		ports: "1-1024"
	},
	{
		id: "stealth",
		name: "Stealth SYN",
		blurb: "Poloviční handshake, pomalejší časování.",
		flags: [
			"-sS",
			"-T2",
			"-f",
			"-n"
		],
		defaultScripts: [],
		ports: "1-1024"
	},
	{
		id: "udp",
		name: "UDP + TCP",
		blurb: "Kombinovaný sken služeb včetně UDP.",
		flags: [
			"-sS",
			"-sU",
			"-T4",
			"-A"
		],
		defaultScripts: ["discovery"],
		ports: "U:53,67,123,161,500,T:1-1024"
	},
	{
		id: "vuln",
		name: "Zranitelnosti",
		blurb: "Verze služeb a sada vuln skriptů.",
		flags: [
			"-sV",
			"-T4",
			"--script",
			"vuln"
		],
		defaultScripts: ["vuln"],
		ports: "1-65535"
	},
	{
		id: "all",
		name: "Všechny skripty",
		blurb: "Plný NSE katalog. Pomalé, hlučné, důkladné.",
		flags: [
			"-sS",
			"-sV",
			"-O",
			"-T4",
			"--script",
			"all"
		],
		defaultScripts: ["all"],
		ports: "1-65535"
	}
];
var TIMING_LABELS = [
	"T0 paranoid",
	"T1 sneaky",
	"T2 polite",
	"T3 normal",
	"T4 aggressive",
	"T5 insane"
];
var ROWS = [
	[
		"ftp-anon",
		[
			"auth",
			"default",
			"safe"
		],
		"Ověří anonymní FTP login."
	],
	[
		"http-auth",
		["auth", "default"],
		"Detekuje HTTP autentizaci a schémata."
	],
	[
		"http-auth-finder",
		["auth", "discovery"],
		"Hledá cesty vyžadující přihlášení."
	],
	[
		"http-ntlm-info",
		["auth", "discovery"],
		"Vytáhne NTLM informace z HTTP."
	],
	[
		"imap-capabilities",
		[
			"auth",
			"default",
			"safe"
		],
		"IMAP CAPABILITY banner."
	],
	[
		"mysql-empty-password",
		["auth", "intrusive"],
		"Test prázdného hesla u MySQL root."
	],
	[
		"mysql-info",
		[
			"auth",
			"discovery",
			"safe"
		],
		"Základní informace o MySQL serveru."
	],
	[
		"pop3-capabilities",
		[
			"auth",
			"default",
			"safe"
		],
		"POP3 CAPA výpis."
	],
	[
		"smb-security-mode",
		[
			"auth",
			"discovery",
			"safe"
		],
		"SMBv1 security mode a challenge."
	],
	[
		"smtp-enum-users",
		["auth", "external"],
		"Enumerace SMTP uživatelů (VRFY/EXPN)."
	],
	[
		"ssh-auth-methods",
		["auth", "safe"],
		"Podporované SSH autentizační metody."
	],
	[
		"ssh2-enum-algos",
		[
			"auth",
			"safe",
			"discovery"
		],
		"Algoritmy SSH kex/cipher/mac."
	],
	[
		"telnet-encryption",
		["auth", "safe"],
		"Zjistí, zda Telnet šifruje."
	],
	[
		"vnc-info",
		[
			"auth",
			"discovery",
			"safe"
		],
		"VNC protokol a autentizace."
	],
	[
		"krb5-enum-users",
		["auth", "discovery"],
		"Enumerace Kerberos principalů."
	],
	[
		"ldap-rootdse",
		[
			"auth",
			"discovery",
			"safe"
		],
		"LDAP rootDSE atributy."
	],
	[
		"realvnc-auth-bypass",
		[
			"auth",
			"exploit",
			"vuln"
		],
		"Bypass autentizace RealVNC."
	],
	[
		"broadcast-dhcp-discover",
		[
			"broadcast",
			"discovery",
			"safe"
		],
		"DHCP discover ve L2 broadcastu."
	],
	[
		"broadcast-dns-service-discovery",
		[
			"broadcast",
			"discovery",
			"safe"
		],
		"mDNS/DNS-SD služby."
	],
	[
		"broadcast-listener",
		["broadcast", "safe"],
		"Naslouchá broadcast paketům."
	],
	[
		"broadcast-ping",
		["broadcast", "discovery"],
		"ICMP echo na broadcast adresu."
	],
	[
		"broadcast-wpad-discover",
		["broadcast", "discovery"],
		"WPAD proxy autodiscovery."
	],
	[
		"lltd-discovery",
		[
			"broadcast",
			"discovery",
			"safe"
		],
		"Link Layer Topology Discovery."
	],
	[
		"ipv6-multicast-mld-list",
		[
			"broadcast",
			"discovery",
			"safe"
		],
		"IPv6 MLD multicast skupiny."
	],
	[
		"nbns-interfaces",
		["broadcast", "discovery"],
		"NetBIOS name service rozhraní."
	],
	[
		"ftp-brute",
		["brute", "intrusive"],
		"Hrubá síla FTP přihlášení."
	],
	[
		"http-brute",
		["brute", "intrusive"],
		"HTTP basic/digest brute-force."
	],
	[
		"http-form-brute",
		["brute", "intrusive"],
		"Brute-force HTML přihlašovacích formulářů."
	],
	[
		"ssh-brute",
		["brute", "intrusive"],
		"SSH password brute-force."
	],
	[
		"smb-brute",
		["brute", "intrusive"],
		"SMB/NTLM brute-force."
	],
	[
		"mysql-brute",
		["brute", "intrusive"],
		"MySQL login brute-force."
	],
	[
		"postgres-brute",
		["brute", "intrusive"],
		"PostgreSQL brute-force."
	],
	[
		"snmp-brute",
		["brute", "intrusive"],
		"SNMP community string brute-force."
	],
	[
		"vnc-brute",
		["brute", "intrusive"],
		"VNC heslo brute-force."
	],
	[
		"rdp-brute",
		["brute", "intrusive"],
		"RDP přihlášení brute-force."
	],
	[
		"imap-brute",
		["brute", "intrusive"],
		"IMAP login brute-force."
	],
	[
		"pop3-brute",
		["brute", "intrusive"],
		"POP3 login brute-force."
	],
	[
		"smtp-brute",
		["brute", "intrusive"],
		"SMTP AUTH brute-force."
	],
	[
		"ldap-brute",
		["brute", "intrusive"],
		"LDAP simple bind brute-force."
	],
	[
		"mongodb-brute",
		["brute", "intrusive"],
		"MongoDB brute-force."
	],
	[
		"redis-brute",
		["brute", "intrusive"],
		"Redis AUTH brute-force."
	],
	[
		"oracle-brute",
		["brute", "intrusive"],
		"Oracle SID/login brute-force."
	],
	[
		"wordpress-brute",
		["brute", "intrusive"],
		"WordPress wp-login brute-force."
	],
	[
		"dns-brute",
		["brute", "discovery"],
		"DNS subdomain brute-force."
	],
	[
		"telnet-brute",
		["brute", "intrusive"],
		"Telnet login brute-force."
	],
	[
		"sip-brute",
		["brute", "intrusive"],
		"SIP REGISTER brute-force."
	],
	[
		"rsync-brute",
		["brute", "intrusive"],
		"rsync autentizace brute-force."
	],
	[
		"cassandra-brute",
		["brute", "intrusive"],
		"Cassandra login brute-force."
	],
	[
		"xmpp-brute",
		["brute", "intrusive"],
		"XMPP brute-force."
	],
	[
		"banner",
		[
			"default",
			"discovery",
			"safe"
		],
		"Zachytí servisní banner."
	],
	[
		"address-info",
		[
			"default",
			"safe",
			"discovery"
		],
		"Doplní WHOIS/ASN k adrese."
	],
	[
		"dns-nsid",
		[
			"default",
			"discovery",
			"safe"
		],
		"DNS NSID identifikátor serveru."
	],
	[
		"dns-recursion",
		[
			"default",
			"discovery",
			"safe"
		],
		"Test otevřené DNS rekurze."
	],
	[
		"http-methods",
		[
			"default",
			"discovery",
			"safe"
		],
		"Povolené HTTP metody."
	],
	[
		"http-title",
		[
			"default",
			"discovery",
			"safe"
		],
		"Titulek HTML stránky."
	],
	[
		"smb-os-discovery",
		[
			"default",
			"discovery",
			"safe"
		],
		"OS, jméno a doména přes SMB."
	],
	[
		"ssh-hostkey",
		[
			"default",
			"safe",
			"discovery"
		],
		"SSH host key otisk."
	],
	[
		"ssl-cert",
		[
			"default",
			"safe",
			"discovery"
		],
		"X.509 certifikát TLS služby."
	],
	[
		"ssl-date",
		["default", "safe"],
		"Čas z TLS serveru."
	],
	[
		"xmlrpc-methods",
		[
			"default",
			"discovery",
			"safe"
		],
		"Výpis XML-RPC metod."
	],
	[
		"rpcinfo",
		[
			"default",
			"discovery",
			"safe"
		],
		"RPC programy přes portmapper."
	],
	[
		"afp-serverinfo",
		[
			"default",
			"discovery",
			"safe"
		],
		"Apple Filing Protocol info."
	],
	[
		"nbstat",
		[
			"default",
			"discovery",
			"safe"
		],
		"NetBIOS stat jména a MAC."
	],
	[
		"asn-query",
		[
			"discovery",
			"external",
			"safe"
		],
		"ASN a prefix k IP."
	],
	[
		"targets-asn",
		["discovery", "safe"],
		"Cíle z ASN rozsahu."
	],
	[
		"dns-service-discovery",
		["discovery", "safe"],
		"DNS-SD enumerace služeb."
	],
	[
		"dns-srv-enum",
		["discovery", "safe"],
		"SRV záznamy běžných služeb."
	],
	[
		"http-enum",
		["discovery", "intrusive"],
		"Enumerace cest a aplikací na HTTP."
	],
	[
		"http-robots.txt",
		["discovery", "safe"],
		"Stáhne robots.txt."
	],
	[
		"http-sitemap-generator",
		["discovery"],
		"Sestaví sitemap z odkazů."
	],
	[
		"http-headers",
		["discovery", "safe"],
		"HTTP response hlavičky."
	],
	[
		"http-server-header",
		[
			"discovery",
			"version",
			"safe"
		],
		"Server hlavička."
	],
	[
		"ipv6-node-info",
		["discovery", "safe"],
		"IPv6 node information query."
	],
	[
		"llmnr-resolve",
		["discovery", "safe"],
		"LLMNR resoluce jmen."
	],
	[
		"mdns-discovery",
		["discovery", "safe"],
		"mDNS služby v LAN."
	],
	[
		"msrpc-enum",
		["discovery"],
		"Enumerace MSRPC endpointů."
	],
	[
		"nfs-ls",
		["discovery"],
		"Výpis NFS exportů a souborů."
	],
	[
		"nfs-showmount",
		["discovery", "safe"],
		"showmount -e ekvivalent."
	],
	[
		"ntp-info",
		["discovery", "safe"],
		"NTP stratum a refid."
	],
	[
		"ntp-monlist",
		["discovery"],
		"NTP monlist (amplifikace)."
	],
	[
		"path-mtu",
		["discovery", "safe"],
		"Path MTU discovery."
	],
	[
		"smb-enum-shares",
		["discovery"],
		"SMB sdílené složky."
	],
	[
		"smb-enum-users",
		["discovery"],
		"Uživatelé přes SAMR/LSA."
	],
	[
		"smb-enum-sessions",
		["discovery"],
		"Aktivní SMB relace."
	],
	[
		"smb-enum-domains",
		["discovery"],
		"Domény přes SMB."
	],
	[
		"smb-protocols",
		["discovery", "safe"],
		"Podporované SMB dialekty."
	],
	[
		"snmp-interfaces",
		["discovery", "safe"],
		"SNMP ifTable rozhraní."
	],
	[
		"snmp-netstat",
		["discovery"],
		"SNMP netstat tabulka."
	],
	[
		"snmp-processes",
		["discovery"],
		"SNMP hrSWRun procesy."
	],
	[
		"snmp-sysdescr",
		["discovery", "safe"],
		"SNMP sysDescr a sysName."
	],
	[
		"snmp-win32-services",
		["discovery"],
		"Windows služby přes SNMP."
	],
	[
		"upnp-info",
		["discovery", "safe"],
		"UPnP device description."
	],
	[
		"whois-domain",
		[
			"discovery",
			"external",
			"safe"
		],
		"WHOIS k doméně."
	],
	[
		"whois-ip",
		[
			"discovery",
			"external",
			"safe"
		],
		"WHOIS k IP."
	],
	[
		"traceroute-geolocation",
		[
			"discovery",
			"safe",
			"external"
		],
		"Geolokace hopů traceroute."
	],
	[
		"targets-sniffer",
		["discovery"],
		"Cíle z odposlechu."
	],
	[
		"broadcast-avahi-dos",
		["discovery", "dos"],
		"Avahi/mDNS flood test."
	],
	[
		"dns-zone-transfer",
		["discovery", "intrusive"],
		"AXFR zónový přenos."
	],
	[
		"http-devframework",
		["discovery", "safe"],
		"Detekce vývojářských frameworků."
	],
	[
		"http-generator",
		["discovery", "safe"],
		"HTML generator meta tag."
	],
	[
		"http-grep",
		["discovery"],
		"Hledá vzory v HTTP odpovědích."
	],
	[
		"http-open-proxy",
		["discovery"],
		"Test otevřené HTTP proxy."
	],
	[
		"http-open-redirect",
		["discovery", "safe"],
		"Open redirect na parametrech."
	],
	[
		"iscsi-info",
		["discovery", "safe"],
		"iSCSI target informace."
	],
	[
		"modbus-discover",
		["discovery", "safe"],
		"Modbus device ID."
	],
	[
		"mqtt-subscribe",
		["discovery"],
		"MQTT subscribe test."
	],
	[
		"rdp-enum-encryption",
		["discovery", "safe"],
		"RDP šifrovací úroveň."
	],
	[
		"rdp-ntlm-info",
		["discovery", "safe"],
		"NTLM info z RDP."
	],
	[
		"sip-methods",
		["discovery", "safe"],
		"SIP ALLOW metody."
	],
	[
		"smb2-capabilities",
		["discovery", "safe"],
		"SMB2 capabilities."
	],
	[
		"smb2-security-mode",
		["discovery", "safe"],
		"SMB2 signing required/enabled."
	],
	[
		"ssh-run",
		["discovery", "intrusive"],
		"Spustí příkaz po SSH přihlášení."
	],
	[
		"ssl-enum-ciphers",
		[
			"discovery",
			"safe",
			"version"
		],
		"TLS cipher suites a protokoly."
	],
	[
		"tls-nextprotoneg",
		["discovery", "safe"],
		"NPN/ALPN protokoly."
	],
	[
		"vmware-version",
		[
			"discovery",
			"version",
			"safe"
		],
		"VMware SOAP verze."
	],
	[
		"waf-detect",
		["discovery", "safe"],
		"Detekce WAF."
	],
	[
		"weblogic-t3-info",
		["discovery", "safe"],
		"WebLogic T3 banner."
	],
	[
		"http-slowloris-check",
		["dos", "safe"],
		"Kontrola odolnosti vůči Slowloris."
	],
	[
		"http-slowloris",
		["dos", "intrusive"],
		"Slowloris DoS (destruktivní)."
	],
	[
		"ipv6-ra-flood",
		["dos", "intrusive"],
		"IPv6 router advertisement flood."
	],
	[
		"smb-flood",
		["dos", "intrusive"],
		"SMB request flood."
	],
	[
		"dns-update",
		["dos", "intrusive"],
		"Dynamický DNS update test."
	],
	[
		"http-vuln-cve2017-5638",
		["exploit", "vuln"],
		"Apache Struts2 RCE (CVE-2017-5638)."
	],
	[
		"http-shellshock",
		["exploit", "vuln"],
		"Bash Shellshock přes CGI."
	],
	[
		"http-vuln-cve2014-3704",
		["exploit", "vuln"],
		"Drupal SQL injection (Drupageddon)."
	],
	[
		"irc-unrealircd-backdoor",
		[
			"exploit",
			"malware",
			"vuln"
		],
		"UnrealIRCd backdoor."
	],
	[
		"smb-vuln-ms08-067",
		["exploit", "vuln"],
		"MS08-067 Conficker/NetAPI."
	],
	[
		"smb-vuln-ms17-010",
		["exploit", "vuln"],
		"MS17-010 EternalBlue."
	],
	[
		"smtp-vuln-cve2010-4344",
		["exploit", "vuln"],
		"Exim heap overflow."
	],
	[
		"http-adobe-coldfusion-apsa1301",
		["exploit", "vuln"],
		"ColdFusion APSA13-01."
	],
	[
		"jdwp-exec",
		["exploit", "intrusive"],
		"Java Debug Wire Protocol RCE."
	],
	[
		"rmi-vuln-classloader",
		["exploit", "vuln"],
		"Java RMI class loader."
	],
	[
		"http-google-malware",
		["external", "safe"],
		"Google Safe Browsing kontrola."
	],
	[
		"http-virustotal",
		["external"],
		"VirusTotal reputace URL."
	],
	[
		"ip-geolocation-maxmind",
		[
			"external",
			"safe",
			"discovery"
		],
		"MaxMind geolokace."
	],
	[
		"ip-geolocation-ipinfodb",
		[
			"external",
			"safe",
			"discovery"
		],
		"IPInfoDB geolokace."
	],
	[
		"dns-fuzz",
		["fuzzer", "intrusive"],
		"Fuzzing DNS parseru."
	],
	[
		"http-form-fuzzer",
		["fuzzer", "intrusive"],
		"Fuzz HTML formulářů."
	],
	[
		"http-method-tamper",
		["fuzzer", "intrusive"],
		"Tamper HTTP metod a verbů."
	],
	[
		"auth-spoof",
		["malware", "safe"],
		"Detekce auth spoofing malware."
	],
	[
		"ftp-proftpd-backdoor",
		[
			"malware",
			"vuln",
			"exploit"
		],
		"ProFTPD 1.3.3c backdoor."
	],
	[
		"ftp-vsftpd-backdoor",
		[
			"malware",
			"vuln",
			"exploit"
		],
		"vsftpd 2.3.4 smiley backdoor."
	],
	[
		"http-malware-host",
		["malware", "safe"],
		"Indikátory malware hosting."
	],
	[
		"smtp-strangeport",
		["malware", "safe"],
		"SMTP na nestandardním portu."
	],
	[
		"sniffer-detect",
		["malware", "discovery"],
		"Detekce promiscuous módu."
	],
	[
		"dns-zeustracker",
		[
			"malware",
			"safe",
			"external"
		],
		"Kontrola Zeus trackeru."
	],
	[
		"fingerprint-strings",
		["version", "safe"],
		"Řetězce pro verzi služby."
	],
	[
		"sslv2",
		["version", "safe"],
		"SSLv2 podpora."
	],
	[
		"tor-consensus-checker",
		[
			"version",
			"safe",
			"discovery"
		],
		"Kontrola Tor consensus."
	],
	[
		"http-chrono",
		["version", "safe"],
		"Měření času HTTP odpovědi."
	],
	[
		"ike-version",
		[
			"version",
			"discovery",
			"safe"
		],
		"IKEv1/v2 a vendory."
	],
	[
		"ssl-heartbleed",
		["vuln", "safe"],
		"OpenSSL Heartbleed (CVE-2014-0160)."
	],
	[
		"ssl-poodle",
		["vuln", "safe"],
		"SSLv3 POODLE."
	],
	[
		"ssl-ccs-injection",
		["vuln", "safe"],
		"OpenSSL CCS injection."
	],
	[
		"ssl-dh-params",
		["vuln", "safe"],
		"Slabé Diffie-Hellman parametry."
	],
	[
		"ssl-known-key",
		["vuln", "safe"],
		"Známé kompromitované klíče."
	],
	[
		"sslv2-drown",
		["vuln", "safe"],
		"DROWN (SSLv2)."
	],
	[
		"tls-ticketbleed",
		["vuln", "safe"],
		"Ticketbleed (CVE-2016-9244)."
	],
	[
		"ssl-cert-intaddr",
		["vuln", "safe"],
		"Interní IP v certifikátu."
	],
	[
		"smb-vuln-cve-2017-7494",
		["vuln"],
		"SambaCry RCE."
	],
	[
		"smb-vuln-ms06-025",
		["vuln"],
		"MS06-025 RRAS."
	],
	[
		"smb-vuln-ms07-029",
		["vuln"],
		"MS07-029 DNS RPC."
	],
	[
		"smb-vuln-ms10-054",
		["vuln"],
		"MS10-054 SMB DoS."
	],
	[
		"smb-vuln-ms10-061",
		["vuln"],
		"MS10-061 Print Spooler."
	],
	[
		"http-csrf",
		["vuln", "safe"],
		"Hledá CSRF na formulářích."
	],
	[
		"http-dombased-xss",
		["vuln", "safe"],
		"DOM XSS sinky."
	],
	[
		"http-stored-xss",
		["vuln"],
		"Stored XSS test."
	],
	[
		"http-sql-injection",
		["vuln", "intrusive"],
		"Základní SQL injection probe."
	],
	[
		"http-vuln-cve2011-3192",
		["vuln"],
		"Apache Range header DoS."
	],
	[
		"http-vuln-cve2012-1823",
		["vuln"],
		"PHP-CGI remote argument injection."
	],
	[
		"http-vuln-cve2015-1635",
		["vuln"],
		"MS15-034 HTTP.sys."
	],
	[
		"http-vuln-cve2017-8917",
		["vuln"],
		"Joomla SQL injection."
	],
	[
		"rdp-vuln-ms12-020",
		["vuln", "safe"],
		"MS12-020 RDP DoS/RCE."
	],
	[
		"clamav-exec",
		["vuln", "exploit"],
		"ClamAV clamav-milter RCE."
	],
	[
		"distcc-cve2004-2687",
		["vuln", "exploit"],
		"distcc RCE."
	],
	[
		"ftp-libopie",
		["vuln"],
		"OPIE off-by-one."
	],
	[
		"http-huawei-hg5xx-vuln",
		["vuln"],
		"Huawei HG5xx informační únik."
	],
	[
		"http-litespeed-sourcecode-download",
		["vuln"],
		"LiteSpeed source disclosure."
	],
	[
		"http-vmware-path-vuln",
		["vuln"],
		"VMware path traversal."
	],
	[
		"mysql-vuln-cve2012-2122",
		["vuln", "auth"],
		"MySQL auth bypass (CVE-2012-2122)."
	],
	[
		"samba-vuln-cve-2012-1182",
		["vuln"],
		"Samba RPC overflow."
	],
	[
		"smtp-vuln-cve2011-1720",
		["vuln"],
		"Postfix Cyrus SASL."
	],
	[
		"supermicro-ipmi-conf",
		["vuln", "safe"],
		"Supermicro IPMI conf disclosure."
	],
	[
		"vulners",
		[
			"vuln",
			"safe",
			"external"
		],
		"CVE z Vulners podle verzí služeb."
	],
	[
		"vuln",
		["vuln"],
		"Meta-kategorie: spustí všechny vuln skripty."
	],
	[
		"smb-double-pulsar-backdoor",
		["vuln", "malware"],
		"Detekce DoublePulsar implantátu."
	],
	[
		"http-vuln-cve2006-3392",
		["vuln"],
		"Webmin file disclosure."
	],
	[
		"http-vuln-cve2013-7091",
		["vuln"],
		"Zimbra XXE."
	],
	[
		"http-vuln-cve2015-1427",
		["vuln", "exploit"],
		"Elasticsearch groovy RCE."
	],
	[
		"tls-poison",
		["vuln"],
		"TLS session poisoning test."
	],
	[
		"http-aspnet-debug",
		["vuln", "safe"],
		"ASP.NET debug mód."
	],
	[
		"http-phpmyadmin-dir-traversal",
		["vuln"],
		"phpMyAdmin directory traversal."
	],
	[
		"http-git",
		["vuln", "discovery"],
		"Odhalení .git adresáře."
	],
	[
		"http-config-backup",
		["vuln", "discovery"],
		"Zálohy konfigurace na webu."
	],
	[
		"http-default-accounts",
		[
			"auth",
			"intrusive",
			"vuln"
		],
		"Výchozí účty webových aplikací."
	],
	[
		"http-passwd",
		["vuln", "intrusive"],
		"Únik /etc/passwd přes LFI."
	],
	[
		"tftp-enum",
		["discovery", "intrusive"],
		"Enumerace TFTP souborů."
	],
	[
		"ajp-auth",
		["auth", "safe"],
		"AJP autentizační požadavek."
	],
	[
		"ajp-headers",
		["discovery", "safe"],
		"AJP hlavičky."
	],
	[
		"amqp-info",
		["discovery", "safe"],
		"AMQP/RabbitMQ info."
	],
	[
		"backorifice-info",
		["malware", "discovery"],
		"Back Orifice detekce."
	],
	[
		"bitcoin-info",
		["discovery", "safe"],
		"Bitcoin node informace."
	],
	[
		"cassandra-info",
		["discovery", "safe"],
		"Cassandra cluster info."
	],
	[
		"cccam-version",
		["version", "safe"],
		"CCcam verze."
	],
	[
		"citrix-enum-apps",
		["discovery"],
		"Citrix published apps."
	],
	[
		"couchdb-databases",
		["discovery"],
		"CouchDB _all_dbs."
	],
	[
		"cups-info",
		["discovery", "safe"],
		"CUPS server info."
	],
	[
		"cvs-brute",
		["brute", "intrusive"],
		"CVS pserver brute-force."
	],
	[
		"daytime",
		["discovery", "safe"],
		"Daytime protokol."
	],
	[
		"db2-das-info",
		["discovery", "safe"],
		"IBM DB2 DAS info."
	],
	[
		"dhcp-discover",
		["discovery", "safe"],
		"Unicast DHCP inform."
	],
	[
		"dict-info",
		["discovery", "safe"],
		"DICT server info."
	],
	[
		"docker-version",
		[
			"version",
			"discovery",
			"safe"
		],
		"Docker API verze."
	],
	[
		"domcon-cmd",
		["intrusive"],
		"Lotus Domino console."
	],
	[
		"drda-info",
		["discovery", "safe"],
		"DRDA/DB2 info."
	],
	[
		"enip-info",
		["discovery", "safe"],
		"EtherNet/IP device ident."
	],
	[
		"epmd-info",
		["discovery", "safe"],
		"Erlang port mapper."
	],
	[
		"finger",
		["discovery"],
		"Finger uživatelé."
	],
	[
		"firewalk",
		["discovery"],
		"Firewalk ACL inference."
	],
	[
		"fox-info",
		["discovery", "safe"],
		"Niagara Fox BMS info."
	],
	[
		"ganglia-info",
		["discovery", "safe"],
		"Ganglia XML status."
	],
	[
		"giop-info",
		["discovery", "safe"],
		"CORBA GIOP info."
	],
	[
		"gopher-ls",
		["discovery", "safe"],
		"Gopher listing."
	],
	[
		"hadoop-jobtracker-info",
		["discovery", "safe"],
		"Hadoop JobTracker."
	],
	[
		"hadoop-namenode-info",
		["discovery", "safe"],
		"Hadoop NameNode."
	],
	[
		"hbase-master-info",
		["discovery", "safe"],
		"HBase master."
	],
	[
		"http-affiliate-id",
		["discovery", "safe"],
		"Affiliate ID v HTML."
	],
	[
		"http-apache-negotiation",
		["discovery", "safe"],
		"Apache content negotiation."
	],
	[
		"http-avaya-ipoffice-users",
		["discovery"],
		"Avaya IP Office uživatelé."
	],
	[
		"http-backup-finder",
		["discovery", "intrusive"],
		"Hledá backup soubory webu."
	],
	[
		"http-barracuda-dir-traversal",
		["vuln"],
		"Barracuda directory traversal."
	],
	[
		"http-bigip-cookie",
		["discovery", "safe"],
		"F5 BIG-IP cookie decode."
	],
	[
		"http-cakephp-version",
		["version", "safe"],
		"CakePHP verze."
	],
	[
		"http-cisco-anyconnect",
		["discovery", "safe"],
		"Cisco AnyConnect XML."
	],
	[
		"http-coldfusion-subzero",
		["vuln"],
		"ColdFusion subzero hash."
	],
	[
		"http-comments-displayer",
		["discovery", "safe"],
		"HTML/JS komentáře."
	],
	[
		"http-cookie-flags",
		["default", "safe"],
		"HttpOnly/Secure flagy cookies."
	],
	[
		"http-cors",
		["discovery", "safe"],
		"CORS politika."
	],
	[
		"http-cross-domain-policy",
		[
			"discovery",
			"safe",
			"vuln"
		],
		"crossdomain.xml politika."
	],
	[
		"http-csrf",
		["vuln", "safe"],
		"CSRF tokeny na formulářích."
	],
	[
		"http-date",
		["discovery", "safe"],
		"Date hlavička vs. lokální čas."
	],
	[
		"http-drupal-enum",
		["discovery"],
		"Drupal moduly a verze."
	],
	[
		"http-errors",
		["discovery", "safe"],
		"Mapování chybových stránek."
	],
	[
		"http-exif-spider",
		["discovery"],
		"EXIF z obrázků na webu."
	],
	[
		"http-favicon",
		["discovery", "safe"],
		"Favicon hash pro fingerprint."
	],
	[
		"http-feed",
		["discovery", "safe"],
		"RSS/Atom feedy."
	],
	[
		"http-fetch",
		["discovery"],
		"Stáhne URL a uloží tělo."
	],
	[
		"http-fileupload-exploiter",
		["exploit", "intrusive"],
		"Test uploadu souborů."
	],
	[
		"http-form-flood",
		["dos", "intrusive"],
		"Flood HTML formuláře."
	],
	[
		"http-frontpage-login",
		["auth", "intrusive"],
		"FrontPage _vti_bin login."
	],
	[
		"http-gitweb-projects-enum",
		["discovery"],
		"gitweb projekty."
	],
	[
		"http-gravatar",
		["discovery", "safe"],
		"Gravatar identity."
	],
	[
		"http-gzip-bomb",
		["dos"],
		"Test GZIP bomb."
	],
	[
		"http-hp-ilo-info",
		["discovery", "safe"],
		"HP iLO informace."
	],
	[
		"http-iis-short-name-brute",
		["intrusive", "discovery"],
		"IIS 8.3 short names."
	],
	[
		"http-iis-webdav-vuln",
		["vuln"],
		"IIS WebDAV vulnerability."
	],
	[
		"http-internal-ip-disclosure",
		["vuln", "safe"],
		"Interní IP v přesměrování."
	],
	[
		"http-joomla-brute",
		["brute", "intrusive"],
		"Joomla brute-force."
	],
	[
		"http-jsonp-detection",
		["discovery", "safe"],
		"JSONP endpointy."
	],
	[
		"http-jstestdriver",
		["discovery", "safe"],
		"JsTestDriver detekce."
	],
	[
		"http-litespeed-sourcecode-download",
		["vuln"],
		"LiteSpeed source download."
	],
	[
		"http-ls",
		["discovery", "safe"],
		"Directory listing."
	],
	[
		"http-majordomo2-dir-traversal",
		["vuln"],
		"Majordomo2 traversal."
	],
	[
		"http-mcmp",
		["discovery", "safe"],
		"Memcached protocol over HTTP."
	],
	[
		"http-mobileversion-checker",
		["discovery", "safe"],
		"Mobilní verze webu."
	],
	[
		"http-ntlm-info",
		["discovery", "safe"],
		"NTLM over HTTP info."
	],
	[
		"http-php-version",
		["version", "safe"],
		"PHP verze z hlaviček."
	],
	[
		"http-proxy-brute",
		["brute", "intrusive"],
		"HTTP proxy autentizace."
	],
	[
		"http-put",
		["intrusive"],
		"HTTP PUT upload test."
	],
	[
		"http-qnap-nas-info",
		["discovery", "safe"],
		"QNAP NAS info."
	],
	[
		"http-referer-checker",
		["discovery", "safe"],
		"Referer handling."
	],
	[
		"http-rfi-spider",
		["vuln", "intrusive"],
		"Remote file inclusion spider."
	],
	[
		"http-robots.txt",
		["discovery", "safe"],
		"robots.txt."
	],
	[
		"http-security-headers",
		[
			"discovery",
			"safe",
			"safe"
		],
		"Security headers (HSTS, CSP…)."
	],
	[
		"http-server-header",
		["version", "safe"],
		"Server header fingerprint."
	],
	[
		"http-sitemap-generator",
		["discovery"],
		"Generátor sitemapy."
	],
	[
		"http-slowloris-check",
		["dos", "safe"],
		"Slowloris check."
	],
	[
		"http-sql-injection",
		["vuln", "intrusive"],
		"SQLi probe."
	],
	[
		"http-stored-xss",
		["vuln"],
		"Stored XSS."
	],
	[
		"http-svn-enum",
		["discovery"],
		"SVN enumerace."
	],
	[
		"http-title",
		[
			"discovery",
			"default",
			"safe"
		],
		"HTML title."
	],
	[
		"http-tplink-dir-traversal",
		["vuln"],
		"TP-Link directory traversal."
	],
	[
		"http-trace",
		["discovery", "safe"],
		"HTTP TRACE metoda."
	],
	[
		"http-traceroute",
		["discovery", "safe"],
		"HTTP traceroute (Max-Forwards)."
	],
	[
		"http-unsafe-output-escaping",
		["vuln", "safe"],
		"Unsafe output escaping."
	],
	[
		"http-useragent-tester",
		["discovery"],
		"Různé User-Agenty."
	],
	[
		"http-vhosts",
		["discovery"],
		"Virtuální hosty."
	],
	[
		"http-vlcstreamer-ls",
		["discovery"],
		"VLC streamer listing."
	],
	[
		"http-vmware-path-vuln",
		["vuln"],
		"VMware path vuln."
	],
	[
		"http-vuln-cve2009-3960",
		["vuln"],
		"Adobe XML external entity."
	],
	[
		"http-vuln-cve2010-0738",
		["vuln"],
		"JBoss JMX console."
	],
	[
		"http-vuln-cve2010-2861",
		["vuln"],
		"ColdFusion directory traversal."
	],
	[
		"http-vuln-cve2011-3368",
		["vuln"],
		"Apache reverse proxy bypass."
	],
	[
		"http-vuln-cve2013-0156",
		["vuln"],
		"Ruby on Rails YAML RCE."
	],
	[
		"http-vuln-cve2013-6786",
		["vuln"],
		"Allegro RomPager."
	],
	[
		"http-vuln-cve2014-2126",
		["vuln"],
		"Cisco ASA SSL VPN XSS."
	],
	[
		"http-vuln-cve2014-2127",
		["vuln"],
		"Cisco ASA privilege escalation."
	],
	[
		"http-vuln-cve2014-2128",
		["vuln"],
		"Cisco ASA information disclosure."
	],
	[
		"http-vuln-cve2014-2129",
		["vuln"],
		"Cisco ASA DoS."
	],
	[
		"http-vuln-cve2014-8877",
		["vuln"],
		"Joomla CMIS SQLi."
	],
	[
		"http-vuln-cve2015-1427",
		["vuln", "exploit"],
		"Elasticsearch RCE."
	],
	[
		"http-vuln-cve2015-1635",
		["vuln"],
		"MS15-034."
	],
	[
		"http-vuln-cve2017-1001000",
		["vuln"],
		"WordPress REST API."
	],
	[
		"http-vuln-wnr1000-creds",
		["vuln"],
		"Netgear WNR1000 credentials."
	],
	[
		"http-waf-detect",
		["discovery", "safe"],
		"WAF detekce."
	],
	[
		"http-waf-fingerprint",
		["discovery"],
		"WAF fingerprint."
	],
	[
		"http-wordpress-brute",
		["brute", "intrusive"],
		"WordPress brute."
	],
	[
		"http-wordpress-enum",
		["discovery"],
		"WordPress pluginy/šablony."
	],
	[
		"http-wordpress-users",
		["discovery"],
		"WordPress uživatelé."
	],
	[
		"http-xssed",
		[
			"external",
			"safe",
			"vuln"
		],
		"XSSed.com historie."
	],
	[
		"iax2-version",
		["version", "safe"],
		"IAX2 verze."
	],
	[
		"icap-info",
		["discovery", "safe"],
		"ICAP server info."
	],
	[
		"iec-identify",
		["discovery", "safe"],
		"IEC 60870-5-104 ident."
	],
	[
		"ike-version",
		[
			"version",
			"discovery",
			"safe"
		],
		"IKE verze."
	],
	[
		"imap-ntlm-info",
		["discovery", "safe"],
		"IMAP NTLM info."
	],
	[
		"ip-forwarding",
		["discovery"],
		"IP forwarding test."
	],
	[
		"ipmi-cipher-zero",
		["vuln", "auth"],
		"IPMI cipher zero auth bypass."
	],
	[
		"ipmi-version",
		[
			"version",
			"discovery",
			"safe"
		],
		"IPMI verze."
	],
	[
		"ipv6-ra-flood",
		["dos", "intrusive"],
		"IPv6 RA flood."
	],
	[
		"irc-botnet-channels",
		["discovery", "malware"],
		"IRC botnet kanály."
	],
	[
		"irc-info",
		["discovery", "safe"],
		"IRC server info."
	],
	[
		"iscsi-info",
		["discovery", "safe"],
		"iSCSI info."
	],
	[
		"jdwp-info",
		["discovery", "safe"],
		"JDWP info."
	],
	[
		"knx-gateway-info",
		["discovery", "safe"],
		"KNX gateway."
	],
	[
		"ldap-novell-getpass",
		["auth", "intrusive"],
		"Novell LDAP getpass."
	],
	[
		"ldap-search",
		["discovery"],
		"LDAP search query."
	],
	[
		"lexmark-config",
		["discovery"],
		"Lexmark tiskárna config."
	],
	[
		"memcached-info",
		["discovery", "safe"],
		"Memcached stats."
	],
	[
		"metasploit-info",
		["discovery", "safe"],
		"Metasploit RPC info."
	],
	[
		"mikrotik-routeros-version",
		["version", "safe"],
		"MikroTik RouterOS verze."
	],
	[
		"mongodb-databases",
		["discovery"],
		"MongoDB databáze."
	],
	[
		"mongodb-info",
		["discovery", "safe"],
		"MongoDB serverStatus."
	],
	[
		"mqtt-subscribe",
		["discovery"],
		"MQTT topics."
	],
	[
		"mrinfo",
		["discovery", "safe"],
		"Multicast mrinfo."
	],
	[
		"ms-sql-config",
		["discovery"],
		"MSSQL konfigurace."
	],
	[
		"ms-sql-dac",
		["discovery", "safe"],
		"MSSQL Dedicated Admin Connection."
	],
	[
		"ms-sql-dump-hashes",
		["auth", "intrusive"],
		"MSSQL hash dump."
	],
	[
		"ms-sql-empty-password",
		["auth", "intrusive"],
		"MSSQL prázdné sa heslo."
	],
	[
		"ms-sql-info",
		[
			"discovery",
			"default",
			"safe"
		],
		"MSSQL instance info."
	],
	[
		"ms-sql-ntlm-info",
		["discovery", "safe"],
		"MSSQL NTLM info."
	],
	[
		"ms-sql-query",
		["auth"],
		"MSSQL SQL query."
	],
	[
		"ms-sql-tables",
		["auth", "discovery"],
		"MSSQL tabulky."
	],
	[
		"ms-sql-xp-cmdshell",
		["auth", "intrusive"],
		"xp_cmdshell."
	],
	[
		"nat-pmp-info",
		["discovery", "safe"],
		"NAT-PMP info."
	],
	[
		"nbd-info",
		["discovery", "safe"],
		"Network Block Device."
	],
	[
		"ncp-enum-users",
		["discovery"],
		"Novell NCP uživatelé."
	],
	[
		"ndmp-fs-info",
		["discovery"],
		"NDMP filesystems."
	],
	[
		"ndmp-version",
		["version", "safe"],
		"NDMP verze."
	],
	[
		"nessus-info",
		["discovery", "safe"],
		"Nessus daemon info."
	],
	[
		"netbus-auth-bypass",
		[
			"auth",
			"vuln",
			"malware"
		],
		"NetBus auth bypass."
	],
	[
		"netbus-info",
		["malware", "discovery"],
		"NetBus info."
	],
	[
		"nexpose-info",
		["discovery", "safe"],
		"Nexpose API."
	],
	[
		"nfs-statfs",
		["discovery", "safe"],
		"NFS statfs."
	],
	[
		"nntp-ntlm-info",
		["discovery", "safe"],
		"NNTP NTLM."
	],
	[
		"nping-require",
		["discovery"],
		"Nping probe."
	],
	[
		"nrpe-enum",
		["discovery"],
		"NRPE příkazy."
	],
	[
		"ntp-info",
		["discovery", "safe"],
		"NTP info."
	],
	[
		"omp2-enum-targets",
		["discovery"],
		"OpenVAS OMP cíle."
	],
	[
		"omron-info",
		["discovery", "safe"],
		"Omron FINS PLC."
	],
	[
		"openwebnet-discovery",
		["discovery", "safe"],
		"OpenWebNet BTicino."
	],
	[
		"oracle-enum-users",
		["discovery", "auth"],
		"Oracle uživatelé."
	],
	[
		"oracle-sid-brute",
		["brute", "intrusive"],
		"Oracle SID brute."
	],
	[
		"oracle-tns-version",
		["version", "safe"],
		"Oracle TNS verze."
	],
	[
		"ovs-agent-version",
		["version", "safe"],
		"Open vSwitch agent."
	],
	[
		"p2p-conficker",
		["malware", "safe"],
		"Conficker P2P check."
	],
	[
		"path-mtu",
		["discovery", "safe"],
		"PMTU."
	],
	[
		"pcworx-info",
		["discovery", "safe"],
		"PCWORX PLC."
	],
	[
		"pgsql-brute",
		["brute", "intrusive"],
		"PostgreSQL brute."
	],
	[
		"pjl-ready-message",
		["discovery"],
		"PJL ready message tiskárny."
	],
	[
		"pop3-ntlm-info",
		["discovery", "safe"],
		"POP3 NTLM."
	],
	[
		"pptp-version",
		["version", "safe"],
		"PPTP verze."
	],
	[
		"qconn-exec",
		["exploit", "intrusive"],
		"QNX qconn exec."
	],
	[
		"rdp-enum-encryption",
		["discovery", "safe"],
		"RDP encryption."
	],
	[
		"rdp-ntlm-info",
		["discovery", "safe"],
		"RDP NTLM."
	],
	[
		"rdp-vuln-ms12-020",
		["vuln", "safe"],
		"MS12-020."
	],
	[
		"redis-info",
		["discovery", "safe"],
		"Redis INFO."
	],
	[
		"resolveall",
		["discovery", "safe"],
		"Resoluce všech A záznamů."
	],
	[
		"riak-http-info",
		["discovery", "safe"],
		"Riak HTTP."
	],
	[
		"rlogin-brute",
		["brute", "intrusive"],
		"rlogin brute."
	],
	[
		"rmi-dumpregistry",
		["discovery"],
		"Java RMI registry dump."
	],
	[
		"robots.txt",
		["discovery", "safe"],
		"Alias http-robots.txt."
	],
	[
		"rpcap-info",
		["discovery", "safe"],
		"WinPcap remote."
	],
	[
		"rsync-list-modules",
		["discovery", "safe"],
		"rsync moduly."
	],
	[
		"rtsp-methods",
		["discovery", "safe"],
		"RTSP metody."
	],
	[
		"rusers",
		["discovery"],
		"rusersd výpis."
	],
	[
		"s7-info",
		["discovery", "safe"],
		"Siemens S7 PLC."
	],
	[
		"samba-vuln-cve-2012-1182",
		["vuln"],
		"Samba CVE-2012-1182."
	],
	[
		"screenos-backdoor",
		[
			"vuln",
			"malware",
			"auth"
		],
		"Juniper ScreenOS backdoor."
	],
	[
		"sip-call-spoof",
		["intrusive"],
		"SIP call spoof."
	],
	[
		"sip-enum-users",
		["discovery"],
		"SIP uživatelé."
	],
	[
		"skypev2-version",
		["version", "safe"],
		"Skype v2."
	],
	[
		"smb-enum-groups",
		["discovery"],
		"SMB skupiny."
	],
	[
		"smb-enum-processes",
		["discovery"],
		"Procesy přes SMB."
	],
	[
		"smb-enum-services",
		["discovery"],
		"Služby přes SMB."
	],
	[
		"smb-ls",
		["discovery"],
		"Výpis SMB share."
	],
	[
		"smb-mbenum",
		["discovery", "safe"],
		"Mailslot/browser enum."
	],
	[
		"smb-print-text",
		["intrusive"],
		"Tisk přes SMB."
	],
	[
		"smb-psexec",
		["intrusive"],
		"PsExec-like přes SMB."
	],
	[
		"smb-server-stats",
		["discovery"],
		"SMB server stats."
	],
	[
		"smb-system-info",
		["discovery"],
		"WMI system info."
	],
	[
		"smb-vuln-conficker",
		[
			"vuln",
			"malware",
			"safe"
		],
		"Conficker check."
	],
	[
		"smb-vuln-cve2009-3103",
		["vuln"],
		"SMBv2 DoS."
	],
	[
		"smb-vuln-regsvc-dos",
		["vuln", "dos"],
		"Regsvc DoS."
	],
	[
		"smb-vuln-webexec",
		["vuln"],
		"WebEx service RCE."
	],
	[
		"smb2-time",
		["discovery", "safe"],
		"Čas přes SMB2."
	],
	[
		"smtp-commands",
		["discovery", "safe"],
		"SMTP EHLO příkazy."
	],
	[
		"smtp-enum-users",
		["auth", "external"],
		"SMTP users."
	],
	[
		"smtp-ntlm-info",
		["discovery", "safe"],
		"SMTP NTLM."
	],
	[
		"smtp-open-relay",
		["discovery", "intrusive"],
		"Open relay test."
	],
	[
		"smtp-strangeport",
		["malware", "safe"],
		"SMTP strange port."
	],
	[
		"smtp-vuln-cve2011-1764",
		["vuln"],
		"Exim DKIM."
	],
	[
		"sniffer-detect",
		["malware", "discovery"],
		"Promiscuous detect."
	],
	[
		"snmp-hh3c-logins",
		["discovery"],
		"H3C/Huawei loginy přes SNMP."
	],
	[
		"snmp-info",
		[
			"discovery",
			"default",
			"safe"
		],
		"SNMP info."
	],
	[
		"snmp-ios-config",
		["intrusive"],
		"Cisco IOS config přes SNMP."
	],
	[
		"snmp-netstat",
		["discovery"],
		"SNMP netstat."
	],
	[
		"snmp-win32-software",
		["discovery"],
		"Nainstalovaný SW přes SNMP."
	],
	[
		"snmp-win32-users",
		["discovery"],
		"Windows uživatelé přes SNMP."
	],
	[
		"socks-auth-info",
		[
			"auth",
			"discovery",
			"safe"
		],
		"SOCKS auth methods."
	],
	[
		"socks-open-proxy",
		["discovery"],
		"Otevřená SOCKS proxy."
	],
	[
		"ssh-hostkey",
		[
			"default",
			"safe",
			"discovery"
		],
		"SSH hostkey."
	],
	[
		"ssh-publickey-acceptance",
		["auth", "intrusive"],
		"Test přijetí veřejného klíče."
	],
	[
		"ssh-run",
		["intrusive"],
		"SSH remote command."
	],
	[
		"sshv1",
		["safe", "version"],
		"SSHv1 podpora."
	],
	[
		"ssl-enum-ciphers",
		[
			"discovery",
			"safe",
			"version"
		],
		"TLS ciphers."
	],
	[
		"ssl-heartbleed",
		["vuln", "safe"],
		"Heartbleed."
	],
	[
		"ssl-known-key",
		["vuln", "safe"],
		"Known keys."
	],
	[
		"ssl-poodle",
		["vuln", "safe"],
		"POODLE."
	],
	[
		"sstp-discover",
		["discovery", "safe"],
		"SSTP VPN."
	],
	[
		"stun-info",
		["discovery", "safe"],
		"STUN server."
	],
	[
		"stuxnet-detect",
		["malware", "safe"],
		"Stuxnet infection markers."
	],
	[
		"supermicro-ipmi-conf",
		["vuln", "safe"],
		"Supermicro IPMI."
	],
	[
		"svn-brute",
		["brute", "intrusive"],
		"SVN brute."
	],
	[
		"targets-ipv6-map4to6",
		["discovery", "safe"],
		"IPv4-mapped IPv6."
	],
	[
		"targets-ipv6-multicast-echo",
		["discovery", "broadcast"],
		"IPv6 multicast echo."
	],
	[
		"targets-ipv6-multicast-invalid-dst",
		["discovery"],
		"IPv6 invalid dst."
	],
	[
		"targets-ipv6-multicast-mld",
		["discovery", "broadcast"],
		"MLD targets."
	],
	[
		"targets-ipv6-multicast-slaac",
		["discovery"],
		"SLAAC targets."
	],
	[
		"targets-sniffer",
		["discovery"],
		"Sniffer targets."
	],
	[
		"targets-traceroute",
		["discovery", "safe"],
		"Hop cíle z traceroute."
	],
	[
		"teamspeak2-version",
		["version", "safe"],
		"TeamSpeak 2."
	],
	[
		"telnet-brute",
		["brute", "intrusive"],
		"Telnet brute."
	],
	[
		"telnet-encryption",
		["auth", "safe"],
		"Telnet encrypt."
	],
	[
		"telnet-ntlm-info",
		["discovery", "safe"],
		"Telnet NTLM."
	],
	[
		"tftp-enum",
		["discovery", "intrusive"],
		"TFTP enum."
	],
	[
		"tls-alpn",
		["discovery", "safe"],
		"TLS ALPN."
	],
	[
		"tls-nextprotoneg",
		["discovery", "safe"],
		"NPN."
	],
	[
		"tls-ticketbleed",
		["vuln", "safe"],
		"Ticketbleed."
	],
	[
		"tn3270-info",
		["discovery", "safe"],
		"TN3270 mainframe."
	],
	[
		"tor-consensus-checker",
		["discovery", "safe"],
		"Tor relay check."
	],
	[
		"traceroute-geolocation",
		[
			"discovery",
			"external",
			"safe"
		],
		"Geo traceroute."
	],
	[
		"unittest",
		["safe"],
		"NSE self-test."
	],
	[
		"unusual-port",
		["safe", "malware"],
		"Služba na nestandardním portu."
	],
	[
		"upnp-info",
		["discovery", "safe"],
		"UPnP."
	],
	[
		"url-snarf",
		["safe"],
		"URL snarf z HTTP."
	],
	[
		"ventrilo-info",
		["discovery", "safe"],
		"Ventrilo."
	],
	[
		"versant-info",
		["discovery", "safe"],
		"Versant DB."
	],
	[
		"vmauthd-info",
		["discovery", "safe"],
		"VMware auth daemon."
	],
	[
		"vmware-version",
		["version", "safe"],
		"VMware version."
	],
	[
		"vnc-brute",
		["brute", "intrusive"],
		"VNC brute."
	],
	[
		"vnc-info",
		["discovery", "safe"],
		"VNC info."
	],
	[
		"vnc-title",
		["discovery", "safe"],
		"VNC desktop title."
	],
	[
		"voldemort-info",
		["discovery", "safe"],
		"Voldemort KV."
	],
	[
		"vtenc-info",
		["discovery", "safe"],
		"VT encoder."
	],
	[
		"vuze-dht-info",
		["discovery", "safe"],
		"Vuze DHT."
	],
	[
		"wdb-version",
		["version", "vuln"],
		"VxWorks WDB agent."
	],
	[
		"weblogic-t3-info",
		["discovery", "safe"],
		"WebLogic T3."
	],
	[
		"whois-domain",
		[
			"discovery",
			"external",
			"safe"
		],
		"WHOIS domain."
	],
	[
		"whois-ip",
		[
			"discovery",
			"external",
			"safe"
		],
		"WHOIS IP."
	],
	[
		"wsdd-discover",
		["discovery", "safe"],
		"WSDD devices."
	],
	[
		"x11-access",
		["auth", "safe"],
		"X11 open access."
	],
	[
		"xdmcp-discover",
		["discovery", "safe"],
		"XDMCP."
	],
	[
		"xmlrpc-methods",
		[
			"default",
			"discovery",
			"safe"
		],
		"XML-RPC."
	],
	[
		"xmpp-info",
		["discovery", "safe"],
		"XMPP info."
	]
];
var seen = /* @__PURE__ */ new Set();
var NSE_SCRIPTS = [];
for (const [name, categories, description] of ROWS) {
	if (seen.has(name)) continue;
	seen.add(name);
	NSE_SCRIPTS.push({
		name,
		categories,
		description
	});
}
var SCRIPT_CATEGORIES = [
	{
		id: "all",
		label: "Vše"
	},
	{
		id: "default",
		label: "default"
	},
	{
		id: "safe",
		label: "safe"
	},
	{
		id: "discovery",
		label: "discovery"
	},
	{
		id: "version",
		label: "version"
	},
	{
		id: "vuln",
		label: "vuln"
	},
	{
		id: "auth",
		label: "auth"
	},
	{
		id: "brute",
		label: "brute"
	},
	{
		id: "exploit",
		label: "exploit"
	},
	{
		id: "malware",
		label: "malware"
	},
	{
		id: "broadcast",
		label: "broadcast"
	},
	{
		id: "dos",
		label: "dos"
	},
	{
		id: "intrusive",
		label: "intrusive"
	},
	{
		id: "external",
		label: "external"
	},
	{
		id: "fuzzer",
		label: "fuzzer"
	}
];
var CATEGORY_SCRIPTS = {
	all: NSE_SCRIPTS.map((s) => s.name),
	default: NSE_SCRIPTS.filter((s) => s.categories.includes("default")).map((s) => s.name),
	safe: NSE_SCRIPTS.filter((s) => s.categories.includes("safe")).map((s) => s.name),
	discovery: NSE_SCRIPTS.filter((s) => s.categories.includes("discovery")).map((s) => s.name),
	vuln: NSE_SCRIPTS.filter((s) => s.categories.includes("vuln")).map((s) => s.name)
};
function scriptsMatching(query, category) {
	const q = query.trim().toLowerCase();
	return NSE_SCRIPTS.filter((s) => {
		if (category !== "all" && !s.categories.includes(category)) return false;
		if (!q) return true;
		return s.name.includes(q) || s.description.toLowerCase().includes(q) || s.categories.some((c) => c.includes(q));
	});
}
function buildNmapCommand(input) {
	const parts = ["nmap"];
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
	const extra = (profile?.flags ?? []).filter((f) => ![
		"-sS",
		"-sV",
		"-O",
		"-A",
		"-Pn",
		"-T4",
		"-T2",
		"-T3",
		"-T5"
	].includes(f) && f !== "--script" && f !== "vuln" && f !== "all" && f !== "default");
	for (const f of extra) if (f.startsWith("-") && !parts.includes(f)) parts.push(f);
	parts.push(input.target.trim() || "10.0.0.0/8");
	return parts.join(" ");
}
function resolveScriptArg(selected) {
	if (selected.length === 0) return null;
	if (selected.includes("all") || selected.length >= NSE_SCRIPTS.length) return "all";
	const cats = [
		"default",
		"safe",
		"discovery",
		"vuln",
		"auth",
		"brute",
		"exploit",
		"malware"
	];
	const onlyCats = selected.filter((s) => cats.includes(s));
	const named = selected.filter((s) => !cats.includes(s));
	if (onlyCats.length && named.length === 0) return onlyCats.join(",");
	if (named.length <= 12) return named.join(",");
	if (onlyCats.length) return `(${onlyCats.join(" or ")})`;
	return named.slice(0, 8).join(",") + ",...";
}
function stamp() {
	const d = /* @__PURE__ */ new Date();
	const pad = (n) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())} CEST`;
}
function timingDelay(timing) {
	return [
		90,
		70,
		48,
		28,
		16,
		8
	][Math.max(0, Math.min(5, timing))] ?? 16;
}
async function* runScan(opts) {
	const { target, command, nodes, selectedScripts, signal, delay } = opts;
	const sleep = (ms) => new Promise((resolve, reject) => {
		const t = window.setTimeout(resolve, ms);
		const onAbort = () => {
			window.clearTimeout(t);
			reject(new DOMException("aborted", "AbortError"));
		};
		if (signal.aborted) {
			window.clearTimeout(t);
			reject(new DOMException("aborted", "AbortError"));
			return;
		}
		signal.addEventListener("abort", onAbort, { once: true });
	});
	const hosts = nodes.filter((n) => n.kind !== "internet");
	yield {
		type: "line",
		text: `Starting Nmap 7.95 ( https://nmap.org ) at ${stamp()}`
	};
	yield {
		type: "line",
		text: `Nmap scan initiated as: ${command}`
	};
	await sleep(delay);
	yield {
		type: "line",
		text: `Initiating Ping Scan at ${stamp().slice(11, 16)}`
	};
	yield {
		type: "line",
		text: `Scanning ${target} [${hosts.length} hosts]`
	};
	await sleep(delay);
	const wantVuln = selectedScripts.includes("vuln") || selectedScripts.includes("all") || selectedScripts.some((s) => s.startsWith("smb-vuln") || s.startsWith("http-vuln") || s === "vulners");
	for (const host of hosts) {
		if (signal.aborted) return;
		yield {
			type: "host",
			id: host.id
		};
		yield {
			type: "line",
			text: ""
		};
		yield {
			type: "line",
			text: `Nmap scan report for ${host.hostname} (${host.ip})`
		};
		yield {
			type: "line",
			text: `Host is up (${(host.latencyMs / 1e3).toFixed(4)}s latency).`
		};
		await sleep(delay);
		const closed = Math.max(0, 1e3 - host.ports.length);
		if (host.ports.length) {
			yield {
				type: "line",
				text: `Not shown: ${closed} closed tcp ports`
			};
			yield {
				type: "line",
				text: "PORT      STATE SERVICE        VERSION"
			};
			for (const p of host.ports) {
				yield {
					type: "line",
					text: `${`${p.port}/${p.proto}`.padEnd(9)} ${p.state.padEnd(5)} ${p.service.padEnd(14)} ${p.version ?? ""}`.trimEnd()
				};
				await sleep(Math.max(4, delay * .35));
			}
		} else yield {
			type: "line",
			text: "All 1000 scanned ports on this host are closed"
		};
		yield {
			type: "line",
			text: `MAC Address: ${host.mac ?? "unknown"}`
		};
		yield {
			type: "line",
			text: `OS details: ${host.os}`
		};
		const findings = findingsFor(host.id, selectedScripts, wantVuln);
		for (const f of findings) {
			await sleep(delay);
			yield {
				type: "line",
				text: `| ${f.script}:`
			};
			for (const line of f.output.split("\n")) yield {
				type: "line",
				text: `|   ${line}`
			};
			yield {
				type: "finding",
				id: host.id,
				finding: f
			};
		}
	}
	await sleep(delay);
	yield {
		type: "line",
		text: ""
	};
	yield {
		type: "line",
		text: `Nmap done: ${hosts.length} IP addresses (${hosts.length} hosts up) scanned in ${hosts.length * delay / 1e3 + .8} seconds`
	};
	yield { type: "done" };
}
function findingsFor(id, selected, wantVuln) {
	const lab = LAB_FINDINGS[id];
	if (!lab) return [];
	if (selected.includes("all") || selected.length === 0) return wantVuln ? lab : lab.filter((f) => f.severity === "info");
	return lab.filter((f) => {
		if (selected.includes(f.script)) return true;
		if (wantVuln && (f.severity === "high" || f.severity === "critical" || f.severity === "medium")) return true;
		if (selected.includes("default") && f.severity === "info") return true;
		if (selected.includes("discovery") && f.severity === "info") return true;
		return false;
	});
}
var sample = cloneSampleNetwork();
var abort = null;
var useWorkspace = create()((set, get) => ({
	target: "10.0.0.0/8",
	profileId: "intense",
	timing: 4,
	ports: "1-1024",
	selectedScripts: [...CATEGORY_SCRIPTS.default ?? []],
	syn: true,
	version: true,
	osDetect: true,
	aggressive: true,
	skipPing: false,
	nodes: sample.nodes,
	links: sample.links,
	selectedNodeId: null,
	search: "",
	frozen: false,
	simNonce: 0,
	fitNonce: 0,
	isScanning: false,
	progress: 0,
	output: [
		"# NEXUS lab — nmap 7.95",
		"# Topologie ACME.LAB je načtená. Upravte cíl a skripty, pak spusťte sken.",
		"# Simulace běží lokálně nad modelem sítě, ne proti živým hostitelům."
	],
	activeHostId: null,
	leftOpen: true,
	leftTab: "scan",
	terminalOpen: true,
	scriptQuery: "",
	scriptCategory: "all",
	setTarget: (target) => set({ target }),
	setProfile: (profileId) => {
		const p = SCAN_PROFILES.find((x) => x.id === profileId);
		if (!p) return;
		const scripts = p.defaultScripts.includes("all") ? NSE_SCRIPTS.map((s) => s.name) : p.defaultScripts.flatMap((c) => CATEGORY_SCRIPTS[c] ?? [c]);
		set({
			profileId,
			ports: p.ports || get().ports,
			selectedScripts: [...new Set(scripts)],
			aggressive: p.flags.includes("-A"),
			version: p.flags.includes("-sV") || p.flags.includes("-A"),
			osDetect: p.flags.includes("-O") || p.flags.includes("-A"),
			syn: p.flags.includes("-sS") || profileId !== "quick"
		});
	},
	setTiming: (timing) => set({ timing }),
	setPorts: (ports) => set({ ports }),
	toggleFlag: (key) => set({ [key]: !get()[key] }),
	toggleScript: (name) => {
		const cur = get().selectedScripts;
		set({ selectedScripts: cur.includes(name) ? cur.filter((s) => s !== name) : [...cur, name] });
	},
	selectCategory: (cat) => {
		set({ selectedScripts: [...CATEGORY_SCRIPTS[cat] ?? []] });
	},
	clearScripts: () => set({ selectedScripts: [] }),
	setSearch: (search) => set({ search }),
	selectNode: (selectedNodeId) => set({ selectedNodeId }),
	setFrozen: (frozen) => set({ frozen }),
	toggleFrozen: () => set({ frozen: !get().frozen }),
	restartSim: () => set({
		frozen: false,
		simNonce: get().simNonce + 1
	}),
	fitGraph: () => set({ fitNonce: get().fitNonce + 1 }),
	setLeftOpen: (leftOpen) => set({ leftOpen }),
	setLeftTab: (leftTab) => set({
		leftTab,
		leftOpen: true
	}),
	setTerminalOpen: (terminalOpen) => set({ terminalOpen }),
	setScriptQuery: (scriptQuery) => set({ scriptQuery }),
	setScriptCategory: (scriptCategory) => set({ scriptCategory }),
	command: () => {
		const s = get();
		return buildNmapCommand({
			target: s.target,
			profileId: s.profileId,
			timing: s.timing,
			ports: s.ports,
			selectedScripts: s.selectedScripts,
			syn: s.syn,
			version: s.version,
			osDetect: s.osDetect,
			aggressive: s.aggressive,
			skipPing: s.skipPing
		});
	},
	stopScan: () => {
		abort?.abort();
		abort = null;
		set({
			isScanning: false,
			activeHostId: null
		});
	},
	startScan: () => {
		abort?.abort();
		abort = new AbortController();
		const signal = abort.signal;
		const s = get();
		const command = s.command();
		const fresh = cloneSampleNetwork();
		set({
			isScanning: true,
			progress: 0,
			output: [],
			nodes: fresh.nodes,
			links: fresh.links,
			activeHostId: null,
			terminalOpen: true
		});
		const hostCount = fresh.nodes.filter((n) => n.kind !== "internet").length;
		let seen = 0;
		(async () => {
			try {
				for await (const ev of runScan({
					target: s.target,
					command,
					nodes: fresh.nodes,
					selectedScripts: s.selectedScripts,
					signal,
					delay: timingDelay(s.timing)
				})) if (ev.type === "line") set((st) => ({ output: pushLine(st.output, ev.text) }));
				else if (ev.type === "host") {
					seen += 1;
					set({
						activeHostId: ev.id,
						progress: seen / hostCount,
						selectedNodeId: ev.id
					});
				} else if (ev.type === "finding") set((st) => ({ nodes: st.nodes.map((n) => n.id === ev.id ? {
					...n,
					findings: appendFinding(n.findings, ev.finding)
				} : n) }));
				else if (ev.type === "done") set({
					isScanning: false,
					activeHostId: null,
					progress: 1
				});
			} catch (err) {
				if (err instanceof DOMException && err.name === "AbortError") {
					set((st) => ({
						isScanning: false,
						activeHostId: null,
						output: pushLine(st.output, "# sken přerušen")
					}));
					return;
				}
				set({
					isScanning: false,
					activeHostId: null
				});
			}
		})();
	}
}));
function pushLine(lines, line) {
	const next = lines.length > 800 ? lines.slice(-700) : lines.slice();
	next.push(line);
	return next;
}
function appendFinding(list, f) {
	if (list.some((x) => x.script === f.script)) return list;
	return [...list, f];
}
var engine = null;
function registerEngine(instance) {
	engine = instance;
}
function zoomGraph(factor) {
	if (!engine) return;
	engine.zoomAt(engine.width / 2, engine.height / 2, factor);
}
function NetworkCanvas() {
	const canvasRef = (0, import_react.useRef)(null);
	const engineRef = (0, import_react.useRef)(null);
	const [tip, setTip] = (0, import_react.useState)(null);
	const nodes = useWorkspace((s) => s.nodes);
	const links = useWorkspace((s) => s.links);
	const search = useWorkspace((s) => s.search);
	const frozen = useWorkspace((s) => s.frozen);
	const simNonce = useWorkspace((s) => s.simNonce);
	const fitNonce = useWorkspace((s) => s.fitNonce);
	const selectedId = useWorkspace((s) => s.selectedNodeId);
	const activeHostId = useWorkspace((s) => s.activeHostId);
	const selectNode = useWorkspace((s) => s.selectNode);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const instance = new GraphEngine(canvas, {
			onSelect: selectNode,
			onHover: (node, x, y) => {
				setTip(node ? {
					node,
					x,
					y
				} : null);
			}
		});
		engineRef.current = instance;
		registerEngine(instance);
		instance.start();
		return () => {
			registerEngine(null);
			instance.destroy();
			engineRef.current = null;
		};
	}, [selectNode]);
	(0, import_react.useEffect)(() => {
		engineRef.current?.setGraph(nodes, links);
	}, [nodes, links]);
	(0, import_react.useEffect)(() => {
		engineRef.current?.setSearch(search);
	}, [search]);
	(0, import_react.useEffect)(() => {
		engineRef.current?.setFrozen(frozen);
	}, [frozen]);
	(0, import_react.useEffect)(() => {
		engineRef.current?.setSelected(selectedId);
	}, [selectedId]);
	(0, import_react.useEffect)(() => {
		engineRef.current?.setActiveHost(activeHostId);
	}, [activeHostId]);
	(0, import_react.useEffect)(() => {
		if (simNonce > 0) engineRef.current?.restart();
	}, [simNonce]);
	(0, import_react.useEffect)(() => {
		if (fitNonce > 0) engineRef.current?.fit();
	}, [fitNonce]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "absolute inset-0 size-full touch-none",
		"aria-label": "Síťový graf"
	}), tip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed z-30 max-w-xs rounded-lg bg-card px-3 py-2 text-xs text-card-foreground shadow-[var(--shadow-border)]",
		style: {
			left: tip.x + 14,
			top: tip.y + 14
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-medium",
				children: tip.node.hostname
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-muted-foreground",
				children: tip.node.ip
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 text-muted-foreground",
				children: [
					KIND_LABEL[tip.node.kind],
					" · ",
					tip.node.os
				]
			})
		]
	}) : null] });
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-[scale,background-color,color,opacity] duration-150 ease-out active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-muted text-foreground hover:bg-muted/80",
			outline: "shadow-[var(--shadow-border)] bg-transparent hover:bg-muted",
			ghost: "hover:bg-muted text-foreground",
			destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 rounded-sm px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var LEGEND = [
	"firewall",
	"gateway",
	"switch",
	"server",
	"workstation",
	"iot",
	"cloud"
];
var KIND_CLASS = {
	internet: "bg-graph-internet",
	gateway: "bg-graph-gateway",
	firewall: "bg-graph-firewall",
	switch: "bg-graph-switch",
	server: "bg-graph-server",
	workstation: "bg-graph-workstation",
	iot: "bg-graph-iot",
	cloud: "bg-graph-cloud"
};
function GraphControls() {
	const frozen = useWorkspace((s) => s.frozen);
	const toggleFrozen = useWorkspace((s) => s.toggleFrozen);
	const restartSim = useWorkspace((s) => s.restartSim);
	const fitGraph = useWorkspace((s) => s.fitGraph);
	const leftOpen = useWorkspace((s) => s.leftOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pointer-events-none absolute bottom-16 z-10 hidden flex-col gap-1.5 text-xs text-muted-foreground md:flex", leftOpen ? "left-80 ml-3" : "left-3"),
		children: LEGEND.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2.5 rounded-sm ${KIND_CLASS[k]}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: KIND_LABEL[k] })]
		}, k))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-auto absolute right-3 bottom-16 z-10 flex flex-col gap-1 md:bottom-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				size: "icon",
				onClick: fitGraph,
				"aria-label": "Přizpůsobit pohled",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focus, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				size: "icon",
				onClick: toggleFrozen,
				"aria-label": frozen ? "Spustit simulaci" : "Zmrazit simulaci",
				children: frozen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				size: "icon",
				onClick: restartSim,
				"aria-label": "Restartovat simulaci",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				size: "icon",
				"aria-label": "Přiblížit",
				onClick: () => zoomGraph(1.15),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				size: "icon",
				"aria-label": "Oddálit",
				onClick: () => zoomGraph(.87),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
			})
		]
	})] });
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "bg-muted text-muted-foreground",
		accent: "bg-accent/20 text-accent",
		up: "bg-status-up/15 text-status-up",
		down: "bg-status-down/15 text-status-down",
		warn: "bg-status-filtered/15 text-status-filtered"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: "size-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
	]
}));
ScrollArea.displayName = Root.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none", orientation === "vertical" && "h-full w-2 border-l border-l-transparent p-px", orientation === "horizontal" && "h-2 flex-col border-t border-t-transparent p-px", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
var SEV = {
	info: "default",
	low: "accent",
	medium: "warn",
	high: "down",
	critical: "down"
};
function NodeDetails() {
	const id = useWorkspace((s) => s.selectedNodeId);
	const nodes = useWorkspace((s) => s.nodes);
	const links = useWorkspace((s) => s.links);
	const selectNode = useWorkspace((s) => s.selectNode);
	const node = nodes.find((n) => n.id === id);
	if (!node) return null;
	const edges = links.filter((l) => l.source === node.id || l.target === node.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "pointer-events-auto absolute inset-x-0 bottom-0 z-20 flex max-h-[70dvh] flex-col rounded-t-2xl border border-border bg-card/95 shadow-[var(--shadow-border)] backdrop-blur-sm md:inset-y-0 md:right-0 md:bottom-auto md:left-auto md:w-80 md:rounded-none md:border-y-0 md:border-r-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate font-medium text-foreground",
					children: node.hostname
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-xs text-muted-foreground",
					children: node.ip
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon-sm",
				onClick: () => selectNode(null),
				"aria-label": "Zavřít podrobnosti",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "min-h-0 flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 px-4 pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: KIND_LABEL[node.kind] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: node.status === "up" ? "up" : node.status === "down" ? "down" : "warn",
								children: node.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: node.zone })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "OS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: node.os }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "MAC"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-mono text-xs",
								children: node.mac ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Latence"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "font-mono tabular-nums",
								children: [node.latencyMs.toFixed(1), " ms"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: node.notes
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
						children: "Porty"
					}), node.ports.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Žádné otevřené porty."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-1 font-medium",
									children: "Port"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-1 font-medium",
									children: "Služba"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-1 font-medium",
									children: "Verze"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "font-mono",
							children: node.ports.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-1.5 tabular-nums",
										children: [
											p.port,
											"/",
											p.proto
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-1.5",
										children: p.service
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-1.5 text-muted-foreground",
										children: p.version ?? "—"
									})
								]
							}, `${p.proto}-${p.port}`))
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
						children: "NSE"
					}), node.findings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Spusťte sken pro výsledky skriptů."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: node.findings.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg bg-muted p-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs",
									children: f.script
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: SEV[f.severity] ?? "default",
									className: cn("ml-auto"),
									children: f.severity
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "font-mono text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground",
								children: f.output
							})]
						}, f.script))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground",
						children: "Hrany"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-1",
						children: edges.map((e) => {
							const otherId = e.source === node.id ? e.target : e.source;
							const other = nodes.find((n) => n.id === otherId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => selectNode(otherId),
								className: "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: other?.hostname ?? otherId
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 font-mono text-xs text-muted-foreground",
									children: e.label
								})]
							}) }, e.id);
						})
					})] })
				]
			})
		})]
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-10 w-full rounded-md bg-input px-3 py-2 text-sm text-foreground shadow-[var(--shadow-border)] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
function Separator({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "separator",
		className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
		...props
	});
}
function ScriptCatalog() {
	const query = useWorkspace((s) => s.scriptQuery);
	const setQuery = useWorkspace((s) => s.setScriptQuery);
	const category = useWorkspace((s) => s.scriptCategory);
	const setCategory = useWorkspace((s) => s.setScriptCategory);
	const selected = useWorkspace((s) => s.selectedScripts);
	const toggle = useWorkspace((s) => s.toggleScript);
	const selectCategory = useWorkspace((s) => s.selectCategory);
	const clearScripts = useWorkspace((s) => s.clearScripts);
	const list = scriptsMatching(query, category === "all" ? "all" : category);
	const selectedSet = new Set(selected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 px-3 pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Filtrovat NSE skripty…",
					className: "h-9",
					"aria-label": "Filtrovat skripty"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1",
					children: SCRIPT_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCategory(c.id),
						className: cn("h-7 rounded-full px-2.5 font-mono text-xs transition-[background-color,color] duration-150", category === c.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"),
						children: c.label
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => selectCategory(category === "all" ? "all" : category),
						children: "Vybrat sadu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: clearScripts,
						children: "Vymazat"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "min-h-0 flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-px p-2 pb-4",
				children: list.map((s) => {
					const on = selectedSet.has(s.name);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toggle(s.name),
						className: cn("flex w-full flex-col rounded-md px-2.5 py-2 text-left transition-[background-color] duration-150", on ? "bg-muted" : "hover:bg-muted/50"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("size-3.5 rounded-sm shadow-[var(--shadow-border)]", on ? "bg-primary" : "bg-transparent"),
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-foreground",
									children: s.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 pl-6 text-xs leading-snug text-muted-foreground",
								children: s.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 pl-6 font-mono text-xs text-muted-foreground/80",
								children: s.categories.join(" · ")
							})
						]
					}) }, s.name);
				})
			})
		})]
	});
}
function ScanDock() {
	const leftOpen = useWorkspace((s) => s.leftOpen);
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
	const [copied, setCopied] = (0, import_react.useState)(false);
	if (!leftOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "pointer-events-auto absolute inset-y-0 left-0 z-20 flex w-full max-w-full flex-col border-r border-border bg-card/95 shadow-[var(--shadow-border)] backdrop-blur-sm max-md:top-14 max-md:h-[min(78dvh,640px)] md:w-80",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-1 p-2 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					className: "ml-auto",
					onClick: () => setLeftOpen(false),
					children: "Zavřít"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 px-3 pt-3",
				children: [["scan", "Sken"], ["scripts", `Skripty (${selectedScripts.length})`]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setLeftTab(id),
					className: cn("h-9 flex-1 rounded-md text-sm font-medium transition-[background-color,color] duration-150", leftTab === id ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"),
					children: label
				}, id))
			}),
			leftTab === "scripts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptCatalog, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 p-3 pb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Cíl"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: target,
								onChange: (e) => setTarget(e.target.value),
								placeholder: "10.0.0.0/8, host.acme.lab",
								className: "font-mono text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1.5 text-xs font-medium text-muted-foreground",
							children: "Profil"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-1.5",
							children: SCAN_PROFILES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setProfile(p.id),
								className: cn("rounded-lg px-2.5 py-2 text-left transition-[background-color,box-shadow] duration-150", profileId === p.id ? "bg-muted shadow-[var(--shadow-border-hover)]" : "shadow-[var(--shadow-border)] hover:bg-muted/60"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 line-clamp-2 text-xs text-muted-foreground",
									children: p.blurb
								})]
							}, p.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Porty"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: ports,
								onChange: (e) => setPorts(e.target.value),
								placeholder: "1-1024, T:22,80,443",
								className: "font-mono text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex justify-between text-xs font-medium text-muted-foreground",
								children: ["Časování", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono tabular-nums text-foreground",
									children: TIMING_LABELS[timing]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 0,
								max: 5,
								step: 1,
								value: timing,
								onChange: (e) => setTiming(Number(e.target.value)),
								className: "w-full accent-accent",
								"aria-label": "Časování T0 až T5"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5",
							children: [
								[
									"syn",
									"-sS",
									syn
								],
								[
									"version",
									"-sV",
									version
								],
								[
									"osDetect",
									"-O",
									osDetect
								],
								[
									"aggressive",
									"-A",
									aggressive
								],
								[
									"skipPing",
									"-Pn",
									skipPing
								]
							].map(([key, label, on]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggleFlag(key),
								className: cn("h-8 rounded-full px-3 font-mono text-xs transition-[background-color,color] duration-150", on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"),
								children: label
							}, key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1.5 flex items-center justify-between text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Příkaz" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono tabular-nums",
									children: [
										selectedScripts.length,
										"/",
										NSE_SCRIPTS.length
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "max-h-24 overflow-auto rounded-md bg-muted p-2 font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap break-all",
								children: command
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								className: "mt-2 w-full",
								onClick: async () => {
									try {
										await navigator.clipboard.writeText(command);
										setCopied(true);
										window.setTimeout(() => setCopied(false), 1200);
									} catch {
										setCopied(false);
									}
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), copied ? "Zkopírováno" : "Kopírovat nmap příkaz"]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: "Laboratorní simulace nad modelem ACME.LAB. Příkaz lze spustit na vlastní stanici."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border p-3",
				children: isScanning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "destructive",
					className: "w-full",
					onClick: stopScan,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {}), "Zastavit sken"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					className: "w-full",
					onClick: startScan,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), "Spustit sken"]
				})
			})
		]
	});
}
function Terminal() {
	const open = useWorkspace((s) => s.terminalOpen);
	const setOpen = useWorkspace((s) => s.setTerminalOpen);
	const output = useWorkspace((s) => s.output);
	const isScanning = useWorkspace((s) => s.isScanning);
	const progress = useWorkspace((s) => s.progress);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ block: "end" });
	}, [output.length, open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-auto absolute inset-x-0 bottom-0 z-10 border-t border-border bg-background/90 backdrop-blur-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-3 py-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpen(!open),
					className: "flex min-h-10 flex-1 items-center gap-2 text-left text-xs text-muted-foreground",
					children: [
						open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: "nmap"
						}),
						isScanning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-accent",
							children: [Math.round(progress * 100), "%"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "výstup" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: () => setOpen(!open),
					children: open ? "Skrýt" : "Zobrazit"
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-40 overflow-auto px-4 pb-3 md:max-h-52",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "font-mono text-xs leading-relaxed text-foreground",
					children: output.join("\n")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })]
			}) : null,
			isScanning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-0.5 bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-accent transition-[width] duration-200 ease-out",
					style: { width: `${Math.round(progress * 100)}%` }
				})
			}) : null
		]
	});
}
function TopBar() {
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
	const matchCount = search.trim() ? nodes.filter((n) => {
		const q = search.trim().toLowerCase();
		return n.hostname.toLowerCase().includes(q) || n.ip.includes(q) || n.os.toLowerCase().includes(q) || n.ports.some((p) => p.service.includes(q) || String(p.port).includes(q));
	}).length : nodes.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "pointer-events-auto flex items-center gap-2 border-b border-border bg-background/85 px-3 py-2 backdrop-blur-sm md:gap-3 md:px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setLeftOpen(!leftOpen),
				className: "flex items-center gap-2 rounded-md px-1 py-1 text-left transition-[background-color,opacity] duration-150 hover:bg-muted",
				"aria-label": "Přepnout panel skenu",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-sm font-semibold tracking-tight text-foreground",
					children: "NEXUS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden text-xs text-muted-foreground sm:inline",
					children: "nmap lab"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Hledat uzly, IP, služby…",
						className: "h-10 pl-9 pr-16",
						"aria-label": "Hledat uzly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs tabular-nums text-muted-foreground",
						children: [
							matchCount,
							"/",
							nodes.length
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden items-center gap-1 md:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: frozen ? "secondary" : "outline",
					size: "sm",
					onClick: toggleFrozen,
					"aria-pressed": frozen,
					children: [frozen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}), frozen ? "Spustit" : "Zmrazit"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: restartSim,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Restart"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon",
				className: "md:hidden",
				onClick: toggleFrozen,
				"aria-label": frozen ? "Spustit simulaci" : "Zmrazit simulaci",
				children: frozen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon",
				className: "md:hidden",
				onClick: restartSim,
				"aria-label": "Restartovat simulaci",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon",
				onClick: () => setTerminalOpen(!terminalOpen),
				"aria-label": "Terminál",
				"aria-pressed": terminalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareTerminal, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon",
				className: "md:hidden",
				onClick: () => setLeftOpen(!leftOpen),
				"aria-label": "Sken",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanSearch, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden items-center gap-2 font-mono text-xs tabular-nums text-muted-foreground lg:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					selectedScripts.length,
					"/",
					NSE_SCRIPTS.length,
					" NSE"
				] }), isScanning ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("text-accent"),
					children: [Math.round(progress * 100), "%"]
				}) : null]
			})
		]
	});
}
function Workspace() {
	const toggleFrozen = useWorkspace((s) => s.toggleFrozen);
	const restartSim = useWorkspace((s) => s.restartSim);
	const selectNode = useWorkspace((s) => s.selectNode);
	const setLeftOpen = useWorkspace((s) => s.setLeftOpen);
	const startScan = useWorkspace((s) => s.startScan);
	const stopScan = useWorkspace((s) => s.stopScan);
	const isScanning = useWorkspace((s) => s.isScanning);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(max-width: 767px)").matches) {
			const s = useWorkspace.getState();
			s.setLeftOpen(false);
			s.setTerminalOpen(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const t = e.target;
			const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
			if (e.key === "Escape") {
				selectNode(null);
				if (window.matchMedia("(max-width: 767px)").matches) setLeftOpen(false);
				return;
			}
			if (typing) return;
			if (e.key === " " || e.code === "Space") {
				e.preventDefault();
				toggleFrozen();
			} else if (e.key === "r" || e.key === "R") restartSim();
			else if (e.key === "/") {
				e.preventDefault();
				document.querySelector("input[aria-label=\"Hledat uzly\"]")?.focus();
			} else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				if (isScanning) stopScan();
				else startScan();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		toggleFrozen,
		restartSim,
		selectNode,
		setLeftOpen,
		startScan,
		stopScan,
		isScanning
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-dvh w-full overflow-hidden bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetworkCanvas, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0 flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-h-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanDock, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeDetails, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraphControls, {})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, {})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workspace, {});
}
//#endregion
export { Home as component };

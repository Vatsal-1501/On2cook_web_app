import { Link, useRouterState } from "@tanstack/react-router";
import { Bluetooth } from "lucide-react";
import { useEffect, useState } from "react";
import { ble } from "@/lib/ble";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/devices", label: "Devices" },
  { to: "/control", label: "Control" },
  { to: "/custom", label: "Custom" },
  { to: "/account", label: "Account" },
];

export function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState<string | undefined>();
  useEffect(() => {
    const unsub = ble.onState((c, n) => { setConnected(c); setName(n); });
    return () => { unsub(); };
  }, []);
  return (
    <header className="hidden md:block sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display tracking-widest text-primary">UNIBOX</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Kitchen OS</span>
        </Link>
        <nav>
          <ul className="flex items-center gap-1">
            {navItems.map((i) => {
              const active = pathname === i.to;
              return (
                <li key={i.to}>
                  <Link
                    to={i.to}
                    className={`px-4 py-2 rounded-md text-sm uppercase tracking-wider transition-colors ${
                      active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {i.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2 text-xs">
          <Bluetooth className={`w-4 h-4 ${connected ? "text-success" : "text-muted-foreground"}`} />
          <span className="text-muted-foreground">{connected ? name ?? "Connected" : "Disconnected"}</span>
        </div>
      </div>
    </header>
  );
}

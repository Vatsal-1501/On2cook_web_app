import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, Power, Sliders, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/devices", label: "Devices", icon: LayoutGrid },
  { to: "/control", label: "Start", icon: Power, center: true },
  { to: "/custom", label: "Custom", icon: Sliders },
  { to: "/account", label: "Account", icon: User },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-surface/98 backdrop-blur border-t border-border pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5 items-center h-[76px] px-1">
        {items.map(({ to, label, icon: Icon, center }) => {
          const active = pathname === to;
          return (
            <li key={to} className="h-full flex items-center justify-center">
              <Link
                to={to}
                aria-label={label}
                className={`relative h-full w-full flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-wider transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {center ? (
                  <span className="-mt-4 mb-0.5 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/35 ring-4 ring-background">
                    <Icon className="w-6 h-6" />
                  </span>
                ) : (
                  <Icon className="w-5 h-5 shrink-0" />
                )}
                <span className="leading-none whitespace-nowrap">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

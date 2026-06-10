import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutGrid, Home, Power, Sliders, User } from "lucide-react";

const items = [
  { to: "/devices", label: "Devices", icon: LayoutGrid },
  { to: "/", label: "Home", icon: Home },
  { to: "/control", label: "Start", icon: Power, center: true },
  { to: "/custom", label: "Custom", icon: Sliders },
  { to: "/account", label: "Account", icon: User },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-surface border-t border-border pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5 items-end h-20">
        {items.map(({ to, label, icon: Icon, center }) => {
          const active = pathname === to;
          if (center) {
            return (
              <li key={to} className="flex justify-center">
                <Link
                  to={to}
                  className="-mt-6 flex flex-col items-center gap-1"
                  aria-label={label}
                >
                  <span className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/40 ring-4 ring-background">
                    <Icon className="w-6 h-6" />
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-foreground">{label}</span>
                </Link>
              </li>
            );
          }
          return (
            <li key={to}>
              <Link
                to={to}
                className={`h-full flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-wider ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

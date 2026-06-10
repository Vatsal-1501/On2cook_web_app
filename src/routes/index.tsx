import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Cpu, Flame, Activity } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UNIBOX — Connected Kitchen OS" },
      { name: "description", content: "Control your professional cooking device over Bluetooth from the browser." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.62_0.22_27/0.35),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-32">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Kitchen OS · v1.0</p>
          <h1 className="text-5xl md:text-7xl font-display leading-[0.95] max-w-3xl">
            The cooking <span className="text-primary">interface</span><br/>built for professionals.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground text-lg">
            Pair, monitor and command your UniBox induction & microwave system right from the browser — no app install required.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/devices" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-wider text-sm">
              Connect a device <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/control" className="inline-flex items-center gap-2 border border-border px-6 py-3 uppercase tracking-wider text-sm hover:border-primary">
              Open Control
            </Link>
          </div>
        </div>
      </section>

      {/* Feature triptych */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid md:grid-cols-3 gap-px bg-border">
        {[
          { icon: Cpu, t: "Native Web Bluetooth", d: "Direct BLE GATT connection from Chrome & Edge to your device." },
          { icon: Flame, t: "Full Power Control", d: "Induction, microwave magnetron, stirrer and dosing pump." },
          { icon: Activity, t: "Live Telemetry", d: "Real-time notifications stream back to your dashboard." },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="bg-background p-8">
            <Icon className="w-8 h-8 text-primary mb-6" />
            <h3 className="text-lg mb-2">{t}</h3>
            <p className="text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      {/* Featured product */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-16">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">Featured device</p>
        <div className="grid md:grid-cols-2 gap-8 items-center bg-surface border border-border">
          <div className="aspect-[4/3] bg-[radial-gradient(circle_at_30%_30%,oklch(0.62_0.22_27/0.5),transparent_60%),linear-gradient(135deg,oklch(0.26_0.014_250),oklch(0.16_0.01_250))] flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-[10px] border-foreground/80 relative">
              <div className="absolute inset-4 rounded-full border-2 border-primary/70" />
              <div className="absolute inset-12 rounded-full bg-primary/20" />
            </div>
          </div>
          <div className="p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-display">UniBox Pro 3000</h2>
            <p className="mt-2 text-primary uppercase tracking-widest text-xs">Induction · Microwave · Stirrer · Pump</p>
            <p className="mt-6 text-muted-foreground">
              All-in-one professional cooking module with 3.5kW induction, 1kW microwave magnetron, programmable stirrer and precision dosing pump.
            </p>
            <Link to="/control" className="inline-flex mt-8 items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-wider text-sm">
              Control now <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

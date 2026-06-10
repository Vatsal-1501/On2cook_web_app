import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Cpu, Flame, Activity, Gauge, Leaf, Utensils, Droplets, RotateCw, Timer } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "On2Cook — Connected Cooking Control" },
      { name: "description", content: "Control On2Cook's patented microwave and induction combination cooking device over Bluetooth from the browser." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.62_0.22_27/0.35),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-14 md:py-24 grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">On2Cook Control OS</p>
            <h1 className="text-5xl md:text-7xl font-display leading-[0.95] max-w-3xl">
              World’s fastest <span className="text-primary">connected</span><br/>cooking device.
            </h1>
            <p className="mt-6 max-w-xl text-muted-foreground text-lg">
              Pair, monitor and command the patented Microwave + Induction cooking system directly from the browser — built for commercial kitchens, recipe consistency and fast service.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-2 max-w-xl">
              <Metric value="70%" label="faster cooking" />
              <Metric value="40%" label="energy saving" />
              <Metric value="6 in 1" label="cooking methods" />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/devices" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-wider text-sm">
                Connect device <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/control" className="inline-flex items-center gap-2 border border-border px-6 py-3 uppercase tracking-wider text-sm hover:border-primary">
                Open Start
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-10 bg-primary/20 blur-3xl rounded-full" />
            <img src="/on2cook-device.png" alt="On2Cook device" className="relative w-full object-contain drop-shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 py-14 grid md:grid-cols-3 gap-px bg-border">
        {[
          { icon: Cpu, t: "Combinational cooking", d: "Microwave energy cooks from inside while induction provides direct pan heat from below." },
          { icon: Flame, t: "Commercial power control", d: "Start, stop and tune induction, microwave, stirrer and water dosing pump from one interface." },
          { icon: Activity, t: "Live BLE telemetry", d: "Receive device status and command acknowledgements in real time through Web Bluetooth." },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="bg-background p-8">
            <Icon className="w-8 h-8 text-primary mb-6" />
            <h3 className="text-lg mb-2">{t}</h3>
            <p className="text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10 pb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">Device features</p>
        <div className="grid md:grid-cols-2 gap-4">
          <Feature icon={Timer} title="Faster recipe execution" text="Designed for high-throughput kitchens where repeatable recipes and reduced service time matter." />
          <Feature icon={Gauge} title="ROI focused operation" text="Lower cooking cost, labor dependency, oil and food wastage while keeping output consistent." />
          <Feature icon={RotateCw} title="Automatic stirrer" text="Food-grade stirring control for repeatable mixing, sautéing and frying steps." />
          <Feature icon={Droplets} title="Sprayer pump" text="Water dosing support for recipes that need controlled moisture addition." />
          <Feature icon={Leaf} title="Nutrition rich food" text="Fast cooking with controlled energy delivery helps preserve taste, texture and nutrition." />
          <Feature icon={Utensils} title="Menu expansion" text="Supports restaurants, QSRs, cloud kitchens, cafeterias, hotels and live counters." />
        </div>
      </section>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-surface border border-border p-4">
      <div className="text-2xl md:text-3xl font-display text-primary">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
    </div>
  );
}

function Feature({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="bg-surface border border-border p-6 flex gap-4">
      <span className="w-10 h-10 bg-surface-2 flex items-center justify-center text-primary shrink-0"><Icon className="w-5 h-5" /></span>
      <div>
        <h3 className="text-lg leading-none mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

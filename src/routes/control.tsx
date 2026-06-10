import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Power, Minus, Plus, Bluetooth, Zap, Waves, Beaker, RotateCw } from "lucide-react";
import { ble } from "@/lib/ble";

export const Route = createFileRoute("/control")({
  head: () => ({ meta: [{ title: "Control — UNIBOX" }] }),
  component: Control,
});

function Control() {
  const [connected, setConnected] = useState(false);
  const [indOn, setIndOn] = useState(false);
  const [magOn, setMagOn] = useState(false);
  const [stirOn, setStirOn] = useState(false);
  const [stirSpeed, setStirSpeed] = useState<"LOW"|"MED"|"HIGH"|"VERY_HIGH">("MED");
  const [indPower, setIndPower] = useState(0);
  const [magPower, setMagPower] = useState(0);
  const [pumpTicks, setPumpTicks] = useState(1);
  const [log, setLog] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u1 = ble.onState((c) => setConnected(c));
    const u2 = ble.onMessage((msg) => {
      setLog((l) => [...l.slice(-100), `← ${msg}`]);
      const m = msg.match(/INDPOWER=(-?\d+)/); if (m) setIndPower(Number(m[1]));
      const m2 = msg.match(/MAGPOWER=(-?\d+)/); if (m2) setMagPower(Number(m2[1]));
      if (/STIRRER=ON/.test(msg)) setStirOn(true);
      if (/STIRRER=OFF/.test(msg)) setStirOn(false);
    });
    return () => { u1(); u2(); };
  }, []);

  useEffect(() => { logRef.current?.scrollTo({ top: 9e9 }); }, [log]);

  async function safe(fn: () => Promise<void>, label: string) {
    try {
      setLog((l) => [...l.slice(-100), `→ ${label}`]);
      await fn();
    } catch (e: any) {
      setLog((l) => [...l.slice(-100), `⚠ ${e?.message ?? e}`]);
    }
  }

  async function toggleInd() {
    if (!indOn) { await safe(() => ble.indQuickStart(), "INDQUICKSTART=START"); setIndOn(true); }
    else { await safe(() => ble.indQuickStop(), "INDQUICKSTART=STOP"); setIndOn(false); }
  }
  async function toggleMag() {
    if (!magOn) { await safe(() => ble.magQuickStart(), "MAGQUICKSTART=START"); setMagOn(true); }
    else { await safe(() => ble.magQuickStop(), "MAGQUICKSTART=STOP"); setMagOn(false); }
  }
  async function toggleStir() {
    const next = !stirOn;
    await safe(() => ble.stirrer(next, stirSpeed), `STIRRER=${next ? "ON,"+stirSpeed : "OFF"}`);
    setStirOn(next);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-1">Live control</p>
          <h1 className="text-3xl md:text-5xl font-display">UniBox Pro 3000</h1>
        </div>
        <span className={`flex items-center gap-2 text-xs uppercase tracking-wider px-3 py-2 border ${connected ? "border-success text-success" : "border-border text-muted-foreground"}`}>
          <Bluetooth className="w-4 h-4" /> {connected ? "Connected" : "Offline"}
        </span>
      </div>

      {!connected && (
        <div className="bg-surface border border-border p-4 mb-6 text-sm flex items-center justify-between">
          <span className="text-muted-foreground">Pair a device to start sending commands.</span>
          <button onClick={() => ble.connect().catch(()=>{})}
            className="bg-primary text-primary-foreground px-4 py-2 uppercase tracking-wider text-xs">Connect</button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {/* Induction */}
        <Panel icon={<Zap className="w-5 h-5" />} title="Induction" subtitle="3.5 kW Cooktop">
          <BigToggle label={indOn ? "ON" : "OFF"} on={indOn} onClick={toggleInd} />
          <Stepper
            label="Power"
            value={indPower}
            unit="%"
            onMinus={() => safe(() => ble.indPowerDelta(-10), "INDPOWER=-10")}
            onPlus={() => safe(() => ble.indPowerDelta(10), "INDPOWER=10")}
          />
        </Panel>

        {/* Microwave */}
        <Panel icon={<Waves className="w-5 h-5" />} title="Microwave" subtitle="1 kW Magnetron">
          <BigToggle label={magOn ? "ON" : "OFF"} on={magOn} onClick={toggleMag} />
          <Stepper
            label="Power"
            value={magPower}
            unit="%"
            onMinus={() => safe(() => ble.magPowerDelta(-10), "MAGPOWER=-10")}
            onPlus={() => safe(() => ble.magPowerDelta(10), "MAGPOWER=10")}
          />
        </Panel>

        {/* Stirrer */}
        <Panel icon={<RotateCw className="w-5 h-5" />} title="Stirrer" subtitle="Speed control">
          <BigToggle label={stirOn ? "ON" : "OFF"} on={stirOn} onClick={toggleStir} />
          <div className="grid grid-cols-4 gap-1 mt-4">
            {(["LOW","MED","HIGH","VERY_HIGH"] as const).map(s => (
              <button key={s} onClick={async () => { setStirSpeed(s); if (stirOn) await safe(() => ble.stirrer(true, s), `STIRRER=ON,${s}`); }}
                className={`py-2 text-[10px] uppercase tracking-wider border ${stirSpeed===s ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
                {s.replace("_"," ")}
              </button>
            ))}
          </div>
        </Panel>

        {/* Pump */}
        <Panel icon={<Beaker className="w-5 h-5" />} title="Dosing Pump" subtitle="Ticks (×10 ml)">
          <div className="flex items-center justify-center gap-4 py-4">
            <button onClick={() => setPumpTicks(t => Math.max(1, t-1))} className="w-12 h-12 border border-border flex items-center justify-center"><Minus className="w-5 h-5" /></button>
            <div className="text-5xl font-display tabular-nums w-24 text-center">{pumpTicks}</div>
            <button onClick={() => setPumpTicks(t => t+1)} className="w-12 h-12 border border-border flex items-center justify-center"><Plus className="w-5 h-5" /></button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => safe(() => ble.pump(true, pumpTicks), `PUMP=ON,${pumpTicks}`)}
              className="bg-primary text-primary-foreground py-3 uppercase tracking-wider text-sm">Dispense</button>
            <button onClick={() => safe(() => ble.pump(false), "PUMP=OFF")}
              className="border border-border py-3 uppercase tracking-wider text-sm">Stop</button>
          </div>
        </Panel>
      </div>

      {/* Log */}
      <div className="mt-6 bg-surface border border-border">
        <div className="px-4 py-2 border-b border-border flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Command log</span>
          <button onClick={() => setLog([])} className="text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground">Clear</button>
        </div>
        <div ref={logRef} className="font-mono text-xs p-4 h-44 overflow-auto space-y-1">
          {log.length === 0 && <p className="text-muted-foreground">No traffic yet.</p>}
          {log.map((l, i) => <div key={i} className={l.startsWith("←") ? "text-success" : l.startsWith("⚠") ? "text-destructive" : "text-foreground"}>{l}</div>)}
        </div>
      </div>
    </div>
  );
}

function Panel({ icon, title, subtitle, children }: { icon: React.ReactNode; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="bg-surface border border-border p-6">
      <header className="flex items-center gap-3 mb-4">
        <span className="w-9 h-9 bg-surface-2 flex items-center justify-center text-primary">{icon}</span>
        <div>
          <h2 className="text-lg leading-none">{title}</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">{subtitle}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

function BigToggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 py-5 uppercase tracking-[0.3em] text-sm font-display transition-colors ${
        on ? "bg-primary text-primary-foreground" : "bg-surface-2 text-foreground hover:bg-surface-2/70"
      }`}>
      <Power className="w-5 h-5" /> {label}
    </button>
  );
}

function Stepper({ label, value, unit, onMinus, onPlus }: { label: string; value: number; unit: string; onMinus: () => void; onPlus: () => void }) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <button onClick={onMinus} className="w-10 h-10 border border-border flex items-center justify-center"><Minus className="w-4 h-4" /></button>
        <div className="text-2xl font-display tabular-nums w-20 text-center">{value}{unit}</div>
        <button onClick={onPlus} className="w-10 h-10 border border-border flex items-center justify-center"><Plus className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ble } from "@/lib/ble";

export const Route = createFileRoute("/custom")({
  head: () => ({ meta: [{ title: "Custom — On2Cook" }] }),
  component: Custom,
});

function Custom() {
  const [cmd, setCmd] = useState("STATUS=?");
  const [out, setOut] = useState("");
  async function run() {
    try { await ble.send(cmd); setOut("sent: " + cmd); } catch (e: any) { setOut(e?.message ?? String(e)); }
  }
  return (
    <div className="mx-auto max-w-3xl px-6 md:px-10 py-12">
      <p className="text-xs uppercase tracking-[0.4em] text-primary mb-2">Advanced</p>
      <h1 className="text-4xl font-display mb-8">Custom command</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Send any raw BLE protocol string, or use these common recipe setup shortcuts. Examples: <code className="text-primary">INDQUICKSTART=START</code>, <code className="text-primary">MAGPOWER=10</code>, <code className="text-primary">PUMP=ON,5</code>.
      </p>
      <div className="flex gap-2">
        <input value={cmd} onChange={(e) => setCmd(e.target.value)}
          className="flex-1 bg-surface border border-border px-4 py-3 font-mono text-sm" />
        <button onClick={run} className="bg-primary text-primary-foreground px-6 py-3 uppercase tracking-wider text-sm">Send</button>
      </div>
      {out && <div className="mt-4 text-sm font-mono text-muted-foreground">{out}</div>}

      <div className="mt-10 grid md:grid-cols-2 gap-4">
        {[
          { t: "Induction recipe step", d: "Tune base heat for searing, frying and pan-contact cooking." },
          { t: "Microwave recipe step", d: "Add top energy for fast internal heating and moisture-controlled cooking." },
          { t: "Stirrer profile", d: "Select LOW, MED, HIGH or VERY HIGH based on recipe viscosity." },
          { t: "Pump dosing", d: "Trigger water addition by ticks for recipes needing controlled moisture." },
        ].map((item) => (
          <div key={item.t} className="bg-surface border border-border p-5">
            <h3 className="text-lg">{item.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

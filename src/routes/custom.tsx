import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ble } from "@/lib/ble";

export const Route = createFileRoute("/custom")({
  head: () => ({ meta: [{ title: "Custom — On2cook" }] }),
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
        Send any raw BLE protocol string. Examples: <code className="text-primary">INDQUICKSTART=START</code>, <code className="text-primary">MAGPOWER=10</code>, <code className="text-primary">PUMP=ON,5</code>.
      </p>
      <div className="flex gap-2">
        <input value={cmd} onChange={(e) => setCmd(e.target.value)}
          className="flex-1 bg-surface border border-border px-4 py-3 font-mono text-sm" />
        <button onClick={run} className="bg-primary text-primary-foreground px-6 py-3 uppercase tracking-wider text-sm">Send</button>
      </div>
      {out && <div className="mt-4 text-sm font-mono text-muted-foreground">{out}</div>}
    </div>
  );
}

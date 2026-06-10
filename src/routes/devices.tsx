import { createFileRoute, Link } from "@tanstack/react-router";
import { Bluetooth, Plus, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { ble } from "@/lib/ble";

export const Route = createFileRoute("/devices")({
  head: () => ({ meta: [{ title: "Devices — UNIBOX" }] }),
  component: Devices,
});

function Devices() {
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const unsub = ble.onState((c, n) => { setConnected(c); setName(n); });
    return () => { unsub(); };
  }, []);

  async function pair() {
    setError(null); setBusy(true);
    try { await ble.connect(); } catch (e: any) { setError(e?.message ?? String(e)); }
    finally { setBusy(false); }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-10 py-10 md:py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-2">Manage</p>
          <h1 className="text-4xl md:text-5xl font-display">Your devices</h1>
        </div>
        <button onClick={pair} disabled={busy}
          className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 uppercase tracking-wider text-sm disabled:opacity-50">
          <Plus className="w-4 h-4" /> Pair new
        </button>
      </div>

      {!ble.isSupported() && (
        <div className="border border-destructive/50 bg-destructive/10 text-destructive p-4 mb-6 text-sm">
          Web Bluetooth is not supported in this browser. Open this page in Chrome or Edge on desktop/Android.
        </div>
      )}
      {error && (
        <div className="border border-destructive/50 bg-destructive/10 text-destructive p-4 mb-6 text-sm">{error}</div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${connected ? "bg-success" : "bg-muted-foreground"}`} />
              <h3 className="text-lg">{connected ? (name ?? "UniBox Device") : "UniBox Pro 3000"}</h3>
            </div>
            <Bluetooth className={`w-5 h-5 ${connected ? "text-success" : "text-muted-foreground"}`} />
          </div>
          <p className="text-sm text-muted-foreground">
            {connected ? "Connected over Bluetooth LE." : "Not connected. Tap pair to scan nearby devices."}
          </p>
          <div className="mt-6 flex gap-2">
            {!connected ? (
              <button onClick={pair} disabled={busy}
                className="flex-1 bg-primary text-primary-foreground py-3 uppercase tracking-wider text-sm disabled:opacity-50">
                {busy ? "Pairing…" : "Pair device"}
              </button>
            ) : (
              <>
                <Link to="/control" className="flex-1 text-center bg-primary text-primary-foreground py-3 uppercase tracking-wider text-sm">
                  Open control
                </Link>
                <button onClick={() => ble.disconnect()} className="px-4 border border-border uppercase tracking-wider text-sm">
                  Disconnect
                </button>
              </>
            )}
          </div>
        </div>

        <div className="bg-surface border border-border border-dashed p-6 flex flex-col items-center justify-center text-center gap-3">
          <Wifi className="w-8 h-8 text-muted-foreground" />
          <h3 className="text-lg">Add another device</h3>
          <p className="text-sm text-muted-foreground">Scan for nearby UniBox units broadcasting over BLE.</p>
          <button onClick={pair} disabled={busy}
            className="mt-2 border border-border px-5 py-2 uppercase tracking-wider text-xs hover:border-primary">
            Scan
          </button>
        </div>
      </div>
    </div>
  );
}

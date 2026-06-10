import { createFileRoute, Link } from "@tanstack/react-router";
import { Bluetooth, Plus, Wifi, Trash2, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { ble, type KnownBleDevice } from "@/lib/ble";

export const Route = createFileRoute("/devices")({
  head: () => ({ meta: [{ title: "Devices — On2Cook" }] }),
  component: Devices,
});

function Devices() {
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState<string | undefined>();
  const [deviceId, setDeviceId] = useState<string | undefined>();
  const [known, setKnown] = useState<KnownBleDevice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refreshKnown = () => setKnown(ble.getKnownDevices());

  useEffect(() => {
    refreshKnown();
    ble.getRememberedBrowserDevices().then(refreshKnown).catch(() => {});
    const unsub = ble.onState((c, n, id) => { setConnected(c); setName(n); setDeviceId(id); refreshKnown(); });
    return () => { unsub(); };
  }, []);

  async function pair() {
    setError(null); setBusy(true);
    try { await ble.connect(); refreshKnown(); } catch (e: any) { setError(e?.message ?? String(e)); }
    finally { setBusy(false); }
  }

  async function reconnect(id?: string) {
    setError(null); setBusy(true);
    try { await ble.reconnectKnown(id); refreshKnown(); } catch (e: any) { setError(e?.message ?? String(e)); }
    finally { setBusy(false); }
  }

  function forget(id: string) {
    ble.forgetKnownDevice(id);
    refreshKnown();
  }

  const hasCards = connected || known.length > 0;

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-10 py-10 md:py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-2">Manage</p>
          <h1 className="text-4xl md:text-5xl font-display">Connected devices</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Devices paired in this browser are saved here. BLE connections cannot survive page refresh or device sleep, so an offline saved device may need reconnecting.
          </p>
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
        {!hasCards && (
          <div className="bg-surface border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground" />
                <h3 className="text-lg">No saved On2Cook device</h3>
              </div>
              <Bluetooth className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Tap pair to scan nearby devices broadcasting the On2Cook BLE service.</p>
            <button onClick={pair} disabled={busy}
              className="mt-6 w-full bg-primary text-primary-foreground py-3 uppercase tracking-wider text-sm disabled:opacity-50">
              {busy ? "Pairing…" : "Pair device"}
            </button>
          </div>
        )}

        {connected && (
          <DeviceCard
            name={name ?? "On2Cook Device"}
            status="Connected over Bluetooth LE"
            connected
            busy={busy}
            onReconnect={() => reconnect(deviceId)}
            onForget={deviceId ? () => forget(deviceId) : undefined}
          />
        )}

        {known.filter(d => !connected || d.id !== deviceId).map((d) => (
          <DeviceCard
            key={d.id}
            name={d.name || "On2Cook Device"}
            status={`Offline · Last connected ${new Date(d.lastSeen).toLocaleString()}`}
            connected={false}
            busy={busy}
            onReconnect={() => reconnect(d.id)}
            onForget={() => forget(d.id)}
          />
        ))}

        <div className="bg-surface border border-border border-dashed p-6 flex flex-col items-center justify-center text-center gap-3 min-h-56">
          <Wifi className="w-8 h-8 text-muted-foreground" />
          <h3 className="text-lg">Add another device</h3>
          <p className="text-sm text-muted-foreground">Scan for nearby On2Cook units broadcasting over BLE.</p>
          <button onClick={pair} disabled={busy}
            className="mt-2 border border-border px-5 py-2 uppercase tracking-wider text-xs hover:border-primary disabled:opacity-50">
            {busy ? "Scanning…" : "Scan"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeviceCard({ name, status, connected, busy, onReconnect, onForget }: { name: string; status: string; connected: boolean; busy: boolean; onReconnect: () => void; onForget?: () => void }) {
  return (
    <div className="bg-surface border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${connected ? "bg-success" : "bg-muted-foreground"}`} />
          <h3 className="text-lg truncate">{name}</h3>
        </div>
        <Bluetooth className={`w-5 h-5 shrink-0 ${connected ? "text-success" : "text-muted-foreground"}`} />
      </div>
      <p className="text-sm text-muted-foreground">{status}</p>
      <div className="mt-6 flex gap-2">
        {connected ? (
          <>
            <Link to="/control" className="flex-1 text-center bg-primary text-primary-foreground py-3 uppercase tracking-wider text-sm">
              Open Start
            </Link>
            <button onClick={() => ble.disconnect()} className="px-4 border border-border uppercase tracking-wider text-sm">
              Disconnect
            </button>
          </>
        ) : (
          <button onClick={onReconnect} disabled={busy}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 uppercase tracking-wider text-sm disabled:opacity-50">
            <RotateCw className="w-4 h-4" /> Reconnect
          </button>
        )}
        {onForget && (
          <button onClick={onForget} className="px-4 border border-border text-muted-foreground hover:text-foreground" aria-label="Forget device">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

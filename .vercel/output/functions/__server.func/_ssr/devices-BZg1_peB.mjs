import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as ble } from "./router-CekslVi-.mjs";
import { a as Plus, B as Bluetooth, W as Wifi, R as RotateCw, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function Devices() {
  const [connected, setConnected] = reactExports.useState(false);
  const [name, setName] = reactExports.useState();
  const [deviceId, setDeviceId] = reactExports.useState();
  const [known, setKnown] = reactExports.useState([]);
  const [error, setError] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const refreshKnown = () => setKnown(ble.getKnownDevices());
  reactExports.useEffect(() => {
    refreshKnown();
    ble.getRememberedBrowserDevices().then(refreshKnown).catch(() => {
    });
    const unsub = ble.onState((c, n, id) => {
      setConnected(c);
      setName(n);
      setDeviceId(id);
      refreshKnown();
    });
    return () => {
      unsub();
    };
  }, []);
  async function pair() {
    setError(null);
    setBusy(true);
    try {
      await ble.connect();
      refreshKnown();
    } catch (e) {
      setError(e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  }
  async function reconnect(id) {
    setError(null);
    setBusy(true);
    try {
      await ble.reconnectKnown(id);
      refreshKnown();
    } catch (e) {
      setError(e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  }
  function forget(id) {
    ble.forgetKnownDevice(id);
    refreshKnown();
  }
  const hasCards = connected || known.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-6 md:px-10 py-10 md:py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-primary mb-2", children: "Manage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-display", children: "Connected devices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground max-w-xl", children: "Devices paired in this browser are saved here. BLE connections cannot survive page refresh or device sleep, so an offline saved device may need reconnecting." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: pair, disabled: busy, className: "hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 uppercase tracking-wider text-sm disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " Pair new"
      ] })
    ] }),
    !ble.isSupported() && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-destructive/50 bg-destructive/10 text-destructive p-4 mb-6 text-sm", children: "Web Bluetooth is not supported in this browser. Open this page in Chrome or Edge on desktop/Android." }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-destructive/50 bg-destructive/10 text-destructive p-4 mb-6 text-sm", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      !hasCards && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface border border-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg", children: "No saved On2Cook device" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bluetooth, { className: "w-5 h-5 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tap pair to scan nearby devices broadcasting the On2Cook BLE service." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: pair, disabled: busy, className: "mt-6 w-full bg-primary text-primary-foreground py-3 uppercase tracking-wider text-sm disabled:opacity-50", children: busy ? "Pairing…" : "Pair device" })
      ] }),
      connected && /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceCard, { name: name ?? "On2Cook Device", status: "Connected over Bluetooth LE", connected: true, busy, onReconnect: () => reconnect(deviceId), onForget: deviceId ? () => forget(deviceId) : void 0 }),
      known.filter((d) => !connected || d.id !== deviceId).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceCard, { name: d.name || "On2Cook Device", status: `Offline · Last connected ${new Date(d.lastSeen).toLocaleString()}`, connected: false, busy, onReconnect: () => reconnect(d.id), onForget: () => forget(d.id) }, d.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface border border-border border-dashed p-6 flex flex-col items-center justify-center text-center gap-3 min-h-56", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-8 h-8 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg", children: "Add another device" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Scan for nearby On2Cook units broadcasting over BLE." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: pair, disabled: busy, className: "mt-2 border border-border px-5 py-2 uppercase tracking-wider text-xs hover:border-primary disabled:opacity-50", children: busy ? "Scanning…" : "Scan" })
      ] })
    ] })
  ] });
}
function DeviceCard({
  name,
  status,
  connected,
  busy,
  onReconnect,
  onForget
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface border border-border p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2.5 h-2.5 rounded-full shrink-0 ${connected ? "bg-success" : "bg-muted-foreground"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg truncate", children: name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bluetooth, { className: `w-5 h-5 shrink-0 ${connected ? "text-success" : "text-muted-foreground"}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: status }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-2", children: [
      connected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/control", className: "flex-1 text-center bg-primary text-primary-foreground py-3 uppercase tracking-wider text-sm", children: "Open Start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => ble.disconnect(), className: "px-4 border border-border uppercase tracking-wider text-sm", children: "Disconnect" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onReconnect, disabled: busy, className: "flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 uppercase tracking-wider text-sm disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-4 h-4" }),
        " Reconnect"
      ] }),
      onForget && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onForget, className: "px-4 border border-border text-muted-foreground hover:text-foreground", "aria-label": "Forget device", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
    ] })
  ] });
}
export {
  Devices as component
};

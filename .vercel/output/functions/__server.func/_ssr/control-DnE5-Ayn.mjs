import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as ble } from "./router-GLVhCr00.mjs";
import { B as Bluetooth, Z as Zap, b as Waves, R as RotateCw, M as Minus, a as Plus, c as Beaker, P as Power } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function Control() {
  const [connected, setConnected] = reactExports.useState(false);
  const [indOn, setIndOn] = reactExports.useState(false);
  const [magOn, setMagOn] = reactExports.useState(false);
  const [stirOn, setStirOn] = reactExports.useState(false);
  const [stirSpeed, setStirSpeed] = reactExports.useState("MED");
  const [indPower, setIndPower] = reactExports.useState(0);
  const [magPower, setMagPower] = reactExports.useState(0);
  const [pumpTicks, setPumpTicks] = reactExports.useState(1);
  const [log, setLog] = reactExports.useState([]);
  const logRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const u1 = ble.onState((c) => setConnected(c));
    const u2 = ble.onMessage((msg) => {
      setLog((l) => [...l.slice(-100), `← ${msg}`]);
      const m = msg.match(/INDPOWER=(-?\d+)/);
      if (m) setIndPower(Number(m[1]));
      const m2 = msg.match(/MAGPOWER=(-?\d+)/);
      if (m2) setMagPower(Number(m2[1]));
      if (/STIRRER=ON/.test(msg)) setStirOn(true);
      if (/STIRRER=OFF/.test(msg)) setStirOn(false);
    });
    return () => {
      u1();
      u2();
    };
  }, []);
  reactExports.useEffect(() => {
    logRef.current?.scrollTo({
      top: 9e9
    });
  }, [log]);
  async function safe(fn, label) {
    try {
      setLog((l) => [...l.slice(-100), `→ ${label}`]);
      await fn();
    } catch (e) {
      setLog((l) => [...l.slice(-100), `⚠ ${e?.message ?? e}`]);
    }
  }
  async function toggleInd() {
    if (!indOn) {
      await safe(() => ble.indQuickStart(), "INDQUICKSTART=START");
      setIndOn(true);
    } else {
      await safe(() => ble.indQuickStop(), "INDQUICKSTART=STOP");
      setIndOn(false);
    }
  }
  async function toggleMag() {
    if (!magOn) {
      await safe(() => ble.magQuickStart(), "MAGQUICKSTART=START");
      setMagOn(true);
    } else {
      await safe(() => ble.magQuickStop(), "MAGQUICKSTART=STOP");
      setMagOn(false);
    }
  }
  async function toggleStir() {
    const next = !stirOn;
    await safe(() => ble.stirrer(next, stirSpeed), `STIRRER=${next ? "ON," + stirSpeed : "OFF"}`);
    setStirOn(next);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 md:px-10 py-8 md:py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-primary mb-1", children: "Live control" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-display", children: "On2cook Pro 3000" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-2 text-xs uppercase tracking-wider px-3 py-2 border ${connected ? "border-success text-success" : "border-border text-muted-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bluetooth, { className: "w-4 h-4" }),
        " ",
        connected ? "Connected" : "Offline"
      ] })
    ] }),
    !connected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface border border-border p-4 mb-6 text-sm flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Pair a device to start sending commands." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => ble.connect().catch(() => {
      }), className: "bg-primary text-primary-foreground px-4 py-2 uppercase tracking-wider text-xs", children: "Connect" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }), title: "Induction", subtitle: "3.5 kW Cooktop", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BigToggle, { label: indOn ? "ON" : "OFF", on: indOn, onClick: toggleInd }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stepper, { label: "Power", value: indPower, unit: "%", onMinus: () => safe(() => ble.indPowerDelta(-10), "INDPOWER=-10"), onPlus: () => safe(() => ble.indPowerDelta(10), "INDPOWER=10") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Waves, { className: "w-5 h-5" }), title: "Microwave", subtitle: "1 kW Magnetron", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BigToggle, { label: magOn ? "ON" : "OFF", on: magOn, onClick: toggleMag }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stepper, { label: "Power", value: magPower, unit: "%", onMinus: () => safe(() => ble.magPowerDelta(-10), "MAGPOWER=-10"), onPlus: () => safe(() => ble.magPowerDelta(10), "MAGPOWER=10") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-5 h-5" }), title: "Stirrer", subtitle: "Speed control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BigToggle, { label: stirOn ? "ON" : "OFF", on: stirOn, onClick: toggleStir }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1 mt-4", children: ["LOW", "MED", "HIGH", "VERY_HIGH"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
          setStirSpeed(s);
          if (stirOn) await safe(() => ble.stirrer(true, s), `STIRRER=ON,${s}`);
        }, className: `py-2 text-[10px] uppercase tracking-wider border ${stirSpeed === s ? "border-primary text-primary" : "border-border text-muted-foreground"}`, children: s.replace("_", " ") }, s)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Beaker, { className: "w-5 h-5" }), title: "Dosing Pump", subtitle: "Ticks (×10 ml)", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPumpTicks((t) => Math.max(1, t - 1)), className: "w-12 h-12 border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl font-display tabular-nums w-24 text-center", children: pumpTicks }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPumpTicks((t) => t + 1), className: "w-12 h-12 border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => safe(() => ble.pump(true, pumpTicks), `PUMP=ON,${pumpTicks}`), className: "bg-primary text-primary-foreground py-3 uppercase tracking-wider text-sm", children: "Dispense" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => safe(() => ble.pump(false), "PUMP=OFF"), className: "border border-border py-3 uppercase tracking-wider text-sm", children: "Stop" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 bg-surface border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 border-b border-border flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Command log" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLog([]), className: "text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground", children: "Clear" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: logRef, className: "font-mono text-xs p-4 h-44 overflow-auto space-y-1", children: [
        log.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No traffic yet." }),
        log.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: l.startsWith("←") ? "text-success" : l.startsWith("⚠") ? "text-destructive" : "text-foreground", children: l }, i))
      ] })
    ] })
  ] });
}
function Panel({
  icon,
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-surface border border-border p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 bg-surface-2 flex items-center justify-center text-primary", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg leading-none", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1", children: subtitle })
      ] })
    ] }),
    children
  ] });
}
function BigToggle({
  label,
  on,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: `w-full flex items-center justify-center gap-3 py-5 uppercase tracking-[0.3em] text-sm font-display transition-colors ${on ? "bg-primary text-primary-foreground" : "bg-surface-2 text-foreground hover:bg-surface-2/70"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "w-5 h-5" }),
    " ",
    label
  ] });
}
function Stepper({
  label,
  value,
  unit,
  onMinus,
  onPlus
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onMinus, className: "w-10 h-10 border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-display tabular-nums w-20 text-center", children: [
        value,
        unit
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onPlus, className: "w-10 h-10 border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }) })
    ] })
  ] });
}
export {
  Control as component
};

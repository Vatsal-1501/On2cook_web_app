import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as ChevronRight, d as Cpu, F as Flame, A as Activity, e as Timer, G as Gauge, R as RotateCw, D as Droplets, f as Leaf, g as Utensils } from "../_libs/lucide-react.mjs";
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
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.62_0.22_27/0.35),transparent_60%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6 md:px-10 py-14 md:py-24 grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-primary mb-4", children: "On2Cook Control OS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-7xl font-display leading-[0.95] max-w-3xl", children: [
            "World’s fastest ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "connected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "cooking device."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-muted-foreground text-lg", children: "Pair, monitor and command the patented Microwave + Induction cooking system directly from the browser — built for commercial kitchens, recipe consistency and fast service." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-3 gap-2 max-w-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { value: "70%", label: "faster cooking" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { value: "40%", label: "energy saving" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { value: "6 in 1", label: "cooking methods" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/devices", className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-wider text-sm", children: [
              "Connect device ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/control", className: "inline-flex items-center gap-2 border border-border px-6 py-3 uppercase tracking-wider text-sm hover:border-primary", children: "Open Start" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-10 bg-primary/20 blur-3xl rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/on2cook-device.png", alt: "On2Cook device", className: "relative w-full object-contain drop-shadow-2xl" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 md:px-10 py-14 grid md:grid-cols-3 gap-px bg-border", children: [{
      icon: Cpu,
      t: "Combinational cooking",
      d: "Microwave energy cooks from inside while induction provides direct pan heat from below."
    }, {
      icon: Flame,
      t: "Commercial power control",
      d: "Start, stop and tune induction, microwave, stirrer and water dosing pump from one interface."
    }, {
      icon: Activity,
      t: "Live BLE telemetry",
      d: "Receive device status and command acknowledgements in real time through Web Bluetooth."
    }].map(({
      icon: Icon,
      t,
      d
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-primary mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg mb-2", children: t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: d })
    ] }, t)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 md:px-10 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3", children: "Device features" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Timer, title: "Faster recipe execution", text: "Designed for high-throughput kitchens where repeatable recipes and reduced service time matter." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Gauge, title: "ROI focused operation", text: "Lower cooking cost, labor dependency, oil and food wastage while keeping output consistent." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: RotateCw, title: "Automatic stirrer", text: "Food-grade stirring control for repeatable mixing, sautéing and frying steps." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Droplets, title: "Sprayer pump", text: "Water dosing support for recipes that need controlled moisture addition." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Leaf, title: "Nutrition rich food", text: "Fast cooking with controlled energy delivery helps preserve taste, texture and nutrition." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { icon: Utensils, title: "Menu expansion", text: "Supports restaurants, QSRs, cloud kitchens, cafeterias, hotels and live counters." })
      ] })
    ] })
  ] });
}
function Metric({
  value,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface border border-border p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl md:text-3xl font-display text-primary", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: label })
  ] });
}
function Feature({
  icon: Icon,
  title,
  text
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface border border-border p-6 flex gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 bg-surface-2 flex items-center justify-center text-primary shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg leading-none mb-2", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: text })
    ] })
  ] });
}
export {
  Home as component
};

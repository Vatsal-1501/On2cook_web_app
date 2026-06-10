import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Cpu, Flame, Activity } from "lucide-react";
function Home() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden border-b border-border", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.62_0.22_27/0.35),transparent_60%)]" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-32", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-primary mb-4", children: "Kitchen OS · v1.0" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-7xl font-display leading-[0.95] max-w-3xl", children: [
          "The cooking ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "interface" }),
          /* @__PURE__ */ jsx("br", {}),
          "built for professionals."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-muted-foreground text-lg", children: "Pair, monitor and command your UniBox induction & microwave system right from the browser — no app install required." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/devices", className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-wider text-sm", children: [
            "Connect a device ",
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/control", className: "inline-flex items-center gap-2 border border-border px-6 py-3 uppercase tracking-wider text-sm hover:border-primary", children: "Open Control" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-6 md:px-10 py-16 grid md:grid-cols-3 gap-px bg-border", children: [{
      icon: Cpu,
      t: "Native Web Bluetooth",
      d: "Direct BLE GATT connection from Chrome & Edge to your device."
    }, {
      icon: Flame,
      t: "Full Power Control",
      d: "Induction, microwave magnetron, stirrer and dosing pump."
    }, {
      icon: Activity,
      t: "Live Telemetry",
      d: "Real-time notifications stream back to your dashboard."
    }].map(({
      icon: Icon,
      t,
      d
    }) => /* @__PURE__ */ jsxs("div", { className: "bg-background p-8", children: [
      /* @__PURE__ */ jsx(Icon, { className: "w-8 h-8 text-primary mb-6" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg mb-2", children: t }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: d })
    ] }, t)) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-6 md:px-10 py-16", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3", children: "Featured device" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-center bg-surface border border-border", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] bg-[radial-gradient(circle_at_30%_30%,oklch(0.62_0.22_27/0.5),transparent_60%),linear-gradient(135deg,oklch(0.26_0.014_250),oklch(0.16_0.01_250))] flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-48 h-48 rounded-full border-[10px] border-foreground/80 relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-4 rounded-full border-2 border-primary/70" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-12 rounded-full bg-primary/20" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-12", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-display", children: "UniBox Pro 3000" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-primary uppercase tracking-widest text-xs", children: "Induction · Microwave · Stirrer · Pump" }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 text-muted-foreground", children: "All-in-one professional cooking module with 3.5kW induction, 1kW microwave magnetron, programmable stirrer and precision dosing pump." }),
          /* @__PURE__ */ jsxs(Link, { to: "/control", className: "inline-flex mt-8 items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-wider text-sm", children: [
            "Control now ",
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Home as component
};

import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { b as ble } from "./router-rC3ET6iQ.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "lucide-react";
function Custom() {
  const [cmd, setCmd] = useState("STATUS=?");
  const [out, setOut] = useState("");
  async function run() {
    try {
      await ble.send(cmd);
      setOut("sent: " + cmd);
    } catch (e) {
      setOut(e?.message ?? String(e));
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-6 md:px-10 py-12", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-primary mb-2", children: "Advanced" }),
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-display mb-8", children: "Custom command" }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
      "Send any raw BLE protocol string. Examples: ",
      /* @__PURE__ */ jsx("code", { className: "text-primary", children: "INDQUICKSTART=START" }),
      ", ",
      /* @__PURE__ */ jsx("code", { className: "text-primary", children: "MAGPOWER=10" }),
      ", ",
      /* @__PURE__ */ jsx("code", { className: "text-primary", children: "PUMP=ON,5" }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("input", { value: cmd, onChange: (e) => setCmd(e.target.value), className: "flex-1 bg-surface border border-border px-4 py-3 font-mono text-sm" }),
      /* @__PURE__ */ jsx("button", { onClick: run, className: "bg-primary text-primary-foreground px-6 py-3 uppercase tracking-wider text-sm", children: "Send" })
    ] }),
    out && /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm font-mono text-muted-foreground", children: out })
  ] });
}
export {
  Custom as component
};

import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as ble } from "./router-GLVhCr00.mjs";
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
import "../_libs/lucide-react.mjs";
function Custom() {
  const [cmd, setCmd] = reactExports.useState("STATUS=?");
  const [out, setOut] = reactExports.useState("");
  async function run() {
    try {
      await ble.send(cmd);
      setOut("sent: " + cmd);
    } catch (e) {
      setOut(e?.message ?? String(e));
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 md:px-10 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-primary mb-2", children: "Advanced" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display mb-8", children: "Custom command" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
      "Send any raw BLE protocol string. Examples: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-primary", children: "INDQUICKSTART=START" }),
      ", ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-primary", children: "MAGPOWER=10" }),
      ", ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-primary", children: "PUMP=ON,5" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cmd, onChange: (e) => setCmd(e.target.value), className: "flex-1 bg-surface border border-border px-4 py-3 font-mono text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: run, className: "bg-primary text-primary-foreground px-6 py-3 uppercase tracking-wider text-sm", children: "Send" })
    ] }),
    out && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-sm font-mono text-muted-foreground", children: out })
  ] });
}
export {
  Custom as component
};

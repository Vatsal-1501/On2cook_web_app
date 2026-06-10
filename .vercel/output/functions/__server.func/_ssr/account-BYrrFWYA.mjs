import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { U as User } from "../_libs/lucide-react.mjs";
function Account() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 md:px-10 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-primary mb-2", children: "Profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display mb-8", children: "Account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface border border-border p-6 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-14 h-14 rounded-full bg-surface-2 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-7 h-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg", children: "Guest Operator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign-in coming soon." })
      ] })
    ] })
  ] });
}
export {
  Account as component
};

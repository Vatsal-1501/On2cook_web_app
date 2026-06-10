import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Bluetooth, H as House, L as LayoutGrid, P as Power, S as SlidersVertical, U as User } from "../_libs/lucide-react.mjs";
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
const appCss = "/assets/styles-DGXy9voW.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const SERVICE_UUID = "ab0828b1-198e-4351-b779-901fa0e0371e";
const CHARACTERISTIC_UUID = "4ac8a682-9736-4e5d-932b-e9b31405049c";
const CHARACTERISTIC_UUID_FILE = "4ac8c682-9736-4e5d-932b-e9b31405049c";
const KNOWN_DEVICES_KEY = "on2cook.knownBleDevices";
class BleClient {
  device = null;
  server = null;
  char = null;
  charFile = null;
  listeners = /* @__PURE__ */ new Set();
  stateListeners = /* @__PURE__ */ new Set();
  encoder = new TextEncoder();
  decoder = new TextDecoder();
  isSupported() {
    return typeof navigator !== "undefined" && !!navigator.bluetooth;
  }
  isConnected() {
    return !!this.server?.connected;
  }
  onMessage(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  onState(fn) {
    this.stateListeners.add(fn);
    fn(this.isConnected(), this.device?.name ?? this.lastKnownDeviceName(), this.device?.id);
    return () => this.stateListeners.delete(fn);
  }
  emitState() {
    const connected = this.isConnected();
    const name = this.device?.name ?? this.lastKnownDeviceName();
    const id = this.device?.id;
    this.stateListeners.forEach((f) => f(connected, name, id));
  }
  getKnownDevices() {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem(KNOWN_DEVICES_KEY) || "[]");
    } catch {
      return [];
    }
  }
  saveKnownDevice(device) {
    if (typeof window === "undefined") return;
    const known = this.getKnownDevices().filter((d) => d.id !== device.id);
    known.unshift({
      id: device.id || device.name || "on2cook-device",
      name: device.name || "On2Cook Device",
      lastSeen: Date.now()
    });
    window.localStorage.setItem(KNOWN_DEVICES_KEY, JSON.stringify(known.slice(0, 8)));
  }
  forgetKnownDevice(id) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      KNOWN_DEVICES_KEY,
      JSON.stringify(this.getKnownDevices().filter((d) => d.id !== id))
    );
    this.emitState();
  }
  lastKnownDeviceName() {
    return this.getKnownDevices()[0]?.name;
  }
  async getRememberedBrowserDevices() {
    if (!this.isSupported() || !navigator.bluetooth.getDevices) return [];
    const devices = await navigator.bluetooth.getDevices();
    devices.forEach((d) => this.saveKnownDevice(d));
    this.emitState();
    return devices;
  }
  async connectToDevice(device) {
    this.device = device;
    this.saveKnownDevice(device);
    device.addEventListener("gattserverdisconnected", () => {
      this.server = null;
      this.char = null;
      this.charFile = null;
      this.emitState();
    });
    const server = await device.gatt.connect();
    this.server = server;
    const service = await server.getPrimaryService(SERVICE_UUID);
    this.char = await service.getCharacteristic(CHARACTERISTIC_UUID);
    try {
      this.charFile = await service.getCharacteristic(CHARACTERISTIC_UUID_FILE);
    } catch {
    }
    await this.char.startNotifications();
    this.char.addEventListener("characteristicvaluechanged", (e) => {
      const v = e.target.value;
      const msg = this.decoder.decode(v.buffer);
      this.listeners.forEach((f) => f(msg));
    });
    this.emitState();
  }
  async connect() {
    if (!this.isSupported()) throw new Error("Web Bluetooth not supported in this browser. Use Chrome or Edge on desktop/Android.");
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }],
      optionalServices: [SERVICE_UUID]
    });
    await this.connectToDevice(device);
  }
  async reconnectKnown(id) {
    if (!this.isSupported()) throw new Error("Web Bluetooth not supported in this browser. Use Chrome or Edge on desktop/Android.");
    if (!navigator.bluetooth.getDevices) {
      throw new Error("This browser does not allow reconnecting saved BLE devices. Please tap Pair device again.");
    }
    const devices = await navigator.bluetooth.getDevices();
    const target = id ? devices.find((d) => d.id === id) : devices[0];
    if (!target) throw new Error("Saved browser permission not found. Please pair the device again.");
    await this.connectToDevice(target);
  }
  async disconnect() {
    try {
      this.device?.gatt?.disconnect();
    } catch {
    }
    this.server = null;
    this.char = null;
    this.charFile = null;
    this.emitState();
  }
  async send(cmd) {
    if (!this.char || !this.isConnected()) throw new Error("Not connected");
    await this.char.writeValue(this.encoder.encode(cmd));
  }
  // High-level helpers — exact strings from BLE_Controller.cpp
  indStart() {
    return this.send("IND=START");
  }
  indPause() {
    return this.send("IND=PAUSE");
  }
  indQuickStart() {
    return this.send("INDQUICKSTART=START");
  }
  indQuickStop() {
    return this.send("INDQUICKSTART=STOP");
  }
  indPowerDelta(delta) {
    return this.send(`INDPOWER=${delta}`);
  }
  magStart() {
    return this.send("MAG=START");
  }
  magPause() {
    return this.send("MAG=PAUSE");
  }
  magQuickStart() {
    return this.send("MAGQUICKSTART=START");
  }
  magQuickStop() {
    return this.send("MAGQUICKSTART=STOP");
  }
  magPowerDelta(delta) {
    return this.send(`MAGPOWER=${delta}`);
  }
  stirrer(on, speed = "MED") {
    return this.send(on ? `STIRRER=ON,${speed}` : "STIRRER=OFF");
  }
  pump(on, ticks = 1) {
    return this.send(on ? `PUMP=ON,${ticks}` : "PUMP=OFF");
  }
  status() {
    return this.send("STATUS=?");
  }
}
const ble = new BleClient();
const navItems = [
  { to: "/", label: "Home" },
  { to: "/devices", label: "Devices" },
  { to: "/control", label: "Start" },
  { to: "/custom", label: "Custom" },
  { to: "/account", label: "Account" }
];
function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [connected, setConnected] = reactExports.useState(false);
  const [name, setName] = reactExports.useState();
  reactExports.useEffect(() => {
    const unsub = ble.onState((c, n) => {
      setConnected(c);
      setName(n);
    });
    return () => {
      unsub();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "hidden md:block sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display tracking-widest text-primary", children: "ON2COOK" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Control OS" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex items-center gap-1", children: navItems.map((i) => {
      const active = pathname === i.to;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: i.to,
          className: `px-4 py-2 rounded-md text-sm uppercase tracking-wider transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
          children: i.label
        }
      ) }, i.to);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bluetooth, { className: `w-4 h-4 ${connected ? "text-success" : "text-muted-foreground"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: connected ? name ?? "Connected" : "Disconnected" })
    ] })
  ] }) });
}
const items = [
  { to: "/", label: "Home", icon: House },
  { to: "/devices", label: "Devices", icon: LayoutGrid },
  { to: "/control", label: "Start", icon: Power, center: true },
  { to: "/custom", label: "Custom", icon: SlidersVertical },
  { to: "/account", label: "Account", icon: User }
];
function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      "aria-label": "Primary",
      className: "fixed bottom-0 inset-x-0 z-50 md:hidden bg-surface/98 backdrop-blur border-t border-border pb-[env(safe-area-inset-bottom)]",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-5 items-center h-[76px] px-1", children: items.map(({ to, label, icon: Icon, center }) => {
        const active = pathname === to;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to,
            "aria-label": label,
            className: `relative h-full w-full flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-wider transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
            children: [
              center ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "-mt-4 mb-0.5 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/35 ring-4 ring-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-none whitespace-nowrap", children: label })
            ]
          }
        ) }, to);
      }) })
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$5 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "On2Cook Control OS" },
      { name: "description", content: "Browser-based control for On2Cook connected cooking devices." },
      { name: "author", content: "On2Cook" },
      { property: "og:title", content: "On2Cook Control OS" },
      { property: "og:description", content: "Browser-based control for On2Cook connected cooking devices." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@On2Cook" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$5.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pb-24 md:pb-0 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
const $$splitComponentImporter$4 = () => import("./devices-BZg1_peB.mjs");
const Route$4 = createFileRoute("/devices")({
  head: () => ({
    meta: [{
      title: "Devices — On2Cook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./custom-CURqh3QA.mjs");
const Route$3 = createFileRoute("/custom")({
  head: () => ({
    meta: [{
      title: "Custom — On2Cook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./control-DFys9Nyw.mjs");
const Route$2 = createFileRoute("/control")({
  head: () => ({
    meta: [{
      title: "Start — On2Cook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./account-BYrrFWYA.mjs");
const Route$1 = createFileRoute("/account")({
  head: () => ({
    meta: [{
      title: "Account — On2Cook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-CxHa9ffo.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "On2Cook — Connected Cooking Control"
    }, {
      name: "description",
      content: "Control On2Cook's patented microwave and induction combination cooking device over Bluetooth from the browser."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const DevicesRoute = Route$4.update({
  id: "/devices",
  path: "/devices",
  getParentRoute: () => Route$5
});
const CustomRoute = Route$3.update({
  id: "/custom",
  path: "/custom",
  getParentRoute: () => Route$5
});
const ControlRoute = Route$2.update({
  id: "/control",
  path: "/control",
  getParentRoute: () => Route$5
});
const AccountRoute = Route$1.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => Route$5
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  AccountRoute,
  ControlRoute,
  CustomRoute,
  DevicesRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ble as b,
  router as r
};

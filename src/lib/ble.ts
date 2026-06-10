// Web Bluetooth wrapper for the On2Cook cooking device.
// Mirrors the protocol in BLE_Controller.cpp (SERVICE/CHARACTERISTIC UUIDs).

export const SERVICE_UUID = "ab0828b1-198e-4351-b779-901fa0e0371e";
export const CHARACTERISTIC_UUID = "4ac8a682-9736-4e5d-932b-e9b31405049c";
export const CHARACTERISTIC_UUID_FILE = "4ac8c682-9736-4e5d-932b-e9b31405049c";

type Listener = (msg: string) => void;
export type KnownBleDevice = { id: string; name: string; lastSeen: number };

const KNOWN_DEVICES_KEY = "on2cook.knownBleDevices";

class BleClient {
  device: any | null = null;
  server: any | null = null;
  char: any | null = null;
  charFile: any | null = null;
  private listeners = new Set<Listener>();
  private stateListeners = new Set<(connected: boolean, name?: string, id?: string) => void>();
  private encoder = new TextEncoder();
  private decoder = new TextDecoder();

  isSupported() {
    return typeof navigator !== "undefined" && !!(navigator as any).bluetooth;
  }

  isConnected() {
    return !!this.server?.connected;
  }

  onMessage(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  onState(fn: (connected: boolean, name?: string, id?: string) => void) {
    this.stateListeners.add(fn);
    fn(this.isConnected(), this.device?.name ?? this.lastKnownDeviceName(), this.device?.id);
    return () => this.stateListeners.delete(fn);
  }

  private emitState() {
    const connected = this.isConnected();
    const name = this.device?.name ?? this.lastKnownDeviceName();
    const id = this.device?.id;
    this.stateListeners.forEach((f) => f(connected, name, id));
  }

  getKnownDevices(): KnownBleDevice[] {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem(KNOWN_DEVICES_KEY) || "[]");
    } catch {
      return [];
    }
  }

  private saveKnownDevice(device: any) {
    if (typeof window === "undefined") return;
    const known = this.getKnownDevices().filter((d) => d.id !== device.id);
    known.unshift({
      id: device.id || device.name || "on2cook-device",
      name: device.name || "On2Cook Device",
      lastSeen: Date.now(),
    });
    window.localStorage.setItem(KNOWN_DEVICES_KEY, JSON.stringify(known.slice(0, 8)));
  }

  forgetKnownDevice(id: string) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      KNOWN_DEVICES_KEY,
      JSON.stringify(this.getKnownDevices().filter((d) => d.id !== id)),
    );
    this.emitState();
  }

  private lastKnownDeviceName() {
    return this.getKnownDevices()[0]?.name;
  }

  async getRememberedBrowserDevices() {
    if (!this.isSupported() || !(navigator as any).bluetooth.getDevices) return [];
    const devices = await (navigator as any).bluetooth.getDevices();
    devices.forEach((d: any) => this.saveKnownDevice(d));
    this.emitState();
    return devices;
  }

  private async connectToDevice(device: any) {
    this.device = device;
    this.saveKnownDevice(device);
    device.addEventListener("gattserverdisconnected", () => {
      this.server = null;
      this.char = null;
      this.charFile = null;
      this.emitState();
    });

    const server = await device.gatt!.connect();
    this.server = server;
    const service = await server.getPrimaryService(SERVICE_UUID);
    this.char = await service.getCharacteristic(CHARACTERISTIC_UUID);
    try {
      this.charFile = await service.getCharacteristic(CHARACTERISTIC_UUID_FILE);
    } catch {}

    await this.char.startNotifications();
    this.char.addEventListener("characteristicvaluechanged", (e: any) => {
      const v = e.target.value as DataView;
      const msg = this.decoder.decode(v.buffer);
      this.listeners.forEach((f) => f(msg));
    });
    this.emitState();
  }

  async connect() {
    if (!this.isSupported()) throw new Error("Web Bluetooth not supported in this browser. Use Chrome or Edge on desktop/Android.");
    const device = await (navigator as any).bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }],
      optionalServices: [SERVICE_UUID],
    });
    await this.connectToDevice(device);
  }

  async reconnectKnown(id?: string) {
    if (!this.isSupported()) throw new Error("Web Bluetooth not supported in this browser. Use Chrome or Edge on desktop/Android.");
    if (!(navigator as any).bluetooth.getDevices) {
      throw new Error("This browser does not allow reconnecting saved BLE devices. Please tap Pair device again.");
    }
    const devices = await (navigator as any).bluetooth.getDevices();
    const target = id ? devices.find((d: any) => d.id === id) : devices[0];
    if (!target) throw new Error("Saved browser permission not found. Please pair the device again.");
    await this.connectToDevice(target);
  }

  async disconnect() {
    try { this.device?.gatt?.disconnect(); } catch {}
    this.server = null;
    this.char = null;
    this.charFile = null;
    this.emitState();
  }

  async send(cmd: string) {
    if (!this.char || !this.isConnected()) throw new Error("Not connected");
    await this.char.writeValue(this.encoder.encode(cmd));
  }

  // High-level helpers — exact strings from BLE_Controller.cpp
  indStart() { return this.send("IND=START"); }
  indPause() { return this.send("IND=PAUSE"); }
  indQuickStart() { return this.send("INDQUICKSTART=START"); }
  indQuickStop() { return this.send("INDQUICKSTART=STOP"); }
  indPowerDelta(delta: number) { return this.send(`INDPOWER=${delta}`); }
  magStart() { return this.send("MAG=START"); }
  magPause() { return this.send("MAG=PAUSE"); }
  magQuickStart() { return this.send("MAGQUICKSTART=START"); }
  magQuickStop() { return this.send("MAGQUICKSTART=STOP"); }
  magPowerDelta(delta: number) { return this.send(`MAGPOWER=${delta}`); }
  stirrer(on: boolean, speed: "LOW" | "MED" | "HIGH" | "VERY_HIGH" = "MED") {
    return this.send(on ? `STIRRER=ON,${speed}` : "STIRRER=OFF");
  }
  pump(on: boolean, ticks = 1) {
    return this.send(on ? `PUMP=ON,${ticks}` : "PUMP=OFF");
  }
  status() { return this.send("STATUS=?"); }
}

export const ble = new BleClient();

// Web Bluetooth wrapper for the Unox-compatible cooking device.
// Mirrors the protocol in BLE_Controller.cpp (SERVICE/CHARACTERISTIC UUIDs).

export const SERVICE_UUID = "ab0828b1-198e-4351-b779-901fa0e0371e";
export const CHARACTERISTIC_UUID = "4ac8a682-9736-4e5d-932b-e9b31405049c";
export const CHARACTERISTIC_UUID_FILE = "4ac8c682-9736-4e5d-932b-e9b31405049c";

type Listener = (msg: string) => void;

class BleClient {
  device: any | null = null;
  server: any | null = null;
  char: any | null = null;
  charFile: any | null = null;
  private listeners = new Set<Listener>();
  private stateListeners = new Set<(connected: boolean, name?: string) => void>();
  private encoder = new TextEncoder();
  private decoder = new TextDecoder();

  isSupported() {
    return typeof navigator !== "undefined" && !!(navigator as any).bluetooth;
  }

  onMessage(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  onState(fn: (connected: boolean, name?: string) => void) {
    this.stateListeners.add(fn);
    return () => this.stateListeners.delete(fn);
  }

  private emitState() {
    const connected = !!this.server?.connected;
    this.stateListeners.forEach((f) => f(connected, this.device?.name ?? undefined));
  }

  async connect() {
    if (!this.isSupported()) throw new Error("Web Bluetooth not supported in this browser. Use Chrome or Edge.");
    const device = await (navigator as any).bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }],
      optionalServices: [SERVICE_UUID],
    });
    this.device = device;
    device.addEventListener("gattserverdisconnected", () => this.emitState());
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

  async disconnect() {
    try { this.device?.gatt?.disconnect(); } catch {}
    this.emitState();
  }

  async send(cmd: string) {
    if (!this.char) throw new Error("Not connected");
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

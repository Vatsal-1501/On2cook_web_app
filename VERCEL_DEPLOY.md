# On2Cook Control OS — Deploy to Vercel

This is a **TanStack Start + React** web app for controlling On2Cook BLE cooking devices (microwave, induction, stirrer, pump). It uses the **Web Bluetooth API** for browser-to-device communication.

---

## Quick Deploy to Vercel

### Option 1: Git → Vercel (Recommended)

1. **Push this project to a GitHub repository**
2. **Go to [vercel.com](https://vercel.com)** → Add New Project
3. **Import your GitHub repo**
4. **Vercel will auto-detect these settings:**
   - **Framework Preset:** `Other`
   - **Build Command:** `npm run build` (or `bun run build`)
   - **Output Directory:** `.vercel/output`
   - **Node.js Version:** `22.x`
5. **Click Deploy**

> The `vite.config.ts` already has `nitro: { preset: "vercel" }`, so the build output is automatically formatted for Vercel serverless functions.

---

### Option 2: Vercel CLI (Pre-built)

If you already built the project locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy the pre-built .vercel/output folder
cd .vercel/output
vercel --prebuilt
```

---

### Option 3: Local Build → Vercel CLI

```bash
# Install dependencies
bun install     # or: npm install

# Build for Vercel
bun run build   # or: npm run build

# The output is in .vercel/output/
# Deploy it:
cd .vercel/output
vercel --prebuilt
```

---

## Important Notes

- **Web Bluetooth only works in Chrome, Edge, or Opera** (desktop & Android). It does NOT work in Safari or Firefox.
- The app requires **HTTPS** (or `localhost`) for Web Bluetooth to function. Vercel deployments are HTTPS by default.
- You must be physically near a BLE device with the UUID `ab0828b1-198e-4351-b779-901fa0e0371e` to pair.

---

## Development

```bash
bun install
bun dev
```

Open `http://localhost:3000` in **Chrome or Edge**.

---

## Project Structure

```
src/
  routes/           # TanStack file-based routes
    index.tsx       # Dashboard
    devices.tsx     # BLE device scanner
    control.tsx     # Device controls (induction, stirrer, pump)
    custom.tsx      # Custom commands
    account.tsx     # Settings / account
  components/
    BottomNav.tsx   # Mobile bottom navigation
    TopNav.tsx      # Header
  lib/
    ble.ts          # Web Bluetooth client
  styles.css        # Tailwind + custom theme
```

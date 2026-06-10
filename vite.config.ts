import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Override Nitro preset for Vercel deployment
  nitro: {
    preset: "vercel",
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          dayjs: ["dayjs"],
          axios: ["axios"],
          tanstack: ["@tanstack/react-router"],
          fluenticon: ["@fluentui/react-icons"],
          fluentui: [
            "@fluentui/react-calendar-compat",
            "@fluentui/react-components",
            "@fluentui/react-datepicker-compat",
          ],
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
});

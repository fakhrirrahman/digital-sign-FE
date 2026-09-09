import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const digitalSignUrl = env.VITE_DIGITAL_SIGN_API_URL || "http://localhost:3000";
  const mainApiUrl = env.VITE_MAIN_API_URL || "http://localhost:3001";

  return {
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
    ],
    server: {
      port: Number(env.PORT) || 5172,
      strictPort: true,
      proxy: {
        // Endpoint khusus untuk Digital Sign (Backend Lokal Elysia)
        "/api/dashboard": {
          target: digitalSignUrl,
          changeOrigin: true,
        },
        "/api/signer-setup": {
          target: digitalSignUrl,
          changeOrigin: true,
        },
        "/api/approval-process": {
          target: digitalSignUrl,
          changeOrigin: true,
        },
        // Sisa request API lainnya (termasuk /api/auth/login, persuratan, dll) dilempar ke Main Backend
        "/api": {
          target: mainApiUrl,
          changeOrigin: true,
        },
      },
    },
  };
});

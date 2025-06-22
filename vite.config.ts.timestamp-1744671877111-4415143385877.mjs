// vite.config.ts
import path from "path";
import tailwindcss from "file:///Users/chingcheonglee/Repos/Freelance/2024-07-30-Alice-Timetable-System-Frontend/node_modules/@tailwindcss/vite/dist/index.mjs";
import { defineConfig, loadEnv } from "file:///Users/chingcheonglee/Repos/Freelance/2024-07-30-Alice-Timetable-System-Frontend/node_modules/vite/dist/node/index.js";
import react from "file:///Users/chingcheonglee/Repos/Freelance/2024-07-30-Alice-Timetable-System-Frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import eslint from "file:///Users/chingcheonglee/Repos/Freelance/2024-07-30-Alice-Timetable-System-Frontend/node_modules/vite-plugin-eslint/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/chingcheonglee/Repos/Freelance/2024-07-30-Alice-Timetable-System-Frontend";
var vite_config_default = defineConfig(({ command: _command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const newMap = {};
  Object.entries(env).forEach(([k, v]) => {
    if (k.startsWith("VITE_")) {
      newMap[`process.env.${k}`] = v || void 0;
    }
  });
  process.env = Object.assign(process.env, newMap);
  return {
    plugins: [
      react(),
      tailwindcss(),
      eslint({
        failOnError: false,
        failOnWarning: false,
        include: ["src/**/*.ts", "src/**/*.tsx"],
        emitError: true,
        // This will show errors
        emitWarning: true
        // This will show warnings
      })
    ],
    server: {
      port: 4001
    },
    optimizeDeps: {
      include: ["@emotion/styled"]
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvY2hpbmdjaGVvbmdsZWUvUmVwb3MvRnJlZWxhbmNlLzIwMjQtMDctMzAtQWxpY2UtVGltZXRhYmxlLVN5c3RlbS1Gcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2NoaW5nY2hlb25nbGVlL1JlcG9zL0ZyZWVsYW5jZS8yMDI0LTA3LTMwLUFsaWNlLVRpbWV0YWJsZS1TeXN0ZW0tRnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2NoaW5nY2hlb25nbGVlL1JlcG9zL0ZyZWVsYW5jZS8yMDI0LTA3LTMwLUFsaWNlLVRpbWV0YWJsZS1TeXN0ZW0tRnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjsvLyB2aXRlLmNvbmZpZy50c1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuLy8gQHRzLWV4cGVjdC1lcnJvciAtIHR5cGUgZXJyb3IgZnJvbSB2aXRlLXBsdWdpbi1lc2xpbnQsIG5vdCBvdXIgYnVzaW5lc3NcbmltcG9ydCBlc2xpbnQgZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50JztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kOiBfY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gICAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XG4gICAgY29uc3QgbmV3TWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IHVuZGVmaW5lZCB9ID0ge307XG4gICAgT2JqZWN0LmVudHJpZXMoZW52KS5mb3JFYWNoKChbaywgdl0pID0+IHtcbiAgICAgICAgaWYgKGsuc3RhcnRzV2l0aCgnVklURV8nKSkge1xuICAgICAgICAgICAgbmV3TWFwW2Bwcm9jZXNzLmVudi4ke2t9YF0gPSB2IHx8IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHByb2Nlc3MuZW52ID0gT2JqZWN0LmFzc2lnbihwcm9jZXNzLmVudiwgbmV3TWFwKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIHJlYWN0KCksXG4gICAgICAgICAgICB0YWlsd2luZGNzcygpLFxuICAgICAgICAgICAgZXNsaW50KHtcbiAgICAgICAgICAgICAgICBmYWlsT25FcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgZmFpbE9uV2FybmluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogWydzcmMvKiovKi50cycsICdzcmMvKiovKi50c3gnXSxcbiAgICAgICAgICAgICAgICBlbWl0RXJyb3I6IHRydWUsIC8vIFRoaXMgd2lsbCBzaG93IGVycm9yc1xuICAgICAgICAgICAgICAgIGVtaXRXYXJuaW5nOiB0cnVlLCAvLyBUaGlzIHdpbGwgc2hvdyB3YXJuaW5nc1xuICAgICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICAgIHNlcnZlcjoge1xuICAgICAgICAgICAgcG9ydDogNDAwMSxcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICAgICAgICBpbmNsdWRlOiBbJ0BlbW90aW9uL3N0eWxlZCddLFxuICAgICAgICB9LFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxPQUFPLFVBQVU7QUFDakIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxXQUFXO0FBRWxCLE9BQU8sWUFBWTtBQU5uQixJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsVUFBVSxLQUFLLE1BQU07QUFDekQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFFBQU0sU0FBZ0QsQ0FBQztBQUN2RCxTQUFPLFFBQVEsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0FBQ3BDLFFBQUksRUFBRSxXQUFXLE9BQU8sR0FBRztBQUN2QixhQUFPLGVBQWUsQ0FBQyxFQUFFLElBQUksS0FBSztBQUFBLElBQ3RDO0FBQUEsRUFDSixDQUFDO0FBQ0QsVUFBUSxNQUFNLE9BQU8sT0FBTyxRQUFRLEtBQUssTUFBTTtBQUUvQyxTQUFPO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsUUFDSCxhQUFhO0FBQUEsUUFDYixlQUFlO0FBQUEsUUFDZixTQUFTLENBQUMsZUFBZSxjQUFjO0FBQUEsUUFDdkMsV0FBVztBQUFBO0FBQUEsUUFDWCxhQUFhO0FBQUE7QUFBQSxNQUNqQixDQUFDO0FBQUEsSUFDTDtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ0osTUFBTTtBQUFBLElBQ1Y7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNWLFNBQVMsQ0FBQyxpQkFBaUI7QUFBQSxJQUMvQjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ0wsT0FBTztBQUFBLFFBQ0gsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3hDO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=

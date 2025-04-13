// vite.config.ts
import {
    defineConfig,
    loadEnv,
} from 'file:///C:/Users/machingclee/Repos/freelance/2024-07-27-alice-timetable/frontend/node_modules/vite/dist/node/index.js';
import react from 'file:///C:/Users/machingclee/Repos/freelance/2024-07-27-alice-timetable/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs';
var vite_config_default = defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const newMap = {};
    Object.entries(env).forEach(([k, v]) => {
        if (k.startsWith('VITE_')) {
            newMap[`process.env.${k}`] = v || void 0;
        }
    });
    process.env = Object.assign(process.env, newMap);
    return {
        plugins: [react()],
        optimizeDeps: {
            include: ['@emotion/styled'],
        },
    };
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYWNoaW5nY2xlZVxcXFxSZXBvc1xcXFxmcmVlbGFuY2VcXFxcMjAyNC0wNy0yNy1hbGljZS10aW1ldGFibGVcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1hY2hpbmdjbGVlXFxcXFJlcG9zXFxcXGZyZWVsYW5jZVxcXFwyMDI0LTA3LTI3LWFsaWNlLXRpbWV0YWJsZVxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbWFjaGluZ2NsZWUvUmVwb3MvZnJlZWxhbmNlLzIwMjQtMDctMjctYWxpY2UtdGltZXRhYmxlL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7Ly8gdml0ZS5jb25maWcudHNcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJylcbiAgY29uc3QgbmV3TWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IHVuZGVmaW5lZCB9ID0ge31cbiAgT2JqZWN0LmVudHJpZXMoZW52KS5mb3JFYWNoKChbaywgdl0pID0+IHtcbiAgICBpZiAoay5zdGFydHNXaXRoKFwiVklURV9cIikpIHtcbiAgICAgIG5ld01hcFtgcHJvY2Vzcy5lbnYuJHtrfWBdID0gdiB8fCB1bmRlZmluZWQ7XG4gICAgfVxuICB9KVxuICBwcm9jZXNzLmVudiA9IE9iamVjdC5hc3NpZ24ocHJvY2Vzcy5lbnYsIG5ld01hcClcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFsnQGVtb3Rpb24vc3R5bGVkJ10sXG4gICAgfSxcbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDakQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFFBQU0sU0FBZ0QsQ0FBQztBQUN2RCxTQUFPLFFBQVEsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0FBQ3RDLFFBQUksRUFBRSxXQUFXLE9BQU8sR0FBRztBQUN6QixhQUFPLGVBQWUsQ0FBQyxFQUFFLElBQUksS0FBSztBQUFBLElBQ3BDO0FBQUEsRUFDRixDQUFDO0FBQ0QsVUFBUSxNQUFNLE9BQU8sT0FBTyxRQUFRLEtBQUssTUFBTTtBQUUvQyxTQUFPO0FBQUEsSUFDTCxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsSUFDakIsY0FBYztBQUFBLE1BQ1osU0FBUyxDQUFDLGlCQUFpQjtBQUFBLElBQzdCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

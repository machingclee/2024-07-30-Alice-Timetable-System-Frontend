// vite.config.ts

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-expect-error - type error from vite-plugin-eslint, not our business
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ command: _command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const newMap: { [key: string]: string | undefined } = {};
    Object.entries(env).forEach(([k, v]) => {
        if (k.startsWith('VITE_')) {
            newMap[`process.env.${k}`] = v || undefined;
        }
    });
    process.env = Object.assign(process.env, newMap);

    return {
        plugins: [
            react(),
            eslint({
                failOnError: false,
                failOnWarning: false,
                include: ['src/**/*.ts', 'src/**/*.tsx'],
                emitError: true, // This will show errors
                emitWarning: true, // This will show warnings
            }),
        ],
        optimizeDeps: {
            include: ['@emotion/styled'],
        },
    };
});

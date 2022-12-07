import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			src: path.resolve(__dirname, "src"),
		},
	},
	server: {
		port: 3000,
		headers: {
			key: "Cache-Control",
			value: "public, max-age=31536000, immutable",
		},
	},
});

import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, "./lib/main.js"),
			name: "solid-robot",
		},
	},
});

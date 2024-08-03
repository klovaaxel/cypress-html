import { defineConfig } from "cypress";

export default defineConfig({
    component: {
        devServer: {
            framework: "cypress-ct-webcomponents" as any,
            bundler: "vite",
            viteConfig: {},
        },
    },
});

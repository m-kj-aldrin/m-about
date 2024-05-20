import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
    experimental: {
        clientPrerender: true,
    },
    // prefetch: {
    //     defaultStrategy: "load",
    // },
    output: "hybrid",
    adapter: netlify(),
});

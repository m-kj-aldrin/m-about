import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import UnoCss from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  // prefetch: {
  //   defaultStrategy: "load",
  // },
  experimental: {
    clientPrerender: true,
  },
  integrations: [UnoCss()],
  output: "hybrid",
  adapter: netlify(),
});

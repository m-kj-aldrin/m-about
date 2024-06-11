import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  // prefetch: {
  //   defaultStrategy: "load",
  // },
  experimental: {
    clientPrerender: true,
  },
  output: "hybrid",
  adapter: netlify(),
});

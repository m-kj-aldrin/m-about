import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import UnoCss from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCss()],
  // output: "server",
  adapter: netlify(),
});

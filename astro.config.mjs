import { defineConfig } from "astro/config";
import UnoCss from "unocss/astro";

import netlify from "@astrojs/netlify";

export default defineConfig({
  integrations: [UnoCss()],
  adapter: netlify(),
});

import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import customEmbeds from "astro-custom-embeds";
import svelte from "@astrojs/svelte";


import LinkCardEmbed from './src/embeds/link-card/embed'
import YoutubeEmbed from './src/embeds/youtube/embed'



// https://astro.build/config
export default defineConfig({
  site: "https://barebones.superwebthemes.com",
  integrations: [tailwind(), sitemap(),customEmbeds()],
});

integrations: [customEmbeds({
  embeds: [
    YoutubeEmbed,
    LinkCardEmbed,
    
  ]
}), mdx(), sitemap(), tailwind(), svelte()]

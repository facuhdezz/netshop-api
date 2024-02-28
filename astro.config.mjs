import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Otras configuraciones de Astro...
  server: {
    routes: [{
      match: '/api/*',
      serve: () => ({
        // Cambia 'http://localhost:3000' al host y puerto de tu servidor Node.js
        html: `<script type="module" src="http://localhost:3000${new URL(request.url).pathname}"></script>`
      })
    }]
  },
  integrations: [tailwind()]
});
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Required for absolute canonicals + sitemap.
	site: (process.env.PUBLIC_BASE_URL || 'https://example.com').replace(/\/$/, ''),
	output: 'static',
	trailingSlash: 'always',
});

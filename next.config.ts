import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	images: { 
		unoptimized: true,
		formats: ['image/webp']
	},
	reactStrictMode: true,
	experimental: {
		optimizeCss: true
	}
};

export default nextConfig;

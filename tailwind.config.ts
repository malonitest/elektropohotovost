import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "1.25rem",
				lg: "1.5rem"
			},
			screens: {
				lg: "1024px",
				xl: "1200px",
				"2xl": "1200px"
			}
		},
		extend: {
			colors: {
				background: {
					DEFAULT: "#F6F7F9",
					subtle: "#EEF1F5",
					card: "#FFFFFF"
				},
				text: {
					primary: "#0B1220",
					secondary: "#334155",
					muted: "#64748B"
				},
				primary: {
					DEFAULT: "#123B7A",
					hover: "#0F3267",
					ring: "#93C5FD"
				},
				accent: {
					DEFAULT: "#F59E0B",
					hover: "#D97706",
					soft: "#FFF7ED"
				},
				success: {
					DEFAULT: "#16A34A",
					soft: "#ECFDF5"
				},
				warning: {
					DEFAULT: "#F59E0B",
					soft: "#FFF7ED"
				},
				danger: {
					DEFAULT: "#DC2626",
					soft: "#FEF2F2"
				},
				line: "rgba(2, 6, 23, 0.12)"
			},
			fontFamily: {
				sans: [
					"ui-sans-serif",
					"system-ui",
					"-apple-system",
					"Segoe UI",
					"Roboto",
					"Arial",
					"Noto Sans",
					"Liberation Sans",
					"sans-serif"
				]
			},
			borderRadius: {
				xl: "1rem",
				lg: "0.875rem"
			},
			boxShadow: {
				sm: "0 1px 2px rgba(2, 6, 23, 0.08)",
				md: "0 10px 22px rgba(2, 6, 23, 0.10)",
				hover: "0 14px 28px rgba(2, 6, 23, 0.14)"
			},
			transitionDuration: {
				DEFAULT: "180ms"
			}
		}
	},
	plugins: []
} satisfies Config;

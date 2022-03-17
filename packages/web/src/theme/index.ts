import { ThemeConfig } from "@poodle/ui/theme";

export const theme: ThemeConfig = {
	global: {
		styles: {
			html: {
				fontSize: "16px",
			},
			body: {
				color: "text",
			},
		},
	},
	fonts: {
		base: {
			fontFamily: `'Open Sans', sans-serif`,
		},
		sets: {
			h1: {
				fontSize: "2.4rem",
				lineHeight: "150%",
				fontWeight: "bold",
			},
			h2: {
				fontSize: "1.8rem",
				lineHeight: "150%",
				fontWeight: "bold",
			},
			h3: {
				fontSize: "1.2rem",
				lineHeight: "150%",
				fontWeight: "bold",
			},
		},
	},
	layouts: {
		zIndices: {
			header: 1000,
			sidebar: 1100,
		},
	},
};

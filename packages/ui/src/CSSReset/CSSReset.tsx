import React from "react";
import GlobalStyles from "../GlobalStyles";
import { CSSObjectSystem } from "../styled";

const css: CSSObjectSystem = {
	"*::before": {
		boxSizing: "border-box",
	},
	"*::after": {
		boxSizing: "border-box",
	},
	html: {
		WebkitTextSizeAdjust: "100%",
	},
	body: {
		padding: 0,
		margin: 0,
		minHeight: "100vh",
		scrollBehavior: "smooth",
		textRendering: "optimizeSpeed",
		lineHeight: 1.5,
		fontFeatureSettings: "'kern'",
	},
	"body, h1, h2, h3, h4, p, figure, blockquote, dl, dd": {
		margin: 0,
	},
	"h1, h2, h3, h4, h5, h6": {
		fontSize: "inherit",
		fontWeight: "inherit",
	},
	img: { maxWidth: "100%", display: "block" },
	"input, button, textarea, select": { font: "inherit" },
	a: {
		backgroundColor: "transparent",
		color: "inherit",
		textDecoration: "inherit",
	},
	"b, strong": { fontWeight: "bold" },
	"ol, ul": {
		listStyle: "none",
		padding: 0,
		margin: 0,
	},
};

export default function CSSReset() {
	return <GlobalStyles styles={css} />;
}

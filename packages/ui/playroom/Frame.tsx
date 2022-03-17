import React from "react";
import ThemeProvider from "../src/ThemeProvider";
import GlobalStyles from "../src/GlobalStyles";

export default function Frame({ children }: any) {
	return (
		<ThemeProvider>
			<GlobalStyles />
			<div>{children}</div>
		</ThemeProvider>
	);
}

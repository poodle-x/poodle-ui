import React from "react";
import Helmet from "react-helmet";
import ThemeProvider from "@poodle/ui/ThemeProvider";
import CSSReset from "@poodle/ui/CSSReset";
import { theme } from "../theme";

export function Provider({ children }: { children?: React.ReactNode }) {
	return (
		<ThemeProvider theme={theme}>
			<CSSReset />
			<Helmet>
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</Helmet>
			{children}
		</ThemeProvider>
	);
}

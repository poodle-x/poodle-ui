import React from "react";
import { ThemeProvider as BaseThemeProvider } from "@emotion/react";
import { createTheme, getThemeValue } from "../theme";
import { PortalContext } from "../Portal";
import useSafeLayoutEffect from "../hooks/useSafeLayoutEffect";
import CSSReset from "../CSSReset";
import GlobalStyles from "../GlobalStyles";

export interface ThemeProviderProps {
	noDefaultTheme?: boolean;
	theme?: any;
	children?: React.ReactNode;
	disablePortalContext?: boolean;
	withCSSReset?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = (
	props: ThemeProviderProps
) => {
	const [savedPortal, setSavedPortal] = React.useState<
		HTMLElement | undefined
	>();
	const {
		theme,
		children,
		noDefaultTheme,
		disablePortalContext,
		withCSSReset,
	} = props;

	const memoTheme = React.useMemo(() => {
		if (noDefaultTheme && theme) {
			return theme;
		}

		return createTheme(theme);
	}, [theme, noDefaultTheme]);

	const globalStyles = React.useMemo(() => {
		if (theme?.global?.styles) {
			return getThemeValue(
				{
					memoTheme,
				},
				theme.global.styles,
				{}
			);
		}
	}, [memoTheme, theme?.global?.styles]);

	useSafeLayoutEffect(() => {
		if (!disablePortalContext) {
			const currentPortal = document.body.querySelector(
				'*[data-portal="poodle-ui"]'
			);
			if (currentPortal) {
				setSavedPortal(currentPortal as HTMLElement);
			} else {
				const newPortal = document.createElement("div");
				newPortal.setAttribute("data-portal", "poodle-ui");
				document.body.appendChild(newPortal);
				setSavedPortal(newPortal);
			}
		}
	}, [disablePortalContext]);

	useSafeLayoutEffect(() => {
		if (disablePortalContext && savedPortal) {
			document.body.removeChild(savedPortal);
		}
	}, [disablePortalContext, savedPortal]);

	if (disablePortalContext) {
		return <BaseThemeProvider theme={memoTheme}>{children}</BaseThemeProvider>;
	}

	return (
		<PortalContext.Provider
			value={{
				defaultMount: savedPortal,
			}}
		>
			<BaseThemeProvider theme={memoTheme}>
				{withCSSReset && <CSSReset />}
				{globalStyles && <GlobalStyles styles={globalStyles} />}
				{children}
			</BaseThemeProvider>
		</PortalContext.Provider>
	);
};

ThemeProvider.displayName = "PoodleThemeProvider";

export default ThemeProvider;

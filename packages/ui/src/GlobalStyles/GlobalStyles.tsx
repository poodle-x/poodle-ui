import { css, Global } from "@emotion/react";
import React from "react";
import { CSSObjectSystem } from "../styled/";

import {
	getFontBase,
	getThemeValue,
	system,
	ThemeConfig,
	useTheme,
} from "../theme";

export interface GlobalStylesProps {
	theme?: ThemeConfig;
	styles?: CSSObjectSystem;
}

function GlobalStyles(props: GlobalStylesProps) {
	const { theme } = useTheme();

	const { styles } = props;

	const globalStyles = React.useMemo(() => {
		return getThemeValue(
			{
				theme,
			},
			theme?.global?.styles,
			{}
		);
	}, [theme]);

	const base = React.useMemo(() => {
		return system(
			{
				body: {
					padding: 0,
					margin: 0,
					bg: "bg",
					...getFontBase()({
						theme,
					}),
				},
			},
			{
				sendProps: {
					styles,
					theme,
				},
			}
		);
	}, [styles, theme]);

	const extend = React.useMemo(() => {
		return system(
			{
				...globalStyles,
				...styles,
			},
			{
				sendProps: {
					styles,
					theme,
				},
			}
		);
	}, [globalStyles, styles, theme]);

	return <Global styles={css(base, extend as any)} />;
}

export default GlobalStyles;

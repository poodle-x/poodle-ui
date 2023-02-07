import { css, Global } from "@emotion/react";
import React from "react";
import { CSSObjectSystem } from "../styled/";

import { getFontBase, system, ThemeConfig, useTheme } from "../theme";

export interface GlobalStylesProps {
	theme?: ThemeConfig;
	styles?: CSSObjectSystem;
}

function GlobalStyles(props: GlobalStylesProps) {
	const { theme } = useTheme();

	const { styles } = props;

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
				...styles,
			},
			{
				sendProps: {
					styles,
					theme,
				},
			}
		);
	}, [styles, theme]);

	return <Global styles={css(base, extend as any)} />;
}

export default GlobalStyles;

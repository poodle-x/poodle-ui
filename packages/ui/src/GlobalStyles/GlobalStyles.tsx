import React from "react";
import { css, Global } from "@emotion/react";

import { useTheme, ThemeConfig, getThemeValue } from "../theme";
import { CSSObjectSystem, cssSystem } from "../styled/";
import { getFontBase } from "@poodle/system";

export interface GlobalStylesProps {
	theme?: ThemeConfig;
	styles?: CSSObjectSystem;
}

function GlobalStyles(props: GlobalStylesProps) {
	const { theme } = useTheme();

	const { styles } = props;

	const sProps = {
		...props,
		theme,
	};

	const globalStyles = getThemeValue(sProps, theme?.global?.styles, {});

	const base = cssSystem({
		props: sProps,
		base: [
			{
				body: {
					padding: 0,
					margin: 0,
					bg: "bg",
					...getFontBase()(sProps),
				},
			},
			styles || {},
		],
	});

	const extend = cssSystem({
		props: sProps,
		base: [
			{
				...globalStyles,
			},
		],
	});
	return <Global styles={css(base, extend)} />;
}

export default GlobalStyles;

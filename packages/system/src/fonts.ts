import * as CSS from "csstype";

import {
	ThemeValue,
	SystemConfigTransform,
	SystemThemeConfig,
	getThemeValue,
	ResponsiveProp,
	getScaling,
	SystemConfigList,
} from "./";

export interface FontsThemeConfig {
	scale?: ThemeValue<string | number>;
	autoLoadFonts?: ThemeValue<Array<string>>;
	fontUrls?: {
		[key: string]: ThemeValue<string>;
	};
	families?: {
		[key: string]: ThemeValue<string>;
	};
	base?: ThemeValue<{ [key: string]: any }>;
	weights?: {
		[key: string]: ThemeValue<number | string>;
	};
	sizeSets?: {
		[key: string]: ThemeValue<string | number>;
	};
	sets?: {
		[key: string]: ThemeValue<any>;
	};
}

export function getFontUrl(key: ThemeValue<string>) {
	return (props: { [key: string]: any; theme?: SystemThemeConfig }) => {
		const { theme } = props;
		const calcKey = getThemeValue(props, key, "");
		return getThemeValue<string>(props, theme?.fonts?.fontUrls?.[calcKey], "");
	};
}

export function getAutoLoadFontUrls(fullUrl?: boolean) {
	return (props: { [key: string]: any; theme?: SystemThemeConfig }) => {
		const { theme } = props;
		const autoFonts = getThemeValue<string[]>(
			props,
			theme?.fonts?.autoLoadFonts,
			[]
		);
		if (!fullUrl) {
			return autoFonts;
		}
		return autoFonts.map((font) => {
			const fullUrlPath = getThemeValue(
				props,
				theme?.fonts?.fontUrls?.[font],
				""
			);
			if (fullUrlPath) {
				return fullUrlPath;
			}
			return font;
		});
	};
}

export function getFontBase() {
	return (props: { [key: string]: any; theme?: SystemThemeConfig }) => {
		const { theme } = props;
		return getThemeValue<undefined | { [key: string]: any }>(
			props,
			theme?.fonts?.base,
			undefined
		);
	};
}

export function getFontWeight(weight: ThemeValue<number | string>) {
	return (props: { [key: string]: any; theme?: SystemThemeConfig }) => {
		const { theme } = props;
		const calcWeight = getThemeValue(props, weight, "");
		return getThemeValue<number | string>(
			props,
			theme?.fonts?.weights?.[calcWeight],
			calcWeight
		);
	};
}

export function getFontFamily(family: ThemeValue<string>) {
	return (props: { [key: string]: any; theme?: SystemThemeConfig }) => {
		const { theme } = props;
		const calcFamily = getThemeValue(props, family, "");
		return getThemeValue<string>(
			props,
			theme?.fonts?.families?.[calcFamily],
			calcFamily
		);
	};
}

export const fontsTransform: SystemConfigTransform = (props, value, key) => {
	switch (key) {
		case "fontFamily": {
			return getFontFamily(value)(props);
		}
		case "fontWeight": {
			return getFontWeight(value)(props);
		}
		case "fontSize": {
			return getFontSize(value)(props);
		}
		case "textStyle": {
			return getFontSet(value)(props);
		}
	}
	return getThemeValue<string | number>(props, value, "");
};

export function getFontSet(set: ThemeValue<string>) {
	return (props: { [key: string]: any; theme?: SystemThemeConfig }) => {
		const { theme } = props;
		const calcSet = getThemeValue(props, set, "");

		const setx = getThemeValue<undefined | { [key: string]: any }>(
			props,
			theme?.fonts?.sets?.[calcSet],
			undefined
		);

		if (!setx) {
			return;
		}

		return Object.keys(setx).reduce((cu, k) => {
			let value: any = setx[k];

			switch (k) {
				case "fontFamily": {
					value = getFontFamily(value)(props);
					break;
				}
				case "fontWeight": {
					value = getFontWeight(value)(props);
					break;
				}
				case "fontSize": {
					value = getFontSize(value)(props);
					break;
				}
				default: {
					value = getThemeValue<string | number>(props, value, "");
					break;
				}
			}

			return {
				...cu,
				[k]: value,
			};
		}, {});
	};
}

export function getFontSize(value: ThemeValue<string | number>) {
	return (props: { [key: string]: any; theme?: SystemThemeConfig }) => {
		const { theme } = props;
		const calcScale = getThemeValue<string | number>(
			props,
			theme?.fonts?.scale,
			0
		);

		return getScaling({
			props,
			value,
			scale: calcScale,
			sets: theme?.fonts?.sizeSets,
		});
	};
}

export interface FontsProps {
	/**
	 * The CSS `line-height` property
	 */
	lineHeight?: ResponsiveProp<CSS.Property.LineHeight>;
	/**
	 * The CSS `font-family` property
	 */
	fontFamily?: ResponsiveProp<CSS.Property.FontFamily | string>;
	/**
	 * The CSS `text-align` property
	 */
	textAlign?: ResponsiveProp<CSS.Property.TextAlign>;
	/**
	 * The CSS `font-weight` property
	 */
	fontWeight?: ResponsiveProp<CSS.Property.FontWeight | string>;
	/**
	 * The CSS `letter-spacing` property
	 */
	letterSpacing?: ResponsiveProp<CSS.Property.LetterSpacing>;
	/**
	 * The CSS `font-size` property
	 */
	fontSize?: ResponsiveProp<CSS.Property.FontSize>;
	/**
	 * The CSS `font-style` property
	 */
	fontStyle?: ResponsiveProp<CSS.Property.FontStyle>;
	/**
	 * The CSS `text-transform` property
	 */
	textTransform?: ResponsiveProp<CSS.Property.TextTransform>;
	/**
	 * The CSS `text-decoration` property
	 */
	textDecoration?: ResponsiveProp<CSS.Property.TextDecoration>;
	/**
	 * The CSS `text-overflow` property
	 */
	textOverflow?: ResponsiveProp<CSS.Property.TextOverflow>;
	/**
	 * The CSS `white-space` property
	 */
	whiteSpace?: ResponsiveProp<CSS.Property.WhiteSpace>;
	/**
	 * The CSS `word-break` property
	 */
	wordBreak?: ResponsiveProp<CSS.Property.WordBreak>;
	/**
	 * The CSS `overflow-wrap` property
	 */
	overflowWrap?: ResponsiveProp<CSS.Property.OverflowWrap>;
	/**
	 * Get CSS from theme.fonts.sets
	 */
	textStyle?: ResponsiveProp<string>;
}

export const fontsSystem: SystemConfigList = {
	lineHeight: true,
	fontFamily: {
		properties: ["fontFamily"],
		transform: fontsTransform,
	},
	textAlign: true,
	fontWeight: {
		properties: ["fontWeight"],
		transform: fontsTransform,
	},
	letterSpacing: true,
	fontSize: {
		properties: ["fontSize"],
		transform: fontsTransform,
	},
	fontStyle: true,
	textTransform: true,
	textDecoration: true,
	textOverflow: true,
	whiteSpace: true,
	wordBreak: true,
	overflowWrap: true,
	textStyle: {
		transform: fontsTransform,
	},
};

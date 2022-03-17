import {
	getThemeValue,
	ResponsiveProp,
	SystemConfig,
	SystemConfigTransform,
	ThemeValue,
} from "./";
import * as CSS from "csstype";

export interface ShadowThemeConfig {
	textShadowSets?: {
		[k: string]: ThemeValue<number | string>;
	};
	boxShadowSets?: {
		[k: string]: ThemeValue<number | string>;
	};
}

export interface ShadowProps {
	/**
	 * The CSS `box-shadow` property
	 */
	boxShadow?: ResponsiveProp<CSS.Property.BoxShadow | string | number>;
	/**
	 * The CSS `text-shadow` property
	 */
	textShadow?: ResponsiveProp<CSS.Property.TextShadow | string | number>;
}

export function getBoxShadow(value: ThemeValue<string>) {
	return (props: {
		[key: string]: any;
		theme?: { shadows?: ShadowThemeConfig };
	}) => {
		const { theme } = props;

		const calBoxShadow = getThemeValue<string>(props, value, "");

		const t = theme?.shadows?.boxShadowSets?.[calBoxShadow];

		if (t) {
			return getThemeValue(props, t, "");
		}

		return calBoxShadow;
	};
}

export function getTextShadow(value: ThemeValue<string>) {
	return (props: {
		[key: string]: any;
		theme?: { shadows?: ShadowThemeConfig };
	}) => {
		const { theme } = props;

		const calBoxShadow = getThemeValue<string>(props, value, "");

		const t = theme?.shadows?.textShadowSets?.[calBoxShadow];

		if (t) {
			return getThemeValue(props, t, "");
		}

		return calBoxShadow;
	};
}

export const transformBoxShadow: SystemConfigTransform = (
	props: { [key: string]: any },
	value: ThemeValue<string>
) => {
	return getBoxShadow(value)(props);
};

export const transformTextShadow: SystemConfigTransform = (
	props: { [key: string]: any },
	value: ThemeValue<string>
) => {
	return getTextShadow(value)(props);
};

export const shadowSystem: { [key: string]: SystemConfig } = {
	textShadow: {
		properties: ["textShadow"],
		transform: transformTextShadow,
	},
	boxShadow: {
		properties: ["boxShadow"],
		transform: transformBoxShadow,
	},
};

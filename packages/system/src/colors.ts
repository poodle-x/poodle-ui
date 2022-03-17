import * as CSS from "csstype";
import {
	ThemeValue,
	SystemThemeConfig,
	getThemeValue,
	ResponsiveProp,
	getMode,
	SystemConfigList,
} from "./";

export type ColorValue =
	| string
	| {
			[key: string]: string;
	  };

export interface ColorsThemeConfig {
	sets?: {
		[key: string]: ColorValue;
	};
	modes?: {
		[key: string]: {
			[key: string]: ColorValue;
		};
	};
}

export function transformColor(
	props: { [key: string]: any },
	value: ThemeValue<string>
) {
	return getColor(value)(props);
}

function getColorValue(
	sets: {
		[key: string]: ColorValue;
	},
	value: string
) {
	let base = "base";

	let key = value;

	if (value.indexOf(".") !== -1) {
		const parts = value.split(".");
		base = parts[1] || "base";
		key = parts[0];
	}

	const colorValue = sets[key] || {};

	if (typeof colorValue === "string") {
		return colorValue;
	}

	return colorValue[base] || "";
}

export function getColor(value: ThemeValue<string>) {
	return (props: { [key: string]: any; theme?: SystemThemeConfig }) => {
		const { theme } = props;

		const calcValue = getThemeValue<string>(props, value, "");

		const mode = getMode(props);

		const color = getColorValue(theme?.colors?.sets || {}, calcValue);

		const colorMode = getColorValue(
			theme?.colors?.modes?.[mode] || {},
			calcValue
		);

		return colorMode || color || calcValue;
	};
}

export interface ColorsProps {
	/**
	 * The CSS `background` property
	 */
	bg?: ResponsiveProp<CSS.Property.Background>;
	/**
	 * The CSS `background` property
	 */
	background?: ResponsiveProp<CSS.Property.Background>;
	/**
	 * The CSS `background-color` property
	 */
	bgc?: ResponsiveProp<CSS.Property.BackgroundColor>;
	/**
	 * The CSS `background-color` property
	 */
	backGroundColor?: ResponsiveProp<CSS.Property.BackgroundColor>;
	/**
	 * The CSS `color` property
	 */
	color?: ResponsiveProp<string | CSS.Property.Color>;
	/**
	 * The CSS `fill` property
	 */
	fill?: ResponsiveProp<CSS.Property.Fill>;
	/**
	 * The CSS `opacity` property
	 */
	opacity?: ResponsiveProp<CSS.Property.Fill>;
}

export const colorsSystem: SystemConfigList = {
	"bg,background": {
		properties: ["background"],
		transform: transformColor,
	},
	"bgc,backgroundColor": {
		properties: ["backgroundColor"],
		transform: transformColor,
	},
	color: {
		properties: ["color"],
		transform: transformColor,
	},
	fill: {
		properties: ["fill"],
		transform: transformColor,
	},
	opacity: true,
};

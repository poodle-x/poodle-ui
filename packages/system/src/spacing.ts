import * as CSS from "csstype";
import {
	ThemeValue,
	SystemThemeConfig,
	getThemeValue,
	ResponsiveProp,
	getScaling,
} from "./";
import { SystemConfig } from "./system";

export interface SpacingThemeConfig {
	scale?: ThemeValue<string | number>;
	sets?: {
		[k: string]: ThemeValue<number | string>;
	};
}

export function getSpacing(
	value: ThemeValue<number | string>,
	options: {
		/**
		 * If set to true and the scaling result return is number, this option will add a unit to the result. Eg: 5 -> 5px.
		 * The unit default is pixel and can be replace by `unit` option
		 */
		withUnit?: boolean;
		unit?: string;
	} = {}
) {
	return (props: { [key: string]: any; theme?: SystemThemeConfig }) => {
		const { theme } = props;

		const { withUnit = false, unit = "px" } = options;

		const calcScale = getThemeValue<string | number>(
			props,
			theme?.spacing?.scale,
			0
		);

		const scalingValue = getScaling({
			props,
			value,
			scale: calcScale,
			sets: theme?.spacing?.sets,
		});

		if (withUnit && typeof scalingValue === "number") {
			return `${scalingValue}${unit}`;
		}

		return scalingValue;
	};
}

export function transformSpacing(
	props: { [key: string]: any },
	value: ThemeValue<number | string>
) {
	return getSpacing(value)(props);
}

export interface SpacingProps {
	/**
	 * The CSS `padding` property
	 */
	p?: ResponsiveProp<CSS.Property.Padding | number>;
	/**
	 * The CSS `padding` property
	 */
	padding?: ResponsiveProp<CSS.Property.Padding | number>;
	/**
	 * The CSS `padding-top` property
	 */
	pt?: ResponsiveProp<CSS.Property.PaddingTop | number>;
	/**
	 * The CSS `padding-top` property
	 */
	paddingTop?: ResponsiveProp<CSS.Property.PaddingTop | number>;
	/**
	 * The CSS `padding-right` property
	 */
	pr?: ResponsiveProp<CSS.Property.PaddingRight | number>;
	/**
	 * The CSS `padding-right` property
	 */
	paddingRight?: ResponsiveProp<CSS.Property.PaddingRight | number>;
	/**
	 * The CSS `padding-bottom` property
	 */
	pb?: ResponsiveProp<CSS.Property.PaddingBottom | number>;
	/**
	 * The CSS `padding-bottom` property
	 */
	paddingBottom?: ResponsiveProp<CSS.Property.PaddingBottom | number>;
	/**
	 * The CSS `padding-left` property
	 */
	pl?: ResponsiveProp<CSS.Property.PaddingLeft | number>;
	/**
	 * The CSS `padding-left` property
	 */
	paddingLeft?: ResponsiveProp<CSS.Property.PaddingLeft | number>;
	/**
	 * The CSS `padding-top` and `padding-bottom` property
	 */
	px?: ResponsiveProp<CSS.Property.Padding | number>;
	/**
	 * The CSS `padding-top` and `padding-bottom` property
	 */
	paddingX?: ResponsiveProp<CSS.Property.Padding | number>;
	/**
	 * The CSS `padding-left` and `padding-right` property
	 */
	py?: ResponsiveProp<CSS.Property.Padding | number>;
	/**
	 * The CSS `padding-left` and `padding-right` property
	 */
	paddingY?: ResponsiveProp<CSS.Property.Padding | number>;
	/**
	 * The CSS `margin` property
	 */
	m?: ResponsiveProp<CSS.Property.Margin | number>;
	/**
	 * The CSS `margin` property
	 */
	margin?: ResponsiveProp<CSS.Property.Margin | number>;
	/**
	 * The CSS `margin-top` property
	 */
	mt?: ResponsiveProp<CSS.Property.MarginTop | number>;
	/**
	 * The CSS `margin-top` property
	 */
	marginTop?: ResponsiveProp<CSS.Property.MarginTop | number>;
	/**
	 * The CSS `margin-right` property
	 */
	mr?: ResponsiveProp<CSS.Property.MarginRight | number>;
	/**
	 * The CSS `margin-right` property
	 */
	marginRight?: ResponsiveProp<CSS.Property.MarginRight | number>;
	/**
	 * The CSS `margin-bottom` property
	 */
	mb?: ResponsiveProp<CSS.Property.MarginBottom | number>;
	/**
	 * The CSS `margin` property
	 */
	marginBottom?: ResponsiveProp<CSS.Property.MarginBottom | number>;
	/**
	 * The CSS `margin-left` property
	 */
	ml?: ResponsiveProp<CSS.Property.MarginLeft | number>;
	/**
	 * The CSS `margin-left` property
	 */
	marginLeft?: ResponsiveProp<CSS.Property.MarginLeft | number>;
	/**
	 * The CSS `margin-top` and `margin-bottom` property
	 */
	mx?: ResponsiveProp<CSS.Property.Margin | number>;
	/**
	 * The CSS `margin-top` and `margin-bottom` property
	 */
	marginX?: ResponsiveProp<CSS.Property.Margin | number>;
	/**
	 * The CSS `margin-top` and `marin-bottom` property
	 */
	my?: ResponsiveProp<CSS.Property.Margin | number>;
	/**
	 * The CSS `margin-top` and `marin-bottom` property
	 */
	marginY?: ResponsiveProp<CSS.Property.Margin | number>;
}

export const spacingSystem: { [key: string]: SystemConfig } = {
	"p,padding": {
		properties: ["padding"],
		transform: transformSpacing,
	},
	"pt,paddingTop": {
		properties: ["paddingTop"],
		transform: transformSpacing,
	},
	"pr,paddingRight": {
		properties: ["paddingRight"],
		transform: transformSpacing,
	},
	"pb,paddingBottom": {
		properties: ["paddingBottom"],
		transform: transformSpacing,
	},
	"pl,paddingLeft": {
		properties: ["paddingLeft"],
		transform: transformSpacing,
	},
	"px,paddingX": {
		properties: ["paddingLeft", "paddingRight"],
		transform: transformSpacing,
	},
	"py,paddingY": {
		properties: ["paddingTop", "paddingBottom"],
		transform: transformSpacing,
	},
	"m,margin": {
		properties: ["margin"],
		transform: transformSpacing,
	},
	"mt,marginTop": {
		properties: ["marginTop"],
		transform: transformSpacing,
	},
	"mr,marginRight": {
		properties: ["marginRight"],
		transform: transformSpacing,
	},
	"mb,marginBottom": {
		properties: ["marginBottom"],
		transform: transformSpacing,
	},
	"ml,marginLeft": {
		properties: ["marginLeft"],
		transform: transformSpacing,
	},
	"mx,marginX": {
		properties: ["marginLeft", "marginRight"],
		transform: transformSpacing,
	},
	"my,marginY": {
		properties: ["marginTop", "marginBottom"],
		transform: transformSpacing,
	},
};

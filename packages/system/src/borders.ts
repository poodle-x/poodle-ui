import {
	getColor,
	getSpacing,
	getThemeValue,
	ResponsiveProp,
	SystemConfigList,
	SystemConfigTransform,
	ThemeValue,
	transformColor,
	transformSpacing,
} from "./";
import * as CSS from "csstype";

export interface BorderSetTheme {
	color?: ThemeValue<string>;
	width?: ThemeValue<string | number>;
	style?: ThemeValue<CSS.Property.BorderStyle>;
}

export interface BordersThemeConfig {
	sets?: {
		[key: string]: BorderSetTheme;
	};
	radius?: {
		[key: string]: ThemeValue<string | number>;
	};
}

export function getBorder(value: ThemeValue<string>) {
	return (props: {
		[key: string]: any;
		theme?: { borders?: BordersThemeConfig };
	}) => {
		const { theme } = props;

		const calcBorder = getThemeValue<string>(props, value, "");

		const t = theme?.borders?.sets?.[calcBorder];

		const width = t?.width
			? getSpacing(t?.width, { withUnit: true })({
					theme: theme as any,
			  })
			: "";

		if (t) {
			return `${width} ${t.style} ${
				t.color
					? getColor(t.color)({
							theme: theme as any,
					  })
					: ""
			}`;
		}

		return calcBorder;
	};
}

export function getRadius(value: ThemeValue<string | number>) {
	return (props: {
		[key: string]: any;
		theme?: { borders?: BordersThemeConfig };
	}) => {
		const { theme } = props;

		const calcValue = getThemeValue<string | number>(props, value, "");

		const setRadius = theme?.borders?.radius?.[calcValue];

		return setRadius
			? getThemeValue<string | number>(props, setRadius, "")
			: calcValue;
	};
}

export const transformBorder: SystemConfigTransform = (
	props: { [key: string]: any },
	value: ThemeValue<string>
) => {
	return getBorder(value)(props);
};

export const transformBorderRadius: SystemConfigTransform = (
	props: { [key: string]: any },
	value: ThemeValue<string | number>
) => {
	return getRadius(value)(props);
};

export interface BordersProps {
	/**
	 * The CSS `border` property
	 */
	border?: ResponsiveProp<CSS.Property.Border | string>;
	/**
	 * The CSS `border-top` property
	 */
	borderTop?: ResponsiveProp<CSS.Property.BorderTop | string>;
	/**
	 * The CSS `border-right` property
	 */
	borderRight?: ResponsiveProp<CSS.Property.BorderRight | string>;
	/**
	 * The CSS `border-bottom` property
	 */
	borderBottom?: ResponsiveProp<CSS.Property.BorderBottom | string>;
	/**
	 * The CSS `border-left` property
	 */
	borderLeft?: ResponsiveProp<CSS.Property.BorderLeft | string>;
	/**
	 * The CSS `border-color` property
	 */
	borderColor?: ResponsiveProp<CSS.Property.BorderColor | string>;
	/**
	 * The CSS `border-top-color` property
	 */
	borderTopColor?: ResponsiveProp<CSS.Property.BorderTopColor | string>;
	/**
	 * The CSS `border-right-color` property
	 */
	borderRightColor?: ResponsiveProp<CSS.Property.BorderRightColor | string>;
	/**
	 * The CSS `border-bottom-color` property
	 */
	borderBottomColor?: ResponsiveProp<CSS.Property.BorderBottomColor | string>;
	/**
	 * The CSS `border-left-color` property
	 */
	borderLeftColor?: ResponsiveProp<CSS.Property.BorderLeftColor | string>;
	/**
	 * The CSS `border-width` property
	 */
	borderWidth?: ResponsiveProp<CSS.Property.BorderWidth | number>;
	/**
	 * The CSS `border-top-width` property
	 */
	borderTopWidth?: ResponsiveProp<CSS.Property.BorderTopWidth | number>;
	/**
	 * The CSS `border-right-width` property
	 */
	borderRightWidth?: ResponsiveProp<CSS.Property.BorderRightWidth | number>;
	/**
	 * The CSS `border-bottom-width` property
	 */
	borderBottomWidth?: ResponsiveProp<CSS.Property.BorderBottomWidth | number>;
	/**
	 * The CSS `border-left-width` property
	 */
	borderLeftWidth?: ResponsiveProp<CSS.Property.BorderLeftWidth | number>;
	/**
	 * The CSS `border-style` property
	 */
	borderStyle?: ResponsiveProp<CSS.Property.BorderStyle>;
	/**
	 * The CSS `border-top-style` property
	 */
	borderTopStyle?: ResponsiveProp<CSS.Property.BorderTopStyle>;
	/**
	 * The CSS `border-right-style` property
	 */
	borderRightStyle?: ResponsiveProp<CSS.Property.BorderRightStyle>;
	/**
	 * The CSS `border-bottom-style` property
	 */
	borderBottomStyle?: ResponsiveProp<CSS.Property.BorderBottomStyle>;
	/**
	 * The CSS `border-left-style` property
	 */
	borderLeftStyle?: ResponsiveProp<CSS.Property.BorderLeftStyle>;
	/**
	 * The CSS `border-left` and `border-right` property
	 */
	borderX?: ResponsiveProp<CSS.Property.BorderLeft | CSS.Property.BorderRight>;
	/**
	 * The CSS `border-top` and `border-bottom` property
	 */
	borderY?: ResponsiveProp<CSS.Property.BorderBottom | CSS.Property.BorderTop>;
	/**
	 * The CSS `border-radius` property
	 */
	borderRadius?: ResponsiveProp<CSS.Property.BorderRadius>;
	/**
	 * The CSS `border-top-left-radius` property
	 */
	borderTopLeftRadius?: ResponsiveProp<CSS.Property.BorderTopLeftRadius>;
	/**
	 * The CSS `border-top-right-radius` property
	 */
	borderTopRightRadius?: ResponsiveProp<CSS.Property.BorderTopRightRadius>;
	/**
	 * The CSS `border-bottom-left-radius` property
	 */
	borderBottomLeftRadius?: ResponsiveProp<CSS.Property.BorderBottomLeftRadius>;
	/**
	 * The CSS `border-bottom-right-radius` property
	 */
	borderBottomRightRadius?: ResponsiveProp<CSS.Property.BorderBottomRightRadius>;
	/**
	 * The CSS `border-top-left-radius` and `border-top-right-radius` property
	 */
	borderTopRadius?: ResponsiveProp<
		CSS.Property.BorderTopLeftRadius | CSS.Property.BorderTopRightRadius
	>;
	/**
	 * The CSS `border-top-right-radius` and `border-bottom-right-radius` property
	 */
	borderRightRadius?: ResponsiveProp<
		CSS.Property.BorderTopRightRadius | CSS.Property.BorderBottomRightRadius
	>;
	/**
	 * The CSS `border-top-left-radius` and `border-bottom-left-radius` property
	 */
	borderLeftRadius?: ResponsiveProp<
		CSS.Property.BorderTopLeftRadius | CSS.Property.BorderBottomLeftRadius
	>;
	/**
	 * The CSS `border-bottom-left-radius` and `border-bottom-right-radius` property
	 */
	borderBottomRadius?: ResponsiveProp<
		CSS.Property.BorderBottomRightRadius | CSS.Property.BorderBottomLeftRadius
	>;
	/**
	 * The CSS `outline` property
	 */
	outline?: ResponsiveProp<CSS.Property.Outline>;
	/**
	 * The CSS `outline-width` property
	 */
	outlineWidth?: ResponsiveProp<CSS.Property.Outline>;
	/**
	 * The CSS `outline-style` property
	 */
	outlineStyle?: ResponsiveProp<CSS.Property.Outline>;
	/**
	 * The CSS `outline-color` property
	 */
	outlineColor?: ResponsiveProp<CSS.Property.Outline>;
}

export const bordersSystem: SystemConfigList = {
	border: {
		properties: ["border"],
		transform: transformBorder,
	},
	borderTop: {
		properties: ["borderTop"],
		transform: transformBorder,
	},
	borderRight: {
		properties: ["borderRight"],
		transform: transformBorder,
	},
	borderBottom: {
		properties: ["borderBottom"],
		transform: transformBorder,
	},
	borderLeft: {
		properties: ["borderLeft"],
		transform: transformBorder,
	},
	borderColor: {
		properties: ["borderColor"],
		transform: transformColor,
	},
	borderTopColor: {
		properties: ["borderTopColor"],
		transform: transformColor,
	},
	borderRightColor: {
		properties: ["borderRightColor"],
		transform: transformColor,
	},
	borderBottomColor: {
		properties: ["borderBottomColor"],
		transform: transformColor,
	},
	borderLeftColor: {
		properties: ["borderLeftColor"],
		transform: transformColor,
	},
	borderWidth: {
		properties: ["borderWidth"],
		transform: transformSpacing,
	},
	borderTopWidth: {
		properties: ["borderTopWidth"],
		transform: transformSpacing,
	},
	borderRightWidth: {
		properties: ["borderRightWidth"],
		transform: transformSpacing,
	},
	borderBottomWidth: {
		properties: ["borderBottomWidth"],
		transform: transformSpacing,
	},
	borderLeftWidth: {
		properties: ["borderLeftWidth"],
		transform: transformSpacing,
	},
	borderStyle: true,
	borderTopStyle: true,
	borderRightStyle: true,
	borderBottomStyle: true,
	borderLeftStyle: true,
	borderX: {
		properties: ["borderLeft", "borderRight"],
		transform: transformBorder,
	},
	borderY: {
		properties: ["borderTop", "borderBottom"],
		transform: transformBorder,
	},
	borderRadius: {
		properties: ["borderRadius"],
		transform: transformBorderRadius,
	},
	borderTopLeftRadius: {
		properties: ["borderTopLeftRadius"],
		transform: transformBorderRadius,
	},
	borderTopRightRadius: {
		properties: ["borderTopRightRadius"],
		transform: transformBorderRadius,
	},
	borderBottomRightRadius: {
		properties: ["borderBottomRightRadius"],
		transform: transformBorderRadius,
	},
	borderBottomLeftRadius: {
		properties: ["borderBottomLeftRadius"],
		transform: transformBorderRadius,
	},
	borderTopRadius: {
		properties: ["borderTopLeftRadius", "borderTopRightRadius"],
		transform: transformBorderRadius,
	},
	borderRightRadius: {
		properties: ["borderTopRightRadius", "borderBottomRightRadius"],
		transform: transformBorderRadius,
	},
	borderBottomRadius: {
		properties: ["borderBottomLeftRadius", "borderBottomRightRadius"],
		transform: transformBorderRadius,
	},
	borderLeftRadius: {
		properties: ["borderTopLeftRadius", "borderBottomLeftRadius"],
		transform: transformBorderRadius,
	},
	outline: true,
	/**
	 * The CSS `outline-width` property
	 */
	outlineWidth: true,
	/**
	 * The CSS `outline-style` property
	 */
	outlineStyle: true,
	/**
	 * The CSS `outline-color` property
	 */
	outlineColor: {
		properties: ["outlineColor"],
		transform: transformColor,
	},
};

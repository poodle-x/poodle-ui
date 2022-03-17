import * as CSS from "csstype";
import {
	getThemeValue,
	ResponsiveProp,
	SystemConfigList,
	SystemThemeConfig,
	ThemeValue,
	transformSpacing,
} from "./";

export interface LayoutsThemeConfig {
	zIndices?: {
		[key: string]: ThemeValue<number | string>;
	};
}

export function getzIndex(value: ThemeValue<number | string>) {
	return (props: { [key: string]: any; theme?: SystemThemeConfig }) => {
		const { theme } = props;

		const calcValue = getThemeValue<number | string>(props, value, "auto");

		const themeValue = theme?.layouts?.zIndices?.[calcValue];

		return themeValue
			? getThemeValue<number | string | undefined>(props, themeValue, undefined)
			: calcValue;
	};
}

export function transformzIndex(
	props: { [key: string]: any },
	value: ThemeValue<number | string>
) {
	return getzIndex(value)(props);
}

export interface LayoutProps {
	/**
	 * The CSS `display` property
	 */
	display?: ResponsiveProp<CSS.Property.Display>;
	/**
	 * The CSS `width` property
	 */
	width?: ResponsiveProp<CSS.Property.Width | string | number>;
	/**
	 * The CSS `min-width` property
	 */
	minWidth?: ResponsiveProp<CSS.Property.MinWidth | string | number>;
	/**
	 * The CSS `max-width` property
	 */
	maxWidth?: ResponsiveProp<CSS.Property.MaxWidth | string | number>;
	/**
	 * The CSS `width` property
	 */
	w?: ResponsiveProp<CSS.Property.Width | string | number>;
	/**
	 * The CSS `height` property
	 */
	height?: ResponsiveProp<CSS.Property.Height | string | number>;
	/**
	 * The CSS `height` property
	 */
	h?: ResponsiveProp<CSS.Property.Height | string | number>;
	/**
	 * The CSS `min-height` property
	 */
	minHeight?: ResponsiveProp<CSS.Property.MinHeight | string | number>;
	/**
	 * The CSS `max-height` property
	 */
	maxHeight?: ResponsiveProp<CSS.Property.MaxHeight | string | number>;
	/**
	 * The CSS `height` and `width` property
	 */
	size?: ResponsiveProp<CSS.Property.Width | string | number>;
	/**
	 * The CSS `position` property
	 */
	position?: ResponsiveProp<CSS.Property.Position>;
	/**
	 * The CSS `top` property
	 */
	top?: ResponsiveProp<CSS.Property.Top | string | number>;
	/**
	 * The CSS `right` property
	 */
	right?: ResponsiveProp<CSS.Property.Right | string | number>;
	/**
	 * The CSS `bottom` property
	 */
	bottom?: ResponsiveProp<CSS.Property.Bottom | string | number>;
	/**
	 * The CSS `left` property
	 */
	left?: ResponsiveProp<CSS.Property.Left | string | number>;
	/**
	 * The CSS `z-index` property
	 */
	visibility?: ResponsiveProp<CSS.Property.Visibility>;
	/**
	 * The CSS `z-index` property
	 */
	zIndex?: ResponsiveProp<CSS.Property.ZIndex | string | number>;
	/**
	 * The CSS `overflow` property
	 */
	overflow?: ResponsiveProp<CSS.Property.Overflow>;
	/**
	 * The CSS `overflow-x` property
	 */
	overflowX?: ResponsiveProp<CSS.Property.OverflowX>;
	/**
	 * The CSS `overflow-y` property
	 */
	overflowY?: ResponsiveProp<CSS.Property.OverflowY>;
}

export const layoutSystem: SystemConfigList = {
	"w,width": {
		properties: ["width"],
		transform: transformSpacing,
	},
	minWidth: {
		properties: ["minWidth"],
		transform: transformSpacing,
	},
	maxWidth: {
		properties: ["maxWidth"],
		transform: transformSpacing,
	},
	"h,height": {
		properties: ["height"],
		transform: transformSpacing,
	},
	minHeight: {
		properties: ["minHeight"],
		transform: transformSpacing,
	},
	maxHeight: {
		properties: ["maxHeight"],
		transform: transformSpacing,
	},
	size: {
		properties: ["width", "height"],
		transform: transformSpacing,
	},
	position: true,
	top: {
		properties: ["top"],
		transform: transformSpacing,
	},
	bottom: {
		properties: ["bottom"],
		transform: transformSpacing,
	},
	left: {
		properties: ["left"],
		transform: transformSpacing,
	},
	right: {
		properties: ["right"],
		transform: transformSpacing,
	},
	overflow: true,
	overflowX: true,
	overflowY: true,
	display: true,
	zIndex: {
		properties: ["zIndex"],
		transform: transformzIndex,
	},
	visibility: true,
};

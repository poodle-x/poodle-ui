import * as CSS from "csstype";
import { ResponsiveProp, SystemConfigList, transformSpacing } from "./";

export interface FlexProps {
	/**
	 * The CSS `flex` property
	 */
	flex?: ResponsiveProp<CSS.Property.Flex>;
	/**
	 * The CSS `align-items` property
	 */
	alignItems?: ResponsiveProp<CSS.Property.AlignItems>;
	/**
	 * The CSS `align-content` property
	 */
	alignContent?: ResponsiveProp<CSS.Property.AlignContent>;
	/**
	 * The CSS `justify-items` property
	 */
	justifyItems?: ResponsiveProp<CSS.Property.JustifyItems>;
	/**
	 * The CSS `justify-content` property
	 */
	justifyContent?: ResponsiveProp<CSS.Property.JustifyContent>;
	/**
	 * The CSS `flex-wrap` property
	 */
	flexWrap?: ResponsiveProp<CSS.Property.FlexWrap>;
	/**
	 * The CSS `flex-basis` property
	 */
	flexBasis?: ResponsiveProp<CSS.Property.FlexBasis | number | string>;
	/**
	 * The CSS `flex-direction` property
	 */
	flexDirection?: ResponsiveProp<CSS.Property.FlexDirection>;
	/**
	 * The CSS `flex-direction` property
	 */
	flexDir?: ResponsiveProp<CSS.Property.FlexDirection>;
	/**
	 * The CSS `justify-self` property
	 */
	justifySelf?: ResponsiveProp<CSS.Property.JustifySelf>;
	/**
	 * The CSS `align-self` property
	 */
	alignSelf?: ResponsiveProp<CSS.Property.AlignSelf>;
	/**
	 * The CSS `order` property
	 */
	order?: ResponsiveProp<CSS.Property.Order>;
	/**
	 * The CSS `flex-grow` property
	 */
	flexGrow?: ResponsiveProp<CSS.Property.FlexGrow>;
	/**
	 * The CSS `flex-shrink` property
	 */
	flexShrink?: ResponsiveProp<CSS.Property.FlexShrink>;
}

export const flexSystem: SystemConfigList = {
	flex: true,
	alignItems: true,
	alignContent: true,
	justifyItems: true,
	justifyContent: true,
	flexWrap: true,
	flexGrow: true,
	flexShrink: true,
	flexBasis: {
		properties: ["flexBasis"],
		transform: transformSpacing,
	},
	justifySelf: true,
	alignSelf: true,
	order: true,
	"flexDir,flexDirection": {
		properties: ["flexDirection"],
	},
};

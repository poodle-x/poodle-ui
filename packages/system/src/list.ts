import { ResponsiveProp, SystemConfigList } from "./index";
import * as CSS from "csstype";

export interface ListProps {
	/**
	 * The CSS `list-style` property
	 */
	listStyle?: ResponsiveProp<CSS.Property.ListStyle>;
	/**
	 * The CSS `list-style-type` property
	 */
	listStyleType?: ResponsiveProp<CSS.Property.ListStyleType>;
	/**
	 * The CSS `list-style-image` property
	 */
	listStyleImage?: ResponsiveProp<CSS.Property.ListStyleImage>;
	/**
	 * The CSS `list-style-position` property
	 */
	listStylePosition?: ResponsiveProp<CSS.Property.ListStylePosition>;
}

export const listSystem: SystemConfigList = {
	listStyle: true,
	listStyleType: true,
	listStyleImage: true,
	listStylePosition: true,
};

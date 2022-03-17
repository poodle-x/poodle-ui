import * as CSS from "csstype";

import { ResponsiveProp, transformSpacing, SystemConfigList } from "./";

export interface GridProps {
	/**
	 * The CSS `grid-template-rows` property
	 */
	gridTemplateRows?: ResponsiveProp<CSS.Property.GridTemplateRows>;
	/**
	 * The CSS `grid-template-columns` property
	 */
	gridTemplateColumns?: ResponsiveProp<CSS.Property.GridTemplateColumns>;
	/**
	 * The CSS `grid-row-gap` property
	 *
	 * Support spacing
	 */
	gridRowGap?: ResponsiveProp<CSS.Property.GridRowGap>;
	/**
	 * The CSS `grid-column-gap` property
	 *
	 * Support spacing
	 */
	gridColumnGap?: ResponsiveProp<CSS.Property.GridColumnGap>;
	/**
	 * The CSS `grid-gap` property
	 *
	 * Support spacing
	 */
	gridGap?: ResponsiveProp<CSS.Property.GridGap>;
	/**
	 * The CSS `grid-row-start` property
	 */
	gridRowStart?: ResponsiveProp<CSS.Property.GridRowStart>;
	/**
	 * The CSS `grid-row-end` property
	 */
	gridRowEnd?: ResponsiveProp<CSS.Property.GridRowEnd>;
	/**
	 * The CSS `grid-column-start` property
	 */
	gridColumnStart?: ResponsiveProp<CSS.Property.GridColumnStart>;
	/**
	 * The CSS `grid-column-end` property
	 */
	gridColumnEnd?: ResponsiveProp<CSS.Property.GridColumnEnd>;
	/**
	 * The CSS `grid-row` property
	 */
	gridRow?: ResponsiveProp<CSS.Property.GridRow>;
	/**
	 * The CSS `grid-row` property
	 */
	gridColumn?: ResponsiveProp<CSS.Property.GridColumn>;
	/**
	 * The CSS `grid-area` property
	 */
	gridArea?: ResponsiveProp<CSS.Property.GridArea>;
	/**
	 * The CSS `grid-template-areas` property
	 */
	gridTemplateAreas?: ResponsiveProp<CSS.Property.GridTemplateAreas>;
	/**
	 * The CSS `grid-auto-columns` property
	 */
	gridAutoColumns?: ResponsiveProp<CSS.Property.GridAutoColumns>;
	/**
	 * The CSS `grid-auto-rows` property
	 */
	gridAutoRows?: ResponsiveProp<CSS.Property.GridAutoRows>;
	/**
	 * The CSS `grid-auto-flow` property
	 */
	gridAutoFlow?: ResponsiveProp<CSS.Property.GridAutoFlow>;
	/**
	 * The CSS `justify-self` property
	 */
	justifySelf?: ResponsiveProp<CSS.Property.JustifySelf>;
	/**
	 * The CSS `align-self` property
	 */
	alignSelf?: ResponsiveProp<CSS.Property.AlignSelf>;
	/**
	 * The CSS `align-content` property
	 */
	alignContent?: ResponsiveProp<CSS.Property.AlignContent>;
	/**
	 * The CSS `justify-content` property
	 */
	justifyContent?: ResponsiveProp<CSS.Property.JustifyContent>;
}

export const gridSystem: SystemConfigList = {
	gridTemplateRows: true,
	gridTemplateColumns: true,
	gridRowGap: {
		properties: ["gridRowGap"],
		transform: transformSpacing,
	},
	gridColumnGap: {
		properties: ["gridColumnGap"],
		transform: transformSpacing,
	},
	gridGap: {
		properties: ["gridColumnGap"],
		transform: transformSpacing,
	},
	gridRowStart: true,
	gridRowEnd: true,
	gridColumnStart: true,
	gridColumnEnd: true,
	gridRow: true,
	gridColumn: true,
	gridArea: true,
	gridTemplateAreas: true,
	gridAutoRows: true,
	gridAutoColumns: true,
	gridAutoFlow: true,
	justifySelf: true,
	alignSelf: true,
	alignContent: true,
	justifyContent: true,
};

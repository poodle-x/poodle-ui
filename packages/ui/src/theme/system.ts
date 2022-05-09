import {
	BordersProps,
	bordersSystem,
	ColorsProps,
	colorsSystem,
	compose,
	createSystem,
	FlexProps,
	flexSystem,
	FontsProps,
	fontsSystem,
	getMode,
	GridProps,
	gridSystem,
	LayoutProps,
	layoutSystem,
	ListProps,
	listSystem,
	PseudosProps,
	pseudosSystem,
	ResponsiveProp,
	ShadowProps,
	shadowSystem,
	SpacingProps,
	spacingSystem,
	SystemConfigList,
} from "@poodle/system";
import * as CSS from "csstype";
import { CSSSystem } from "../styled";
import { StandardThemeConfig } from "./index";

const additionalSystem: SystemConfigList = {
	objectFit: true,
	objectPosition: true,
	transition: true,
	cursor: true,
	pointerEvents: true,
};

export interface AdditionalSystemProps {
	/**
	 * The CSS `object-fit` property
	 */
	objectFit?: ResponsiveProp<CSS.Property.ObjectFit>;
	/**
	 * The CSS `object-fit` property
	 */
	objectPosition?: ResponsiveProp<CSS.Property.ObjectPosition>;
	/**
	 * The CSS `transition` property
	 */
	transition?: ResponsiveProp<CSS.Property.Transition>;
	/**
	 * The CSS `cursor` property
	 */
	cursor?: ResponsiveProp<CSS.Property.Cursor>;
	/**
	 * The CSS `cursor` property
	 */
	pointerEvents?: ResponsiveProp<CSS.Property.PointerEvents>;
}

const allSystem = compose(
	colorsSystem,
	fontsSystem,
	layoutSystem,
	spacingSystem,
	bordersSystem,
	flexSystem,
	pseudosSystem,
	shadowSystem,
	gridSystem,
	listSystem,
	additionalSystem
);

export const system = createSystem(allSystem);

interface CssSystemProps
	extends SpacingProps,
		LayoutProps,
		FontsProps,
		ColorsProps,
		BordersProps,
		ShadowProps,
		FlexProps,
		GridProps,
		ListProps,
		AdditionalSystemProps {}

export interface SystemProps
	extends SpacingProps,
		LayoutProps,
		FontsProps,
		ColorsProps,
		BordersProps,
		ShadowProps,
		FlexProps,
		PseudosProps<CssSystemProps>,
		GridProps,
		ListProps,
		AdditionalSystemProps {}

const additionalProps = [
	"textStyle",
	"variant",
	"themeExtend",
	"theme",
	"sizeStyle",
	"colorStyle",
];

// Cache to avoid unnecessary repeat loop
// @todo maybe move to a helper func
const finalSystem: SystemConfigList = {};

for (const keys in allSystem) {
	const keysPart = keys.split(",");

	const rawConfig = allSystem[keys];

	keysPart.forEach((k) => {
		finalSystem[k] = rawConfig;
	});
}

export function removeSystemProps(props: { [key: string]: any }) {
	let resultProps = {};

	for (const prop in props) {
		let found = false;

		if (finalSystem[prop] || additionalProps.indexOf(prop) >= 0) {
			found = true;
		}

		if (!found && ["sx"].indexOf(prop) === -1) {
			resultProps = {
				...resultProps,
				[prop]: props[prop],
			};
		}
	}

	return resultProps;
}

export function createCSSSystemStandard<Key extends string>(data: {
	key: Key;
	config?: StandardThemeConfig<Key, any>;
	props: { [key: string]: any };
	base?: CSSSystem["base"];
}): CSSSystem {
	const { key, props, config, base } = data;

	const { variant = "", sizeStyle = "", colorStyle = "" } = props;

	const mode = getMode(props);

	return {
		base,
		applies: [
			config?.styles?.[key],
			config?.modes?.[mode]?.styles?.[key],
			config?.variants?.[variant]?.[key],
			config?.modes?.[mode]?.variants?.[variant]?.[key],
			config?.sizes?.[sizeStyle]?.[key],
			config?.modes?.[mode]?.sizes?.[sizeStyle]?.[key],
			config?.colorStyles?.[colorStyle]?.[key],
			config?.modes?.[mode]?.colorStyles?.[colorStyle]?.[key],
		],
		override: config?.overrides?.[key],
	};
}

export * from "@poodle/system";

import { math } from "polished";
import { BreakpointsThemeConfig } from "./breakpoints";
import { ColorsThemeConfig } from "./colors";
import { SpacingThemeConfig } from "./spacing";
import { FontsThemeConfig } from "./fonts";
import { BordersThemeConfig } from "./borders";
import { LayoutsThemeConfig } from "./layout";
import { ShadowThemeConfig } from "./shadow";

export * from "./system";
export * from "./breakpoints";
export * from "./spacing";
export * from "./colors";
export * from "./layout";
export * from "./fonts";
export * from "./flex";
export * from "./grid";
export * from "./borders";
export * from "./pseudos";
export * from "./shadow";
export * from "./list";

export interface SystemThemeConfig {
	mode?: string;
	breakpoints?: BreakpointsThemeConfig;
	spacing?: SpacingThemeConfig;
	colors?: ColorsThemeConfig;
	fonts?: FontsThemeConfig;
	borders?: BordersThemeConfig;
	layouts?: LayoutsThemeConfig;
	shadows?: ShadowThemeConfig;
}

export type ThemeValue<T> = T | ((props: { [key: string]: any }) => T);

export type ResponsiveProp<T = any> =
	| ThemeValue<T>
	| {
			[key: string]: ThemeValue<T> | Array<ThemeValue<T>>;
	  }
	| ThemeValue<T>[];

export function getThemeValue<T>(
	props: { [key: string]: any },
	value: ThemeValue<T> | undefined,
	defaultValue: T
) {
	if (value === undefined) {
		return defaultValue;
	}

	if (typeof value === "function") {
		return (value as (props: { [key: string]: any }) => T)(props);
	}

	return value;
}

/**
 * `getScaling` return spacing value from received value and scaling value.
 *
 * If the value is a string like "scale-x" with 'x' is a number then the function
 * will return the result equal by scale multiply with 'x'.
 * If the value type is a string and is found in `sets[value]`, the function will use that and
 * return the result via `getThemeValue` function.
 * Other cases return the result via `getThemeValue` function with value is the same received value.
 */
export function getScaling(data: {
	props: { [key: string]: any };
	scale: number | string;
	value: ThemeValue<number | string>;
	sets?: {
		[k: string]: ThemeValue<number | string>;
	};
}) {
	const { scale, sets, value, props } = data;

	if (typeof value === "number") {
		return value;
	}

	let valueFinal: ThemeValue<number | string> = getThemeValue<string | number>(
		props,
		value,
		""
	);

	if (typeof valueFinal === "string") {
		const parts = valueFinal.split("-");

		const scaleNumber = parseFloat(parts[1]);

		if (parts[0] === "scale" && !isNaN(scaleNumber)) {
			return typeof scale === "string"
				? math(`${scaleNumber} * ${scale}`)
				: scaleNumber * scale;
		}
		valueFinal = sets?.[valueFinal] || valueFinal;
	}

	return getThemeValue<string | number>(props, valueFinal, "");
}

export function getMode(props: {
	[key: string]: any;
	theme?: SystemThemeConfig;
}) {
	const { theme, mode } = props;
	if (typeof mode === "string") {
		return mode;
	}
	return theme?.mode || "";
}

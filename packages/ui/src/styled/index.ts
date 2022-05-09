import { css as cssCore, cx as cxCore } from "@emotion/css";
import { ClassNamesArg, Interpolation } from "@emotion/react";
import * as CSS from "csstype";
import { SystemProps } from "../theme";
import { cssSystem } from "./CSSSystem";

function css(...args: Array<Interpolation<any>>) {
	return cssCore(...(args as any));
}

function cx(...classNames: Array<ClassNamesArg>) {
	return cxCore(...classNames);
}

export { cssSystem };

export { css, cx };

export type Stylesheet<MP = undefined> = Interpolation<MP>;

export type CSSProperties = CSS.PropertiesFallback<number | string>;

export type CSSPropertiesWithMultiValues = {
	[K in keyof CSSProperties]:
		| CSSProperties[K]
		| Array<Extract<CSSProperties[K], string>>;
};

export type CSSPropertiesWithSystem =
	| CSSPropertiesWithMultiValues
	| SystemProps;

export type CSSPseudoPropertiesWithSystem = {
	[K in CSS.Pseudos]?: AllCSSPropertiesWithSystem;
};

export type AllCSSPropertiesWithSystem = CSSPropertiesWithSystem &
	CSSPseudoPropertiesWithSystem;

export type CSSObjectSystem =
	| AllCSSPropertiesWithSystem
	| { [key: string]: CSSObjectSystem };

export type DashSX =
	| CSSProperties
	| CSSProperties[]
	| Array<{ [p: string]: any }>
	| (Array<{ [p: string]: any }> | CSSProperties | CSSProperties[])[];
export { CSSSystem } from "./CSSSystem";

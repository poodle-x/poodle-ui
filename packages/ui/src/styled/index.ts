import { css as cssCore, cx as cxCore } from "@emotion/css";
import classNames from "classnames";
import { ClassNamesArg, Interpolation } from "@emotion/react";
import * as CSS from "csstype";
import { SystemProps } from "../theme";
import { cssSystem } from "./cssSystem";

function css(...args: Array<Interpolation<any>>) {
	return cssCore(...(args as any));
}

function cx(...classNames: Array<ClassNamesArg>) {
	return cxCore(...classNames);
}

export { cssSystem };

export { css, cx, classNames };

export * from "./classNames";

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

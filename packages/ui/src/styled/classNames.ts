import React from "react";
import { css, CSSObjectSystem, classNames as classNamesCore } from "./";
import { ThemeValue } from "../theme";
import { cssSystem } from "./cssSystem";

export type ClassName =
	| undefined
	| string
	| ((props: any) => string)
	| { [key: string]: boolean };

export interface CSSSystem {
	base?: CSSObjectSystem[];
	check?: boolean;
	overrideClassName?: string | boolean | undefined;
	applies?: (ThemeValue<CSSObjectSystem> | undefined)[];
	override?: ThemeValue<CSSObjectSystem>;
}

export function classNameCompose(data: {
	props: any;
	overrideClassName?: string | boolean | undefined;
	styles: {
		base: CSSObjectSystem[];
		applies?: (ThemeValue<CSSObjectSystem> | undefined)[];
		override?: ThemeValue<CSSObjectSystem>;
	};
}): string {
	const { overrideClassName, styles, props } = data;

	if (typeof overrideClassName === "string") {
		return overrideClassName;
	}

	if (overrideClassName === true) {
		return "";
	}

	return genClassNames({ props, classNames: [styles] });
}

function isCSSSystem(arg: ClassName | CSSSystem): arg is CSSSystem {
	if (typeof arg !== "object") {
		return false;
	}
	return arg.base !== undefined;
}

function genClassNameFromCSSSystem(props: any, sys: CSSSystem) {
	if (typeof sys.overrideClassName === "string") {
		return sys.overrideClassName;
	}

	if (sys.overrideClassName === true || sys.check === false) {
		return "";
	}

	return css(
		cssSystem({
			props,
			...sys,
		})
	);
}

export function genClassNames(data: {
	props: { [key: string]: any };
	classNames: Array<
		ClassName | CSSSystem | ((props: { [key: string]: any }) => CSSSystem)
	>;
}): string {
	const { props, classNames } = data;

	return classNamesCore(
		...classNames
			.filter((s) => {
				return Boolean(s);
			})
			.map((cn) => {
				if (typeof cn === "function") {
					const result = cn(props);

					if (typeof result === "string") {
						return result;
					}

					return genClassNameFromCSSSystem(props, result);
				}

				if (isCSSSystem(cn)) {
					return genClassNameFromCSSSystem(props, cn);
				}

				return cn;
			})
	);
}

export function useClassNames(data: {
	props?: { [key: string]: any };
	theme?: { [key: string]: any };
	lists: {
		[key: string]: {
			props?: { [key: string]: any };
			theme?: { [key: string]: any };
			classNames: Array<ClassName | CSSSystem | ((props: any) => CSSSystem)>;
		};
	};
}): { [key: string]: string } {
	const { props, theme, lists } = data;

	return React.useMemo(() => {
		const result: { [key: string]: string } = {};

		const baseProps = { ...props, theme: theme ? theme : props?.theme };

		Object.keys(lists).forEach((key) => {
			const listKeyData = lists[key];
			const classNames = listKeyData.classNames || [];

			const finalProps = {
				...baseProps,
				theme: listKeyData.theme ? listKeyData.theme : baseProps.theme,
			};
			result[key] = genClassNames({
				props: finalProps,
				classNames,
			});
		});

		return result;
	}, [lists, props, theme]);
}

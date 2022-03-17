import React from "react";
import { css, CSSObjectSystem, cx } from "../styled";
import { ThemeValue } from "../theme";
import { cssSystem } from "./cssSystem";

type ClassName =
	| undefined
	| string
	| ((props: any) => string)
	| { [key: string]: boolean };

export function genClassNames(data: {
	props: any;
	classNames: Array<ClassName>;
}) {
	const { props, classNames } = data;

	let resultClassNames = "";

	classNames.forEach((cn) => {
		if (typeof cn === "function") {
			resultClassNames = cx(resultClassNames, cn(props));
			return;
		}

		resultClassNames = cx(resultClassNames, cn);
	});

	return resultClassNames;
}

export function classNameCompose(data: {
	props: any;
	overrideClassName?: string | boolean | undefined;
	styles: {
		base: CSSObjectSystem[];
		applies?: (ThemeValue<CSSObjectSystem> | undefined)[];
		override?: ThemeValue<CSSObjectSystem>;
	};
}) {
	const { overrideClassName, styles, props } = data;

	if (typeof overrideClassName === "string") {
		return overrideClassName;
	}

	if (overrideClassName === true) {
		return "";
	}

	return css(
		cssSystem({
			...styles,
			props,
		})
	);
}

export function genListClassNames(
	baseProps: any,
	lists: {
		[key: string]: {
			props?: any;
			classNames: Array<ClassName>;
		};
	}
): { [key in keyof typeof lists]: string } {
	const result: { [key: string]: string } = {};
	Object.keys(lists).forEach((key) => {
		let resultClassNames = "";
		const listKeyData = lists[key];
		resultClassNames = genClassNames({
			props: { ...baseProps, ...listKeyData.props },
			classNames: listKeyData.classNames,
		});
		result[key] = resultClassNames;
	});

	return result;
}

export function useGenListClassNames(
	baseProps: any,
	lists: {
		[key: string]: {
			props?: any;
			classNames: Array<ClassName>;
		};
	}
) {
	return React.useMemo(() => {
		return genListClassNames(baseProps, lists);
	}, [lists, baseProps]);
}

import { ClassNamesArg } from "@emotion/react";
import { BoxProps } from "../Box";
import { getThemeValue, system, ThemeValue } from "../theme";
import { CSSObjectSystem, CSSProperties, cx, DashSX } from ".";

export function joinDashSX(...agr: (DashSX | undefined)[]): DashSX[] {
	const result: DashSX[] = [];
	agr.forEach((d) => {
		if (d) {
			result.push(d);
		}
	});
	return result;
}

export interface CSSSystem {
	base?: CSSObjectSystem[];
	check?: boolean;
	applies?: (ThemeValue<CSSObjectSystem> | undefined)[];
	override?: ThemeValue<CSSObjectSystem>;
}

export function runCSSSystem(data: {
	props: { [key: string]: any };
	cssSystem: CSSSystem;
}):
	| Array<{ [p: string]: any }>
	| (Array<{ [p: string]: any }> | CSSProperties | CSSProperties[])[] {
	const { props, cssSystem } = data;
	const { applies = [], override, base = [] } = cssSystem;

	const overrideTheme = getThemeValue<CSSObjectSystem | undefined>(
		props,
		override,
		undefined
	);

	if (overrideTheme) {
		return system(
			{ ...overrideTheme, theme: props.theme },
			{
				sendProps: props,
			}
		);
	}

	return [
		...base.map((b) => {
			return system(
				{ ...b, theme: props.theme },
				{
					sendProps: props,
				}
			);
		}),
		...applies.reduce<(CSSObjectSystem | CSSObjectSystem[])[]>((prev, s) => {
			const v = getThemeValue(props, s, undefined);

			if (v) {
				return [
					...prev,
					system({ ...v, theme: props.theme }, { sendProps: props }),
				];
			}

			return prev;
		}, []),
	];
}

export function getCSSSystemBoxProps<
	ComponentProps = BoxProps,
	PartProps = BoxProps
>(opts: {
	isLocalTheme?: boolean;
	isRoot?: boolean;
	componentProps?: ComponentProps;
	partProps?: PartProps;
	fnCSSSystem:
		| ((props: ComponentProps) => CSSSystem)
		| ((props: ComponentProps) => CSSSystem)[];
	baseClassName?: ClassNamesArg[];
}) {
	const {
		isLocalTheme,
		isRoot,
		componentProps = {},
		fnCSSSystem,
		baseClassName,
		partProps = {},
	} = opts;

	const runReturned: DashSX[] = [];
	if (Array.isArray(fnCSSSystem)) {
		fnCSSSystem.forEach((f) => {
			runReturned.push(
				runCSSSystem({
					props: componentProps,
					cssSystem: f(componentProps as any),
				})
			);
		});
	} else {
		runReturned.push(
			runCSSSystem({
				props: componentProps,
				cssSystem: fnCSSSystem(componentProps as any),
			})
		);
	}
	const className: (ClassNamesArg[] | any)[] = [baseClassName];

	if (isRoot) {
		className.push((componentProps as BoxProps).className);
		if ((componentProps as BoxProps)._sx) {
			runReturned.push((componentProps as any)._sx);
		}
	}

	if ((partProps as BoxProps)._sx) {
		runReturned.push((partProps as any)._sx);
	}

	className.push((partProps as BoxProps).className);

	const componentTheme = isLocalTheme
		? (componentProps as BoxProps).theme
		: undefined;

	return {
		...partProps,
		theme: (partProps as BoxProps).theme
			? (partProps as BoxProps).theme
			: componentTheme,
		className: cx(className),
		_sx: runReturned,
	};
}

export function cssSystem(data: {
	props: { [key: string]: any };
	base?: CSSObjectSystem[];
	applies?: (ThemeValue<CSSObjectSystem> | undefined)[];
	override?: ThemeValue<CSSObjectSystem>;
}):
	| Array<{ [p: string]: any }>
	| (Array<{ [p: string]: any }> | CSSProperties | CSSProperties[])[] {
	const { props, applies = [], override, base = [] } = data;

	const overrideTheme = getThemeValue<CSSObjectSystem | undefined>(
		props,
		override,
		undefined
	);

	if (overrideTheme) {
		return system(
			{ ...overrideTheme, theme: props.theme },
			{
				sendProps: props,
			}
		);
	}

	return [
		...base.map((b) => {
			return system(
				{ ...b, theme: props.theme },
				{
					sendProps: props,
				}
			);
		}),
		...applies.reduce<(CSSObjectSystem | CSSObjectSystem[])[]>((prev, s) => {
			const v = getThemeValue(props, s, undefined);

			if (v) {
				return [
					...prev,
					system({ ...v, theme: props.theme }, { sendProps: props }),
				];
			}

			return prev;
		}, []),
	];
}

import { ThemeValue, getThemeValue, SystemThemeConfig } from "./";

export interface BreakpointsThemeConfig {
	scale?: ThemeValue<string[]>;
	sets?: {
		[key: string]: ThemeValue<string | number>;
	};
}

export function getBreakpoint(scale: string | number) {
	return (props: { theme?: SystemThemeConfig }) => {
		const { theme } = props;

		if (typeof scale === "string") {
			return getThemeValue<string | number>(
				props,
				theme?.breakpoints?.sets?.[scale],
				""
			);
		}

		const currentScale = getThemeValue<string[]>(
			props,
			theme?.breakpoints?.scale,
			[]
		);

		if (currentScale[scale]) {
			return getThemeValue<string | number>(
				props,
				theme?.breakpoints?.sets?.[currentScale[scale]],
				""
			);
		}

		return "";
	};
}

export function getBreakpointsScale(props: { theme?: SystemThemeConfig }) {
	return getThemeValue<string[]>(props, props.theme?.breakpoints?.scale, []);
}

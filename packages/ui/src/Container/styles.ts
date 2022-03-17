import { getBreakpoint, createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { ContainerProps } from "./Container";
import { transformResponsiveValue } from "../utils/transformResponsiveValue";
import { ContainerStyleKeys } from "./";

export function Root(props: ContainerProps): CSSSystem {
	const { theme, fixed, gutter = "scale-4" } = props;

	let fixedBreakpointValue = fixed;

	if (fixed) {
		fixedBreakpointValue = transformResponsiveValue<string | number>(
			fixed,
			(v) => {
				if (typeof v === "function") {
					const result = v(props);
					return getBreakpoint(result)(props) || result;
				} else {
					return getBreakpoint(v)(props) || v;
				}
			}
		);
	}

	return createCSSSystemStandard<ContainerStyleKeys>({
		key: "root",
		config: theme?.Container,
		props,
		base: [
			{
				mx: "auto",
				px: gutter,
				maxWidth: fixedBreakpointValue,
			},
		],
	});
}

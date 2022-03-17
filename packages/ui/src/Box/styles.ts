import { system, createCSSSystemStandard } from "../theme";
import { BoxProps } from "./Box";
import { CSSSystem, css } from "../styled";

export const Root = (props: BoxProps): CSSSystem => {
	const { theme } = props;
	return createCSSSystemStandard({
		key: "root",
		config: theme?.Box,
		props,
		base: [
			{
				boxSizing: "border-box",
			},
		],
	});
};

export const SX = (props: BoxProps) => {
	const { sx } = props;

	if (!sx) return "";

	return css(system({ ...sx, theme: props.theme }));
};

export const Box = (props: BoxProps) => {
	const { children, ...otherProps } = props;

	return css(system(otherProps, { returnOnlySystemProps: true }));
};

import { CSSSystem } from "../styled";
import { createCSSSystemStandard } from "../theme";
import { BoxProps } from "./Box";

export const Root = (props: BoxProps<any>): CSSSystem => {
	const { theme } = props;
	return createCSSSystemStandard({
		key: "root",
		config: theme?.Box,
		props,
		base: [
			// {
			// 	boxSizing: "border-box",
			// },
		],
	});
};

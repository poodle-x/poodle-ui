import {
	getBreakpointsScale,
	ResponsiveProp,
	getSpacing,
	createCSSSystemStandard,
} from "../theme";
import { CSSSystem } from "../styled";
import { ColumnsProps } from "./Columns";
import { responsiveValueThreshold } from "../utils/responsiveValueThreshold";
import { negativeResponsiveValue } from "../utils/negativeResponsiveValue";
import { transformResponsiveValue } from "../utils/transformResponsiveValue";
import { ColumnsStyleKeys } from "./";

export function Root(props: ColumnsProps): CSSSystem {
	const { collapse, gutter, theme, wrapMode, wrapGutter } = props;

	const systemGutter = gutter
		? transformResponsiveValue(gutter, (value) => {
				return getSpacing(value)(props);
		  })
		: gutter;

	const negativeGutter = systemGutter
		? negativeResponsiveValue(systemGutter)
		: systemGutter;

	const systemWrapGutter = wrapGutter
		? transformResponsiveValue(wrapGutter, (value) => {
				return getSpacing(value)(props);
		  })
		: wrapGutter;

	const negativeWrapGutter = systemWrapGutter
		? negativeResponsiveValue(systemWrapGutter)
		: systemWrapGutter;

	const breakPointScale = getBreakpointsScale(props);

	let calcGutter: ResponsiveProp<number | string> | undefined = undefined;

	if (collapse && negativeGutter) {
		calcGutter = responsiveValueThreshold<number | string>(
			negativeGutter,
			collapse,
			breakPointScale
		);
	}
	const wrapModeText = wrapMode ? "wrap" : undefined;

	return createCSSSystemStandard<ColumnsStyleKeys>({
		key: "root",
		config: theme?.Columns,
		props,
		base: [
			{
				display: collapse ? { [collapse]: "flex" } : "flex",
				marginLeft: collapse && calcGutter ? calcGutter : negativeGutter,
				marginTop: negativeWrapGutter,
				flexWrap: collapse && wrapMode ? { [collapse]: "wrap" } : wrapModeText,
			},
		],
	});
}

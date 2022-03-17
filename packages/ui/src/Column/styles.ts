import {
	createCSSSystemStandard,
	getBreakpointsScale,
	ResponsiveProp,
} from "../theme";
import { CSSSystem } from "../styled";
import { ColumnProps } from "./Column";
import { responsiveValueThreshold } from "../utils/responsiveValueThreshold";
import { ColumnStyleKeys } from "./index";

export function Root(
	props: ColumnProps & {
		gutter?: ResponsiveProp<string | number>;
		wrapGutter?: ResponsiveProp<string | number>;
		collapse?: string;
	}
): CSSSystem {
	const { gutter, theme, colWidth, collapse, wrapGutter } = props;

	const breakPointScale = getBreakpointsScale(props);

	let calcGutter: ResponsiveProp<number | string> | undefined = undefined;

	if (collapse && gutter) {
		calcGutter = responsiveValueThreshold<number | string>(
			gutter,
			collapse,
			breakPointScale
		);
	}
	return createCSSSystemStandard<ColumnStyleKeys>({
		key: "root",
		config: theme?.Column,
		props,
		base: [
			{
				flexBasis: colWidth ? colWidth : undefined,
				flexGrow: colWidth ? 0 : undefined,
				flexShrink: colWidth ? 0 : undefined,
				paddingLeft: collapse && calcGutter ? calcGutter : gutter,
				paddingTop: wrapGutter,
				width: colWidth !== "content" ? "100%" : undefined,
			},
		],
	});
}

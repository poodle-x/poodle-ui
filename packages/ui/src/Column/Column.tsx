import React from "react";
import Box, { BoxProps } from "../Box";
import { ResponsiveProp, StandardComponentProps, ThemeConfig } from "../theme";
import { useClassNames } from "../styled";
import useDefaultProps from "../utils/useDefaultProps";
import * as styles from "./styles";
import { ColumnsContext } from "../Columns";

export interface LocalColumnProps {
	/**
	 * Set column width. If we want the column width equal to content set `colWidth="content"`
	 */
	colWidth?: ResponsiveProp<string | number>;
	children?: React.ReactNode;
}

export interface ColumnProps
	extends BoxProps,
		StandardComponentProps,
		LocalColumnProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Columns?.defaultProps;
}

export const Column: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<ColumnProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, ColumnProps>((_props, ref) => {
	const columnContext = React.useContext(ColumnsContext);

	const props = useDefaultProps<ColumnProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { children, className, colWidth, ...otherProps } = props;

	const classes = useClassNames({
		props: {
			...props,
			gutter: columnContext.gutter,
			collapse: columnContext.collapse,
			wrapGutter: columnContext.wrapGutter,
		},
		lists: {
			root: {
				classNames: ["poodle-column", styles.Root, className],
			},
		},
	});

	return (
		<Box {...otherProps} className={classes.root} ref={ref}>
			{children}
		</Box>
	);
});

Column.displayName = "PoodleColumn";

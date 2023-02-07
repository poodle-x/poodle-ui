import React from "react";
import Box, { BoxProps } from "../Box";
import { ColumnsContext } from "../Columns";
import { getCSSSystemBoxProps } from "../styled/system";
import { ResponsiveProp, StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import * as styles from "./styles";

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
	return theme?.Column?.defaultProps;
}

export const Column: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<ColumnProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, ColumnProps>((_props, ref) => {
	const columnContext = React.useContext(ColumnsContext);

	const { props, isLocalTheme } = useDefaultProps<ColumnProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { children, className, colWidth, ...otherProps } = props;

	return (
		<Box
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: {
					...props,
					gutter: columnContext.gutter,
					collapse: columnContext.collapse,
					wrapGutter: columnContext.wrapGutter,
				},
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-column"],
			})}
			ref={ref}
		>
			{children}
		</Box>
	);
});

Column.displayName = "PoodleColumn";

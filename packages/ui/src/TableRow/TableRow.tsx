import React from "react";
import Box, { BoxProps } from "../Box";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import { getCSSSystemBoxProps } from "../styled/system";
import { TableContext } from "../Table";
import { StandardComponentProps, ThemeConfig } from "../theme";
import * as styles from "./styles";

export type LocalTableRowProps = {
	/**
	 * Mark the row is selected with attribute `data-selected="true"`
	 */
	isSelected?: boolean;
	children?: React.ReactNode;
};

export interface TableRowProps
	extends BoxProps<"tr">,
		StandardComponentProps,
		LocalTableRowProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.TableRow?.defaultProps;
}

export const TableRow: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<TableRowProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, TableRowProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<TableRowProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { children, className, isSelected, ...otherProps } = props;

	const tableContext = React.useContext(TableContext);

	const styleProps = React.useMemo(() => {
		return { ...props, ...tableContext };
	}, [props, tableContext]);

	return (
		<Box
			as="tr"
			data-selected={isSelected}
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: styleProps,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-table-row"],
			})}
			ref={ref}
		>
			{children}
		</Box>
	);
});

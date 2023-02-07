import React from "react";
import Box, { BoxProps } from "../Box";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import { getCSSSystemBoxProps } from "../styled/system";
import { TableContext, TableLevelContext } from "../Table";
import { StandardComponentProps, ThemeConfig } from "../theme";
import * as styles from "./styles";

export interface LocalTableCellProps {
	children?: React.ReactNode;
}

export interface TableCellProps
	extends BoxProps<"td" | "th">,
		StandardComponentProps,
		LocalTableCellProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.TableCell?.defaultProps;
}

export const TableCell: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<TableCellProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, TableCellProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<TableCellProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const tableContext = React.useContext(TableContext);
	const levelContext = React.useContext(TableLevelContext);

	const { children, className, ...otherProps } = props;

	const styleProps = React.useMemo(() => {
		return { ...props, level: levelContext.level, ...tableContext };
	}, [levelContext.level, props, tableContext]);

	return (
		<Box
			as={levelContext.level === "head" ? "th" : "td"}
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: styleProps,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-table-cell"],
			})}
			ref={ref}
		>
			{children}
		</Box>
	);
});

TableCell.displayName = "PoodleTableCell";

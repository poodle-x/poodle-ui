import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";
import { TableContext, TableLevelContext } from "../Table";

export interface LocalTableCellProps {
	children?: React.ReactNode;
}

export interface TableCellProps
	extends BoxProps,
		StandardComponentProps,
		LocalTableCellProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.TableCell?.defaultProps;
}

export const TableCell: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<TableCellProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, TableCellProps>((_props, ref) => {
	const props = useDefaultProps<TableCellProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const tableContext = React.useContext(TableContext);
	const levelContext = React.useContext(TableLevelContext);

	const { children, className, ...otherProps } = props;

	const styleProps = React.useMemo(() => {
		return { ...props, level: levelContext.level, ...tableContext };
	}, [levelContext.level, props, tableContext]);

	const classes = useClassNames({
		props: styleProps,
		lists: {
			root: {
				classNames: ["poodle-table-cell", styles.Root, className],
			},
		},
	});

	return (
		<Box
			as={levelContext.level === "head" ? "th" : "td"}
			{...otherProps}
			className={classes.root}
			ref={ref}
		>
			{children}
		</Box>
	);
});

TableCell.displayName = "PoodleTableCell";

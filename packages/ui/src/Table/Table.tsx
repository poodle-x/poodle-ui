import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";

const op = {};

export interface TableContextValue {
	withBorder?: boolean;
	withDivider?: boolean;
	withHover?: boolean;
	sizeStyle?: "s" | "m" | "l" | string;
}

export const TableContext = React.createContext<TableContextValue>(op);

export interface TableLevelContextValue {
	level?: "head" | "body" | "footer";
}

export const TableLevelContext = React.createContext<TableLevelContextValue>(
	op
);

export interface LocalTableProps {
	/**
	 * Apply root border.
	 */
	withBorder?: boolean;
	/**
	 * Add divider for each row.
	 */
	withDivider?: boolean;
	/**
	 * Apply hover style on table row.
	 */
	withHover?: boolean;
	/**
	 * Change table size. Built-in options are **"s" | "m" | "l"**.
	 *
	 * Default is **"m"**.
	 */
	sizeStyle?: "s" | "m" | "l" | string;
	/**
	 * Customize inner table props.
	 */
	tableProps?: BoxProps;
	children?: React.ReactNode;
}

export interface TableProps
	extends BoxProps,
		StandardComponentProps,
		LocalTableProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Table?.defaultProps;
}

export const Table: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<TableProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, TableProps>((_props, ref) => {
	const props = useDefaultProps<TableProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		children,
		className,
		tableProps,
		withBorder,
		withDivider,
		withHover,
		sizeStyle = "m",
		...otherProps
	} = props;

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: ["poodle-table", styles.Root, className],
			},
			table: {
				classNames: [
					"poodle-table__table",
					styles.Table,
					tableProps?.className,
				],
			},
		},
	});

	return (
		<Box {...otherProps} className={classes.root} ref={ref}>
			<Box as="table" {...tableProps} className={classes.table}>
				<TableContext.Provider
					value={{
						sizeStyle,
						withBorder,
						withDivider,
						withHover,
					}}
				>
					{children}
				</TableContext.Provider>
			</Box>
		</Box>
	);
});

Table.defaultProps = {
	sizeStyle: "m",
};

Table.displayName = "PoodleTable";

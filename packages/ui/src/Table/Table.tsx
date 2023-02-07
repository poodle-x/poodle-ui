import React from "react";
import Box, { BoxProps } from "../Box";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import { getCSSSystemBoxProps } from "../styled/system";
import { StandardComponentProps, ThemeConfig } from "../theme";
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
	extends BoxProps<"table">,
		StandardComponentProps,
		LocalTableProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Table?.defaultProps;
}

export const Table: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<TableProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, TableProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<TableProps>(_props, {
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

	return (
		<Box
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-table"],
			})}
			ref={ref}
		>
			<Box
				as="table"
				{...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: tableProps,
					fnCSSSystem: styles.Table,
					baseClassName: ["poodle-table__table"],
				})}
			>
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

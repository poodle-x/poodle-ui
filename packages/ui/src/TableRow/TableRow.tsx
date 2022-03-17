import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";
import { TableContext } from "../Table";

export type LocalTableRowProps = {
	/**
	 * Mark the row is selected with attribute `data-selected="true"`
	 */
	isSelected?: boolean;
	children?: React.ReactNode;
};

export interface TableRowProps
	extends BoxProps,
		StandardComponentProps,
		LocalTableRowProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.TableRow?.defaultProps;
}

export const TableRow: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<TableRowProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, TableRowProps>((_props, ref) => {
	const props = useDefaultProps<TableRowProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { children, className, isSelected, ...otherProps } = props;

	const tableContext = React.useContext(TableContext);

	const styleProps = React.useMemo(() => {
		return { ...props, ...tableContext };
	}, [props, tableContext]);

	const classes = useClassNames({
		props: styleProps,
		lists: {
			root: {
				classNames: ["poodle-table-row", styles.Root, className],
			},
		},
	});

	return (
		<Box
			as="tr"
			data-selected={isSelected}
			{...otherProps}
			className={classes.root}
			ref={ref}
		>
			{children}
		</Box>
	);
});

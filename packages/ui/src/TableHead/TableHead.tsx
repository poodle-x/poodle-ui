import React from "react";
import { TableContext, TableLevelContext } from "../Table";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";

export type LocalTableHeadProps = {
	children?: React.ReactNode;
};

export interface TableHeadProps
	extends BoxProps,
		StandardComponentProps,
		LocalTableHeadProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.TableHead?.defaultProps;
}

export const TableHead: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<TableHeadProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, TableHeadProps>((_props, ref) => {
	const props = useDefaultProps<TableHeadProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const tableContext = React.useContext(TableContext);

	const styleProps = React.useMemo(() => {
		return { ...props, ...tableContext };
	}, [props, tableContext]);

	const { children, className, ...otherProps } = props;

	const classes = useClassNames({
		props: styleProps,
		lists: {
			root: {
				classNames: ["poodle-table-head", styles.Root, className],
			},
		},
	});

	return (
		<Box as="thead" {...otherProps} className={classes.root} ref={ref}>
			<TableLevelContext.Provider value={{ level: "head" }}>
				{children}
			</TableLevelContext.Provider>
		</Box>
	);
});

TableHead.displayName = "PoodleTableHead";

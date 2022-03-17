import React from "react";
import { TableContext, TableLevelContext } from "../Table";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";

export interface LocalTableBodyProps {
	children?: React.ReactNode;
}

export interface TableBodyProps
	extends BoxProps,
		StandardComponentProps,
		LocalTableBodyProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.TableBody?.defaultProps;
}

export const TableBody: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<TableBodyProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, TableBodyProps>((_props, ref) => {
	const props = useDefaultProps<TableBodyProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { children, className, ...otherProps } = props;

	const tableContext = React.useContext(TableContext);

	const styleProps = React.useMemo(() => {
		return { ...props, ...tableContext };
	}, [props, tableContext]);

	const classes = useClassNames({
		props: styleProps,
		lists: {
			root: {
				classNames: ["poodle-table-body", styles.Root, className],
			},
		},
	});

	return (
		<Box as="tbody" {...otherProps} className={classes.root} ref={ref}>
			<TableLevelContext.Provider value={{ level: "body" }}>
				{children}
			</TableLevelContext.Provider>
		</Box>
	);
});

TableBody.displayName = "PoodleTableBody";

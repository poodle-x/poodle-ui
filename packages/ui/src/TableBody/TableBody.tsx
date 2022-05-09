import React from "react";
import Box, { BoxProps } from "../Box";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { TableContext, TableLevelContext } from "../Table";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
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
	const { props, isLocalTheme } = useDefaultProps<TableBodyProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { children, ...otherProps } = props;

	const tableContext = React.useContext(TableContext);

	const styleProps = React.useMemo(() => {
		return { ...props, ...tableContext };
	}, [props, tableContext]);

	return (
		<Box
			as="tbody"
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: styleProps,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-table-body"],
			})}
			ref={ref}
		>
			<TableLevelContext.Provider value={{ level: "body" }}>
				{children}
			</TableLevelContext.Provider>
		</Box>
	);
});

TableBody.displayName = "PoodleTableBody";

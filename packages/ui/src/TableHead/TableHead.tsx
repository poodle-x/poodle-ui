import React from "react";
import Box, { BoxProps } from "../Box";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { TableContext, TableLevelContext } from "../Table";
import { StandardComponentProps, ThemeConfig } from "../theme";
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
	const { props, isLocalTheme } = useDefaultProps<TableHeadProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const tableContext = React.useContext(TableContext);

	const styleProps = React.useMemo(() => {
		return { ...props, ...tableContext };
	}, [props, tableContext]);

	const { children, className, ...otherProps } = props;

	return (
		<Box
			as="thead"
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: styleProps,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-table-head"],
			})}
			ref={ref}
		>
			<TableLevelContext.Provider value={{ level: "head" }}>
				{children}
			</TableLevelContext.Provider>
		</Box>
	);
});

TableHead.displayName = "PoodleTableHead";

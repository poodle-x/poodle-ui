import React from "react";
import Box, { BoxProps } from "../Box";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { ResponsiveProp, StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import * as styles from "./styles";

export interface ColumnsContextValue {
	wrapMode?: boolean;
	collapse?: string;
	wrapGutter?: ResponsiveProp<number | string>;
	gutter?: ResponsiveProp<number | string>;
}

export const ColumnsContext = React.createContext<ColumnsContextValue>({});

export interface LocalColumnsProps {
	/**
	 * Wrap overflows column
	 */
	wrapMode?: boolean;
	/**
	 * Gutter vertical between each column when collapsed or between each row in wrap mode
	 */
	wrapGutter?: ResponsiveProp<number | string>;
	/**
	 * Force columns wrap below breakpoint.
	 */
	collapse?: string;
	/**
	 * Gutter horizontal between each column when not collapsed
	 */
	gutter?: ResponsiveProp<number | string>;
	children?: React.ReactNode;
}

export interface ColumnsProps
	extends BoxProps,
		StandardComponentProps,
		LocalColumnsProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Columns?.defaultProps;
}

export const Columns: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<ColumnsProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, ColumnsProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<ColumnsProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		children,
		collapse,
		className,
		gutter,
		wrapGutter,
		wrapMode,
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
				baseClassName: ["poodle-columns"],
			})}
			ref={ref}
		>
			<ColumnsContext.Provider
				value={{
					wrapMode,
					wrapGutter,
					collapse,
					gutter,
				}}
			>
				{children}
			</ColumnsContext.Provider>
		</Box>
	);
});

Columns.displayName = "PoodleColumns";

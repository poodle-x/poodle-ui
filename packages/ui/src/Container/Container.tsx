import React from "react";
import Box, { BoxProps } from "../Box";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { ResponsiveProp, StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import * as styles from "./styles";

export interface LocalContainerProps {
	/**
	 * Set the max-width of the container.
	 */
	fixed?: ResponsiveProp<string | number>;
	/**
	 * Set padding left and padding right.
	 */
	gutter?: ResponsiveProp<number | string>;
	children?: React.ReactNode;
}

export interface ContainerProps
	extends BoxProps,
		StandardComponentProps,
		LocalContainerProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Container?.defaultProps;
}

export const Container: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<ContainerProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, ContainerProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<ContainerProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { fixed, gutter, children, className, ...otherProps } = props;

	return (
		<Box
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-container"],
			})}
			ref={ref}
		>
			{children}
		</Box>
	);
});

Container.displayName = "PoodleContainer";

import React from "react";
import Box, { BoxProps } from "../Box";
import { ResponsiveProp, StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
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
	const props = useDefaultProps<ContainerProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { fixed, gutter, children, className, ...otherProps } = props;

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: ["poodle-container", styles.Root, className],
			},
		},
	});

	return (
		<Box {...otherProps} className={classes.root} ref={ref}>
			{children}
		</Box>
	);
});

Container.displayName = "PoodleContainer";

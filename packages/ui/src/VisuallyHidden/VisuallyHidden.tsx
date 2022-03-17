import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";

export interface LocalVisuallyHiddenProps {
	children?: React.ReactNode;
}

export interface VisuallyHiddenProps
	extends BoxProps,
		StandardComponentProps,
		LocalVisuallyHiddenProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.VisuallyHidden?.defaultProps;
}

export const VisuallyHidden: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<VisuallyHiddenProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, VisuallyHiddenProps>((_props, ref) => {
	const props = useDefaultProps<VisuallyHiddenProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { children, className, ...otherProps } = props;

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: ["poodle-visually-hidden", styles.Root, className],
			},
		},
	});

	return (
		<Box {...otherProps} className={classes.root} ref={ref}>
			{children}
		</Box>
	);
});

VisuallyHidden.displayName = "PoodleVisuallyHidden";

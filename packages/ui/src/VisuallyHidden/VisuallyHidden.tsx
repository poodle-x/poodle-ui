import React from "react";
import Box, { BoxProps } from "../Box";
import { getCSSSystemBoxProps } from "../styled/system";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
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
	const { props, isLocalTheme } = useDefaultProps<VisuallyHiddenProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { children, className, ...otherProps } = props;

	return (
		<Box
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-visually-hidden"],
			})}
			ref={ref}
		>
			{children}
		</Box>
	);
});

VisuallyHidden.displayName = "PoodleVisuallyHidden";

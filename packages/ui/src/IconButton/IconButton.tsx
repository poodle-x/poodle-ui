import React from "react";
import Box, { BoxProps } from "../Box";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { StandardComponentProps, ThemeConfig } from "../theme";
import * as styles from "./styles";

export interface LocalIconButtonProps {
	children?: React.ReactNode;
	/**
	 * Change component shape.
	 *
	 * Square shape is useful to create button group.
	 */
	shapeStyle?: "round" | "square";
	/**
	 * Render `<a>` tag instead button
	 *
	 */
	href?: string;
}

export interface IconButtonProps
	extends BoxProps<"button">,
		StandardComponentProps,
		LocalIconButtonProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.IconButton?.defaultProps;
}

export const IconButton: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<IconButtonProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, IconButtonProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<IconButtonProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		children,
		className,
		href,
		disabled,
		shapeStyle,
		...otherProps
	} = props;

	return (
		<Box
			as={href && !disabled ? "a" : "button"}
			disabled={disabled}
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-icon-button"],
			})}
			ref={ref}
		>
			{children}
		</Box>
	);
});

IconButton.displayName = "PoodleIconButton";

IconButton.defaultProps = {
	shapeStyle: "round",
};

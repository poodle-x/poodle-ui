import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";

export interface LocalIconButtonProps {
	children?: React.ReactNode;
	/**
	 * Change component shape.
	 *
	 * Square shape is useful to create button group.
	 */
	shapeStyle?: "round" | "square";
}

export interface IconButtonProps
	extends BoxProps,
		StandardComponentProps,
		LocalIconButtonProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.IconButton?.defaultProps;
}

export const IconButton: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<IconButtonProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, IconButtonProps>((_props, ref) => {
	const props = useDefaultProps<IconButtonProps>(_props, {
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

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: [styles.Root, className],
			},
		},
	});

	return (
		<Box
			as={href && !disabled ? "a" : "button"}
			disabled={disabled}
			{...otherProps}
			className={classes.root}
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

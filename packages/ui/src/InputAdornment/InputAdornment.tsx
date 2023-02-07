import React from "react";
import Box, { BoxProps } from "../Box";
import { getCSSSystemBoxProps } from "../styled/system";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import * as styles from "./styles";

export interface LocalInputAdornmentProps {
	children?: React.ReactNode;
	/**
	 * Change position styles when the adornment is the first item
	 * at the begin or end.
	 */
	adornmentPosition?: "start" | "end";
	/**
	 * Change to icon styles when the adornment content is a icon.
	 */
	isIcon?: boolean;
}

export interface InputAdornmentProps
	extends BoxProps,
		StandardComponentProps,
		LocalInputAdornmentProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.InputAdornment?.defaultProps;
}

export const InputAdornment: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<InputAdornmentProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, InputAdornmentProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<InputAdornmentProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		children,
		className,
		adornmentPosition,
		isIcon,
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
				baseClassName: ["poodle-input-adornment"],
			})}
			ref={ref}
		>
			{children}
		</Box>
	);
});

InputAdornment.defaultProps = {
	adornmentPosition: "start",
};

InputAdornment.displayName = "PoodleInputAdornment";

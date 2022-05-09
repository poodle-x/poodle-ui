import React from "react";
import Box, { BoxProps } from "../Box";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import * as styles from "./styles";

export interface LocalInputProps {
	/**
	 * Input props
	 */
	inputProps?: BoxProps;
	/**
	 * Change the component style to error style when set to true.
	 */
	error?: boolean;
	/**
	 * Add prefix to the input.
	 */
	startAdornment?: React.ReactNode;
	/**
	 * Add suffix to the input.
	 */
	endAdornment?: React.ReactNode;
	/**
	 * Change input to textarea element.
	 */
	multiline?: boolean;
}

export interface InputProps
	extends BoxProps,
		StandardComponentProps,
		LocalInputProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Input?.defaultProps;
}

export const Input: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<InputProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, InputProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<InputProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		className,
		multiline,
		startAdornment,
		endAdornment,
		inputProps,
		variant,
		error,
		...otherProps
	} = props;

	const as = multiline ? "textarea" : "input";

	return (
		<Box
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-input"],
			})}
			ref={ref}
		>
			{startAdornment && startAdornment}
			<Box
				as={as}
				aria-invalid={error}
				{...getCSSSystemBoxProps({
					componentProps: props,
					partProps: inputProps,
					fnCSSSystem: styles.Input,
					baseClassName: ["poodle-input_input"],
				})}
			/>
			{endAdornment && endAdornment}
		</Box>
	);
});

Input.displayName = "PoodleInput";

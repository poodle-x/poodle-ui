import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
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
	const props = useDefaultProps<InputProps>(_props, {
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

	const classes = useClassNames(
		React.useMemo(() => {
			return {
				props,
				lists: {
					root: {
						classNames: ["poodle-input", styles.Root, className],
					},
					input: {
						classNames: ["poodle-input__input", styles.Input, className],
					},
				},
			};
		}, [className, props])
	);

	const as = multiline ? "textarea" : "input";

	return (
		<Box {...otherProps} className={classes.root} ref={ref}>
			{startAdornment && startAdornment}
			<Box
				as={as}
				aria-invalid={error}
				{...inputProps}
				className={classes.input}
			/>
			{endAdornment && endAdornment}
		</Box>
	);
});

Input.displayName = "PoodleInput";

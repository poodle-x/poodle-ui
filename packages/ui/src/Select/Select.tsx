import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";
import ArrowDown from "../icons/ArrowDown";

export interface LocalSelectProps {
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
	 * Custom select props
	 */
	selectProps?: BoxProps;
	/**
	 * Custom icon props
	 */
	iconProps?: BoxProps;
	/**
	 * Custom icon props
	 */
	dividerProps?: BoxProps;
}

export interface SelectProps
	extends BoxProps,
		StandardComponentProps,
		LocalSelectProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Select?.defaultProps;
}

export const Select: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<SelectProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, SelectProps>((_props, ref) => {
	const props = useDefaultProps<SelectProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		children,
		className,
		error,
		selectProps,
		iconProps,
		dividerProps,
		startAdornment,
		endAdornment,
		...otherProps
	} = props;

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: ["poodle-select", styles.Root, className],
			},
			native: {
				classNames: [
					"poodle-select__native",
					styles.Native,
					selectProps?.className,
				],
			},
			icon: {
				classNames: ["poodle-select__icon", styles.Icon, iconProps?.className],
			},
			divider: {
				classNames: [
					"poodle-select__divider",
					styles.Divider,
					dividerProps?.className,
				],
			},
		},
	});

	const ArrowDownIcon = props.theme?.baseIcons?.ArrowDown
		? props.theme?.baseIcons?.ArrowDown
		: ArrowDown;

	return (
		<Box {...otherProps} className={classes.root} ref={ref}>
			{startAdornment && startAdornment}
			<Box
				as="select"
				aria-invalid={error}
				{...selectProps}
				className={classes.native}
			>
				{children}
			</Box>
			<Box {...iconProps} className={classes.icon}>
				<ArrowDownIcon />
			</Box>
			{endAdornment && <Box {...dividerProps} className={classes.divider} />}
			{endAdornment}
		</Box>
	);
});

Select.displayName = "PoodleSelect";

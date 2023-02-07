import React from "react";
import Box, { BoxProps } from "../Box";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import ArrowDown from "../icons/ArrowDown";
import { getCSSSystemBoxProps } from "../styled/system";
import { StandardComponentProps, ThemeConfig } from "../theme";
import * as styles from "./styles";

export interface LocalSelectProps {
	/**
	 * Display selected value
	 */
	valueText?: React.ReactNode;
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
	selectProps?: BoxProps<"select">;
	/**
	 * Custom value text props
	 */
	valueTextProps?: BoxProps;
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
	const { props, isLocalTheme } = useDefaultProps<SelectProps>(_props, {
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
		valueTextProps,
		valueText,
		...otherProps
	} = props;

	const ArrowDownIcon = props.theme?.baseIcons?.ArrowDown
		? props.theme?.baseIcons?.ArrowDown
		: ArrowDown;

	return (
		<Box
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-select"],
			})}
			ref={ref}
		>
			{startAdornment && startAdornment}
			<Box
				aria-hidden={true}
				{...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: valueTextProps,
					fnCSSSystem: styles.ValueText,
					baseClassName: ["poodle-select__value-text"],
				})}
			>
				{valueText}
			</Box>
			<Box
				as="select"
				aria-invalid={error}
				{...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: selectProps,
					fnCSSSystem: styles.Native,
					baseClassName: ["poodle-select__select"],
				})}
			>
				{children}
			</Box>
			<Box
				{...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: iconProps,
					fnCSSSystem: styles.Icon,
					baseClassName: ["poodle-select__icon"],
				})}
			>
				<ArrowDownIcon />
			</Box>
			{endAdornment && (
				<Box
					{...getCSSSystemBoxProps({
						isLocalTheme,
						componentProps: props,
						partProps: dividerProps,
						fnCSSSystem: styles.Divider,
						baseClassName: ["poodle-select__divider"],
					})}
				/>
			)}
			{endAdornment}
		</Box>
	);
});

Select.displayName = "PoodleSelect";

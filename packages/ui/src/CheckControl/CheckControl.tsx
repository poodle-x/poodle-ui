import React from "react";
import Box, { BoxProps } from "../Box";
import useAutoId from "../hooks/useAutoId";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { StandardComponentProps, ThemeConfig } from "../theme";
import { VisuallyHidden } from "../VisuallyHidden";
import * as styles from "./styles";

export interface LocalCheckControlProps {
	checkType: "radio" | "checkbox";
	checkLabel: string;
	/**
	 * Hide label when set to **true**
	 */
	isLabelHidden?: boolean;
	/**
	 * Customize inner control props.
	 */
	controlProps?: BoxProps;
	/**
	 * Customize real input props.
	 */
	inputProps?: BoxProps<"input">;
	/**
	 * Customize render icon props.
	 */
	iconProps?: BoxProps;
	/**
	 * Customize label props.
	 */
	labelProps?: BoxProps<"label">;
	/**
	 * Customize label text props.
	 */
	labelTextProps?: BoxProps;
	/**
	 * Render icon section.
	 *
	 * The element with attribute **`data-control-checked="true"`**
	 * will responsible for display checked state.
	 * The element with attribute **`data-control-normal="true"`**
	 * will responsible for display unchecked state.
	 */
	renderIcon?: React.ReactNode;
	/**
	 * Change check control size. Built-in options are **"s" | "m" | "l"**.
	 *
	 * Default is **"m"**.
	 */
	sizeStyle?: "s" | "m" | "l" | string;
	children?: React.ReactNode;
}

export interface CheckControlProps
	extends BoxProps,
		StandardComponentProps,
		LocalCheckControlProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.CheckControl?.defaultProps;
}

export const CheckControl: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<CheckControlProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, CheckControlProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<CheckControlProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		children,
		className,
		checkLabel,
		isLabelHidden,
		checkType,
		labelProps,
		controlProps,
		inputProps,
		renderIcon,
		iconProps,
		labelTextProps,
		sizeStyle,
		...otherProps
	} = props;

	const id = useAutoId(inputProps?.id, {
		base: "poodle-check-control",
	});

	return (
		<Box
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-check-control"],
			})}
			ref={ref}
		>
			<Box
				{...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: controlProps,
					fnCSSSystem: styles.Control,
					baseClassName: ["poodle-check-control__control"],
				})}
			>
				<Box
					id={id}
					type={checkType}
					as="input"
					{...getCSSSystemBoxProps({
						isLocalTheme,
						componentProps: props,
						partProps: inputProps,
						fnCSSSystem: styles.Input,
						baseClassName: ["poodle-check-control__input"],
					})}
				/>
				<Box
					data-render-icon={true}
					aria-hidden={true}
					{...getCSSSystemBoxProps({
						isLocalTheme,
						componentProps: props,
						partProps: iconProps,
						fnCSSSystem: styles.Icon,
						baseClassName: ["poodle-check-control__icon"],
					})}
				>
					{renderIcon}
				</Box>
			</Box>
			<Box
				htmlFor={id}
				as="label"
				{...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: labelProps,
					fnCSSSystem: styles.Label,
					baseClassName: ["poodle-check-control__label"],
				})}
			>
				{isLabelHidden ? (
					<VisuallyHidden>{checkLabel}</VisuallyHidden>
				) : (
					<Box
						as="span"
						{...getCSSSystemBoxProps({
							isLocalTheme,
							componentProps: props,
							partProps: labelTextProps,
							fnCSSSystem: styles.LabelText,
							baseClassName: ["poodle-check-control__label-text"],
						})}
					>
						{checkLabel}
					</Box>
				)}
			</Box>
		</Box>
	);
});

CheckControl.defaultProps = {
	sizeStyle: "m",
};

CheckControl.displayName = "PoodleCheckControl";

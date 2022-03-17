import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";
import useAutoId from "../hooks/useAutoId";
import { VisuallyHidden } from "../VisuallyHidden";

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
	inputProps?: BoxProps;
	/**
	 * Customize render icon props.
	 */
	iconProps?: BoxProps;
	/**
	 * Customize label props.
	 */
	labelProps?: BoxProps;
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
	const props = useDefaultProps<CheckControlProps>(_props, {
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

	const classes = useClassNames({
		props: props,
		lists: {
			root: {
				classNames: ["poodle-check-control", styles.Root, className],
			},
			control: {
				classNames: [
					"poodle-check-control__control",
					styles.Control,
					controlProps?.className,
				],
			},
			input: {
				classNames: [
					"poodle-check-control__input",
					styles.Input,
					inputProps?.className,
				],
			},
			icon: {
				classNames: [
					"poodle-check-control__icon",
					styles.Icon,
					iconProps?.className,
				],
			},
			label: {
				classNames: [
					"poodle-check-control__label",
					styles.Label,
					labelProps?.className,
				],
			},
			labelText: {
				classNames: [
					"poodle-check-control__label-text",
					styles.LabelText,
					labelProps?.className,
				],
			},
		},
	});

	const id = useAutoId(inputProps?.id, {
		base: "poodle-check-control",
	});

	return (
		<Box {...otherProps} className={classes.root} ref={ref}>
			<Box {...controlProps} className={classes.control}>
				<Box
					id={id}
					type={checkType}
					as="input"
					{...inputProps}
					className={classes.input}
				/>
				<Box
					{...iconProps}
					data-render-icon={true}
					aria-hidden={true}
					className={classes.icon}
				>
					{renderIcon}
				</Box>
			</Box>
			<Box htmlFor={id} as="label" {...labelProps} className={classes.label}>
				{isLabelHidden ? (
					<VisuallyHidden>{checkLabel}</VisuallyHidden>
				) : (
					<Box as="span" {...labelTextProps} className={classes.labelText}>
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

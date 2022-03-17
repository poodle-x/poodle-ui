import React from "react";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import useCombineRefs from "../utils/useCombineRefs";
import useSafeLayoutEffect from "../utils/useSafeLayoutEffect";
import { CheckControl, CheckControlProps } from "../CheckControl";
import CheckboxButton from "../icons/CheckboxButton";
import CheckboxCheckedButton from "../icons/CheckboxCheckedButton";
import CheckboxIndeterminateButton from "../icons/CheckboxIndeterminateButton";
import * as styles from "./styles";

export interface LocalCheckboxProps {
	/**
	 * Label of the checkbox.
	 */
	label: string;
	/**
	 * Hide label when set to **true**
	 */
	isLabelHidden?: boolean;
	/**
	 * Change checkbox icon to indeterminate checkbox when set to **true**.
	 */
	isIndeterminate?: boolean;
	/**
	 * Change checkbox to checked state when set to **true**.
	 * Will override input props `checked`.
	 */
	isChecked?: boolean;
	/**
	 * Change checkbox icon to disabled state when set to **true**.
	 * Will override input props `disabled`.
	 */
	isDisabled?: boolean;
	/**
	 * Change checkbox default checked.
	 * Will override input props `defaultChecked`.
	 */
	defaultChecked?: boolean;
}

export interface CheckboxProps
	extends Omit<CheckControlProps, "checkLabel" | "checkType" | "label">,
		StandardComponentProps,
		LocalCheckboxProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Checkbox?.defaultProps;
}

export const Checkbox: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<CheckboxProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, CheckboxProps>((_props, ref) => {
	const props = useDefaultProps<CheckboxProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		label,
		isLabelHidden,
		className,
		isIndeterminate,
		inputProps,
		isChecked,
		isDisabled,
		defaultChecked,
		controlProps,
		iconProps,
		labelProps,
		...otherProps
	} = props;

	const inputRef = React.useRef<HTMLInputElement | null>(null);

	const inputCombineRef = useCombineRefs([inputRef, inputProps?.ref]);

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: ["poodle-checkbox", styles.Root, className],
			},
			control: {
				classNames: [
					"poodle-checkbox__control",
					styles.Control,
					controlProps?.className,
				],
			},
			input: {
				classNames: [
					"poodle-checkbox__input",
					styles.Input,
					inputProps?.className,
				],
			},
			icon: {
				classNames: [
					"poodle-checkbox__icon",
					styles.Icon,
					iconProps?.className,
				],
			},
			label: {
				classNames: [
					"poodle-checkbox__label",
					styles.Label,
					labelProps?.className,
				],
			},
		},
	});

	const CheckboxButtonIcon = props.theme?.baseIcons?.CheckboxButton
		? props.theme?.baseIcons.CheckboxButton
		: CheckboxButton;

	const CheckboxCheckedButtonIcon = props.theme?.baseIcons
		?.CheckboxCheckedButton
		? props.theme?.baseIcons.CheckboxCheckedButton
		: CheckboxCheckedButton;

	const CheckboxIndeterminateButtonIcon = props.theme?.baseIcons
		?.CheckboxIndeterminateButton
		? props.theme?.baseIcons.CheckboxIndeterminateButton
		: CheckboxIndeterminateButton;

	useSafeLayoutEffect(() => {
		if (inputRef.current) {
			inputRef.current.indeterminate = Boolean(isIndeterminate);
		}
	}, [isIndeterminate]);

	return (
		<CheckControl
			{...otherProps}
			ref={ref}
			isLabelHidden={isLabelHidden}
			className={classes.root}
			checkType="checkbox"
			checkLabel={label}
			renderIcon={
				<React.Fragment>
					{isIndeterminate ? (
						<CheckboxIndeterminateButtonIcon data-icon-checked="true" />
					) : (
						<CheckboxCheckedButtonIcon data-icon-checked="true" />
					)}
					<CheckboxButtonIcon data-icon-normal="true" />
				</React.Fragment>
			}
			labelProps={{
				...labelProps,
				className: classes.label,
			}}
			iconProps={{
				...iconProps,
				className: classes.icon,
			}}
			controlProps={{
				...controlProps,
				className: classes.control,
			}}
			inputProps={{
				...inputProps,
				checked: isChecked,
				disabled: isDisabled,
				defaultChecked: defaultChecked,
				ref: inputCombineRef,
			}}
		/>
	);
});

Checkbox.displayName = "PoodleCheckbox";

import React from "react";
import { CheckControl, CheckControlProps } from "../CheckControl";
import useCombineRefs from "../hooks/useCombineRefs";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import useSafeLayoutEffect from "../hooks/useSafeLayoutEffect";
import CheckboxButton from "../icons/CheckboxButton";
import CheckboxCheckedButton from "../icons/CheckboxCheckedButton";
import CheckboxIndeterminateButton from "../icons/CheckboxIndeterminateButton";
import { getCSSSystemBoxProps } from "../styled/system";
import { StandardComponentProps, ThemeConfig } from "../theme";
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
	const { props, isLocalTheme } = useDefaultProps<CheckboxProps>(_props, {
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
			ref={ref}
			isLabelHidden={isLabelHidden}
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
				...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: labelProps,
					fnCSSSystem: styles.Label,
					baseClassName: ["poodle-checkbox__label"],
				}),
			}}
			iconProps={{
				...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: iconProps,
					fnCSSSystem: styles.Icon,
					baseClassName: ["poodle-checkbox__icon"],
				}),
			}}
			controlProps={{
				...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: controlProps,
					fnCSSSystem: styles.Control,
					baseClassName: ["poodle-checkbox__control"],
				}),
			}}
			inputProps={{
				checked: isChecked,
				disabled: isDisabled,
				defaultChecked: defaultChecked,
				ref: inputCombineRef,
				...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: inputProps,
					fnCSSSystem: styles.Input,
					baseClassName: ["poodle-checkbox__input"],
				}),
			}}
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-checkbox"],
			})}
		/>
	);
});

Checkbox.displayName = "PoodleCheckbox";

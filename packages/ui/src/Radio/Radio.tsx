import React from "react";
import { CheckControl, CheckControlProps } from "../CheckControl";
import useCombineRefs from "../hooks/useCombineRefs";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import RadioButton from "../icons/RadioButton";
import RadioCheckedButton from "../icons/RadioCheckedButton";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { StandardComponentProps, ThemeConfig } from "../theme";
import * as styles from "./styles";

export interface LocalRadioProps {
	/**
	 * Label of the Radio.
	 */
	label: string;
	/**
	 * Hide label when set to **true**
	 */
	isLabelHidden?: boolean;
	/**
	 * Change Radio to checked state when set to **true**.
	 * Will override input props `checked`.
	 */
	isChecked?: boolean;
	/**
	 * Change Radio icon to disabled state when set to **true**.
	 * Will override input props `disabled`.
	 */
	isDisabled?: boolean;
	/**
	 * Change Radio default checked.
	 * Will override input props `defaultChecked`.
	 */
	defaultChecked?: boolean;
}

export interface RadioProps
	extends Omit<CheckControlProps, "checkLabel" | "checkType" | "label">,
		StandardComponentProps,
		LocalRadioProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Radio?.defaultProps;
}

export const Radio: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<RadioProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, RadioProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<RadioProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		label,
		isLabelHidden,
		className,
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

	const RadioButtonIcon = props.theme?.baseIcons?.RadioButton
		? props.theme?.baseIcons.RadioButton
		: RadioButton;

	const RadioCheckedButtonIcon = props.theme?.baseIcons?.RadioCheckedButton
		? props.theme?.baseIcons.RadioCheckedButton
		: RadioCheckedButton;

	return (
		<CheckControl
			ref={ref}
			isLabelHidden={isLabelHidden}
			checkType="radio"
			checkLabel={label}
			renderIcon={
				<React.Fragment>
					<RadioCheckedButtonIcon data-icon-checked="true" />
					<RadioButtonIcon data-icon-normal="true" />
				</React.Fragment>
			}
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-radio"],
			})}
			labelProps={{
				...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: labelProps,
					fnCSSSystem: styles.Label,
					baseClassName: ["poodle-radio__label"],
				}),
			}}
			iconProps={{
				...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: iconProps,
					fnCSSSystem: styles.Icon,
					baseClassName: ["poodle-radio__icon"],
				}),
			}}
			controlProps={{
				...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: controlProps,
					fnCSSSystem: styles.Control,
					baseClassName: ["poodle-radio__control"],
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
					baseClassName: ["poodle-radio__input"],
				}),
			}}
		/>
	);
});

Radio.displayName = "PoodleRadio";

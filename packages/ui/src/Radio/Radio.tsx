import React from "react";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import useCombineRefs from "../utils/useCombineRefs";
import { CheckControl, CheckControlProps } from "../CheckControl";
import RadioButton from "../icons/RadioButton";
import RadioCheckedButton from "../icons/RadioCheckedButton";
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
	const props = useDefaultProps<RadioProps>(_props, {
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

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: ["poodle-radio", styles.Root, className],
			},
			control: {
				classNames: [
					"poodle-Radio__control",
					styles.Control,
					controlProps?.className,
				],
			},
			input: {
				classNames: [
					"poodle-radio__input",
					styles.Input,
					inputProps?.className,
				],
			},
			icon: {
				classNames: ["poodle-radio__icon", styles.Icon, iconProps?.className],
			},
			label: {
				classNames: [
					"poodle-radio__label",
					styles.Label,
					labelProps?.className,
				],
			},
		},
	});

	const RadioButtonIcon = props.theme?.baseIcons?.RadioButton
		? props.theme?.baseIcons.RadioButton
		: RadioButton;

	const RadioCheckedButtonIcon = props.theme?.baseIcons?.RadioCheckedButton
		? props.theme?.baseIcons.RadioCheckedButton
		: RadioCheckedButton;

	return (
		<CheckControl
			{...otherProps}
			ref={ref}
			isLabelHidden={isLabelHidden}
			className={classes.root}
			checkType="radio"
			checkLabel={label}
			renderIcon={
				<React.Fragment>
					<RadioCheckedButtonIcon data-icon-checked="true" />
					<RadioButtonIcon data-icon-normal="true" />
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

Radio.displayName = "PoodleRadio";

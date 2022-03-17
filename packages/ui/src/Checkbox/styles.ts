import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { CheckboxProps } from "./Checkbox";
import { CheckboxStyleKeys } from "./";

export function Root(props: CheckboxProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<CheckboxStyleKeys>({
		key: "root",
		config: theme?.Checkbox,
		props,
		base: [],
	});
}

export function Control(props: CheckboxProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<CheckboxStyleKeys>({
		key: "control",
		config: theme?.Checkbox,
		props,
		base: [],
	});
}

export function Input(props: CheckboxProps): CSSSystem {
	const { theme } = props;
	return createCSSSystemStandard<CheckboxStyleKeys>({
		key: "input",
		config: theme?.Checkbox,
		props,
		base: [],
	});
}

export function Icon(props: CheckboxProps): CSSSystem {
	const { theme } = props;
	return createCSSSystemStandard<CheckboxStyleKeys>({
		key: "icon",
		config: theme?.Checkbox,
		props,
		base: [],
	});
}

export function Label(props: CheckboxProps): CSSSystem {
	const { theme } = props;
	return createCSSSystemStandard<CheckboxStyleKeys>({
		key: "label",
		config: theme?.Checkbox,
		props,
		base: [],
	});
}

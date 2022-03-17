import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { RadioProps } from "./Radio";
import { RadioStyleKeys } from "./";

export function Root(props: RadioProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<RadioStyleKeys>({
		key: "root",
		config: theme?.Radio,
		props,
		base: [{}],
	});
}

export function Control(props: RadioProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<RadioStyleKeys>({
		key: "control",
		config: theme?.Radio,
		props,
		base: [{}],
	});
}

export function Input(props: RadioProps): CSSSystem {
	const { theme } = props;
	return createCSSSystemStandard<RadioStyleKeys>({
		key: "input",
		config: theme?.Radio,
		props,
		base: [{}],
	});
}

export function Icon(props: RadioProps): CSSSystem {
	const { theme } = props;
	return createCSSSystemStandard<RadioStyleKeys>({
		key: "icon",
		config: theme?.Radio,
		props,
		base: [{}],
	});
}

export function Label(props: RadioProps): CSSSystem {
	const { theme } = props;
	return createCSSSystemStandard<RadioStyleKeys>({
		key: "label",
		config: theme?.Radio,
		props,
		base: [{}],
	});
}

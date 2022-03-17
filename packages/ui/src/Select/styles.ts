import { createCSSSystemStandard } from "../theme";
import { CSSObjectSystem, CSSSystem } from "../styled";
import { SelectProps } from "./Select";
import { SelectStyleKeys } from "./index";

export function Root(props: SelectProps): CSSSystem {
	const { theme, error } = props;

	let errorStyles: CSSObjectSystem = {};

	if (error) {
		errorStyles = {
			borderColor: "negative.base",

			"&:focus-within": {
				borderColor: "negative.base",
			},
			"&:hover": {
				borderColor: "negative.base",
			},
		};
	}

	return createCSSSystemStandard<SelectStyleKeys>({
		key: "root",
		config: theme?.Select,
		props,
		base: [
			{
				position: "relative",
				display: "flex",
				alignItems: "center",
				width: "100%",
				boxSizing: "border-box",
				borderRadius: "4px",
				border: "1px solid",
				borderColor: "border.base",
				backgroundColor: "#fff",
				transition: "125ms border-color ease-in",

				"&:focus-within": {
					borderColor: "primary.base",
				},
				"&:hover": {
					borderColor: "primary.base",
				},
			},
			errorStyles,
		],
	});
}

export function Native(props: SelectProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<SelectStyleKeys>({
		key: "native",
		config: theme?.Select,
		props,
		base: [
			{
				paddingX: "scale-2",
				paddingY: "scale-2.5",
				width: "100%",
				border: "none",
				outline: "none",
				boxSizing: "content-box",
				background: "transparent",
				textStyle: "input",
				appearance: "none",

				"&:disabled": {
					cursor: "not-allowed",
					color: "disabledText",
				},
			},
		],
	});
}

export function Icon(props: SelectProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<SelectStyleKeys>({
		key: "icon",
		config: theme?.Select,
		props,
		base: [
			{
				display: "flex",
				paddingRight: "scale-2",
				height: "100%",
				alignItems: "center",
				fontSize: "1.5rem",
				pointerEvents: "none",
			},
		],
	});
}

export function Divider(props: SelectProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<SelectStyleKeys>({
		key: "divider",
		config: theme?.Select,
		props,
		base: [
			{
				display: "flex",
				width: "1px",
				height: "1rem",
				backgroundColor: "border.base",
				marginRight: "scale-2",
			},
		],
	});
}

import { createCSSSystemStandard } from "../theme";
import { CheckControlProps } from "./CheckControl";
import { CSSObjectSystem, CSSSystem } from "../styled";
import { CheckControlStyleKeys } from "./";

export function Root(props: CheckControlProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<CheckControlStyleKeys>({
		key: "root",
		config: theme?.CheckControl,
		props,
		base: [
			{
				display: "inline-flex",
				alignItems: "center",
				position: "relative",
				color: "text",
				transition: "color 150ms ease-in",

				"&:hover": {
					color: "primary",
				},

				"&:focus-within": {
					color: "primary",
				},
			},
		],
	});
}

export function Control(props: CheckControlProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<CheckControlStyleKeys>({
		key: "control",
		config: theme?.CheckControl,
		props,
		base: [
			{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				border: "1px dotted",
				borderColor: "transparent",
				position: "absolute",
				top: "0",
				left: 0,
				height: "100%",
				overflow: "hidden",
				transition: "borderColor 120ms ease-in",

				"&:focus-within": {
					borderColor: "rgba(0,0,0,0.8)",
				},
			},
		],
	});
}

export function Input(props: CheckControlProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<CheckControlStyleKeys>({
		key: "input",
		config: theme?.CheckControl,
		props,
		base: [
			{
				position: "absolute",
				top: 0,
				left: -99,
				width: 0,
				height: 0,
				border: 0,
				margin: 0,
				padding: 0,

				"& ~ *[data-render-icon='true'] *[data-icon-checked='true']": {
					display: "none",
				},

				"&:checked ~ *[data-render-icon='true'] *[data-icon-normal='true']": {
					display: "none",
				},

				"&:checked ~ *[data-render-icon='true'] *[data-icon-checked='true']": {
					display: "initial",
					color: "primary",
				},

				"&:disabled ~ *[data-render-icon='true'] *[data-icon-checked='true']": {
					color: "disabledText",
				},

				"&:disabled ~ *[data-render-icon='true'] *[data-icon-normal='true']": {
					color: "disabledText",
				},
			},
		],
	});
}

export function Label(props: CheckControlProps): CSSSystem {
	const { theme, sizeStyle = "" } = props;

	let textStyle = "";

	let styles: CSSObjectSystem = {
		display: "inline-flex",
		alignItems: "center",
		position: "relative",
		cursor: "pointer",
		textStyle,
	};

	switch (sizeStyle) {
		case "s": {
			textStyle = "checkControlLabelSmall";
			styles = {
				...styles,
				minHeight: "1.25rem",
				paddingLeft: "1.25rem",
			};
			break;
		}
		case "l": {
			textStyle = "checkControlLabelLarge";
			styles = {
				...styles,
				minHeight: "1.75rem",
				paddingLeft: "1.75rem",
			};
			break;
		}
		default:
		case "m": {
			textStyle = "checkControlLabelMedium";
			styles = {
				...styles,
				minHeight: "1.5rem",
				paddingLeft: "1.5rem",
			};
			break;
		}
	}

	return createCSSSystemStandard<CheckControlStyleKeys>({
		key: "label",
		config: theme?.CheckControl,
		props,
		base: [styles],
	});
}

export function LabelText(props: CheckControlProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<CheckControlStyleKeys>({
		key: "labelText",
		config: theme?.CheckControl,
		props,
		base: [
			{
				paddingLeft: "scale-2",
			},
		],
	});
}

export function Icon(props: CheckControlProps): CSSSystem {
	const { theme, sizeStyle = "" } = props;

	let sizeStyles: CSSObjectSystem = {};

	switch (sizeStyle) {
		case "s": {
			sizeStyles = {
				fontSize: "1.25rem",
				height: "1.25rem",
				width: "1.25rem",
			};
			break;
		}
		case "l": {
			sizeStyles = {
				fontSize: "1.75rem",
				height: "1.75rem",
				width: "1.75rem",
			};
			break;
		}
		default:
		case "m": {
			sizeStyles = {
				fontSize: "1.5rem",
				height: "1.5rem",
				width: "1.5rem",
			};
			break;
		}
	}

	return createCSSSystemStandard<CheckControlStyleKeys>({
		key: "icon",
		config: theme?.CheckControl,
		props,
		base: [{ display: "flex" }, sizeStyles],
	});
}

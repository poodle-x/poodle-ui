import { createCSSSystemStandard } from "../theme";
import { CSSObjectSystem, CSSSystem } from "../styled";
import { IconButtonProps } from "./IconButton";
import { IconButtonStyleKeys } from "./";

export function Root(props: IconButtonProps): CSSSystem {
	const { theme, shapeStyle, disabled, colorStyle } = props;

	let shapeStyles: CSSObjectSystem = {};
	let colorStyles: CSSObjectSystem = {};

	if (!disabled) {
		switch (colorStyle) {
			case "primary": {
				colorStyles = {
					color: "primary",

					"&:hover, &:focus": {
						color: "primary.textOnLight",
						backgroundColor: "primary.light",
					},
				};
				break;
			}
			case "negative": {
				colorStyles = {
					color: "negative",

					"&:hover, &:focus": {
						color: "negative.textOnLight",
						backgroundColor: "negative.light",
					},
				};
				break;
			}
			case "positive": {
				colorStyles = {
					color: "positive",

					"&:hover, &:focus": {
						color: "positive.textOnLight",
						backgroundColor: "positive.light",
					},
				};
				break;
			}
			case "warn": {
				colorStyles = {
					color: "warn",

					"&:hover, &:focus": {
						color: "warn.textOnLight",
						backgroundColor: "warn.light",
					},
				};
				break;
			}
		}
	}

	if (shapeStyle === "round") {
		shapeStyles = {
			borderRadius: "50%",
		};
	}

	if (shapeStyle === "square") {
		shapeStyles = {
			borderRadius: "base",
		};
	}

	return createCSSSystemStandard<IconButtonStyleKeys>({
		key: "root",
		config: theme?.IconButton,
		props,
		base: [
			{
				display: "inline-flex",
				alignSelf: "center",
				justifyContent: "center",
				border: 0,
				padding: "scale-2",
				pointerEvents: "initial",
				fontSize: "1.5rem",
				color: "text",
				cursor: "pointer",
				backgroundColor: "transparent",
				outline: "none",
				appearance: "none",
				transition: "background-color 220ms ease-in, color 220ms ease-in",
				...shapeStyles,

				"&:hover, &:focus": {
					color: "bg.textOn100",
					backgroundColor: "bg.100",
				},

				"&:disabled": {
					color: "disabledText",
					cursor: "not-allowed",
				},
			},
			colorStyles,
		],
	});
}

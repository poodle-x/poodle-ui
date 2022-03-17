import { getSpacing, createCSSSystemStandard } from "../theme";
import { ButtonProps } from "./Button";
import safeThemeUnitValue from "../utils/safeThemeValue";
import { CSSObjectSystem, CSSSystem } from "../styled";

function getSizeStyles(props: ButtonProps) {
	const { variant = "", sizeStyle = "" } = props;
	const baseSize1 = safeThemeUnitValue(getSpacing("scale-1")(props));
	const baseSize2 = safeThemeUnitValue(getSpacing("scale-2")(props));
	const baseSize3 = safeThemeUnitValue(getSpacing("scale-3")(props));
	const baseSize4 = safeThemeUnitValue(getSpacing("scale-4")(props));

	let baseSizeStyles: CSSObjectSystem = {};

	if (variant === "outline") {
		switch (sizeStyle) {
			case "s": {
				baseSizeStyles = {
					padding: `calc(${baseSize1} - 1px) ${baseSize4}`,
				};
				break;
			}
			case "m": {
				baseSizeStyles = {
					padding: `calc(${baseSize2} - 1px) ${baseSize4}`,
				};
				break;
			}
			case "l": {
				baseSizeStyles = {
					padding: `calc(${baseSize3} - 1px) ${baseSize4}`,
				};
				break;
			}
		}
	} else {
		switch (sizeStyle) {
			case "s": {
				baseSizeStyles = {
					padding: `${baseSize1} ${baseSize4}`,
				};
				break;
			}
			case "m": {
				baseSizeStyles = {
					padding: `${baseSize2} ${baseSize4}`,
				};
				break;
			}
			case "l": {
				baseSizeStyles = {
					padding: `${baseSize3} ${baseSize4}`,
				};
				break;
			}
		}
	}
	return baseSizeStyles;
}

function getButtonVariant(props: ButtonProps) {
	const { variant = "", colorStyle = "" } = props;

	let colorStyles: CSSObjectSystem = {};

	function createThemeButtonOutline(color: {
		border: string;
		color: string;
		borderFocus: string;
		bgFocus: string;
		colorFocus?: string;
	}): CSSObjectSystem {
		return {
			border: `1px solid`,
			borderColor: color.border,
			color: color.color,
			"&:hover, &:focus": {
				borderColor: color.border,
				backgroundColor: color.bgFocus,
				color: color.colorFocus,
				textDecoration: "underline",
			},
		};
	}

	const createThemeButtonCore = (color: {
		text: string;
		bg: string;
		bgFocus: string;
		textBgFocus?: string;
		ring: string;
	}): CSSObjectSystem => {
		return {
			color: color.text,
			backgroundColor: color.bg,
			"&:hover, &:focus": {
				color: color.textBgFocus,
				backgroundColor: color.bgFocus,
				textDecoration: "underline",
			},

			// A11y ring
			"&:focus::before": {
				position: "absolute",
				zIndex: -1,
				top: -4,
				right: -4,
				bottom: -4,
				left: -4,
				border: `2px dotted`,
				borderColor: color.ring,
				borderRadius: "base",
				content: "''",
			},
		};
	};

	switch (variant) {
		case "default": {
			if (props.disabled) {
				colorStyles = {
					"&:disabled": {
						color: "disabledText",
					},
				};
			} else {
				switch (colorStyle) {
					default: {
						colorStyles = createThemeButtonCore({
							text: colorStyle,
							bg: "transparent",
							bgFocus: `${colorStyle}.light`,
							textBgFocus: `${colorStyle}.textOnLight`,
							ring: colorStyle,
						});
						break;
					}

					case "default": {
						colorStyles = createThemeButtonCore({
							text: "text",
							bg: "transparent",
							bgFocus: "bg.100",
							textBgFocus: "bg.textOn100",
							ring: "text",
						});
						break;
					}
				}
			}

			break;
		}

		case "outline": {
			if (props.disabled) {
				colorStyles = {
					border: `1px solid`,
					borderColor: "bg.100",
					color: "disabledText",
				};
			} else {
				switch (colorStyle) {
					case "default": {
						colorStyles = createThemeButtonOutline({
							border: "bg.200",
							color: "text",
							borderFocus: "text",
							bgFocus: "bg.100",
							colorFocus: "bg.textOn100",
						});
						break;
					}

					default: {
						colorStyles = createThemeButtonOutline({
							border: colorStyle,
							color: colorStyle,
							borderFocus: `${colorStyle}.dark`,
							bgFocus: `${colorStyle}.light`,
							colorFocus: `${colorStyle}.textOnLight`,
						});
						break;
					}
				}
			}

			break;
		}

		case "fill": {
			if (props.disabled) {
				colorStyles = {
					backgroundColor: "bg.100",
					color: "disabledText",
				};
			} else {
				switch (colorStyle) {
					case "default": {
						colorStyles = createThemeButtonCore({
							text: "bg.textOn100",
							bg: "bg.100",
							bgFocus: "bg.200",
							textBgFocus: "bg.textOn200",
							ring: "text",
						});
						break;
					}
					default: {
						colorStyles = createThemeButtonCore({
							text: `${colorStyle}.textOnBase`,
							bg: colorStyle,
							bgFocus: `${colorStyle}.dark`,
							textBgFocus: `${colorStyle}.textOnDark`,
							ring: colorStyle,
						});
						break;
					}
				}
			}
			break;
		}
	}

	return colorStyles;
}

export function Root(props: ButtonProps): CSSSystem {
	const { theme } = props;

	return {
		...createCSSSystemStandard({
			key: "root",
			config: theme?.Button,
			props,
			base: [
				{
					position: "relative",
					display: "inline-flex",
					justifyContent: "center",
					minWidth: "80px",
					padding: "scale-1",
					backgroundColor: "transparent",
					borderRadius: "base",
					border: "0",
					cursor: "pointer",
					outline: "0",
					WebkitAppearance: "none",
					transition:
						"background-color 220ms ease-in, border-color 110ms ease-in, color 220ms ease-in",
					textDecoration: "none",
					textStyle: "button",

					":disabled": {
						cursor: "not-allowed",
					},
				},
				getButtonVariant(props),
				getSizeStyles(props),
			],
		}),
	};
}

export function Content(props: ButtonProps): CSSSystem {
	const { theme } = props;

	return {
		...createCSSSystemStandard({
			key: "content",
			config: theme?.Button,
			props,
			base: [
				{
					display: "flex",
					width: "100%",
					justifyContent: "center",
				},
			],
		}),
	};
}

export function Icon(props: ButtonProps): CSSSystem {
	const { theme } = props;

	return {
		...createCSSSystemStandard({
			key: "icon",
			config: theme?.Button,
			props,
			base: [
				{
					fontSize: "1.5rem",
					width: "1.5rem",
					height: "1.5rem",

					"& > svg": {
						fontSize: "1.5rem",
					},
				},
			],
		}),
	};
}

export function StartIcon(props: ButtonProps): CSSSystem {
	const { theme } = props;

	return {
		...createCSSSystemStandard({
			key: "startIcon",
			config: theme?.Button,
			props,
			base: [
				{
					marginRight: "scale-1",
				},
			],
		}),
	};
}

export function EndIcon(props: ButtonProps): CSSSystem {
	const { theme } = props;

	return {
		...createCSSSystemStandard({
			key: "endIcon",
			config: theme?.Button,
			props,
			base: [
				{
					marginLeft: "scale-1",
				},
			],
		}),
	};
}

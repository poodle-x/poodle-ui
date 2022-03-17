import { createCSSSystemStandard } from "../theme";
import { CSSObjectSystem, CSSSystem } from "../styled";
import { ModalHeaderProps } from "./ModalHeader";
import { ModalHeaderStyleKeys } from "./index";

export function Root(props: ModalHeaderProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<ModalHeaderStyleKeys>({
		key: "root",
		config: theme?.ModalHeader,
		props,
		base: [
			{
				pt: "scale-4",
				px: "scale-6",
				display: "flex",
				alignItems: "center",
			},
		],
	});
}

export function Content(props: ModalHeaderProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<ModalHeaderStyleKeys>({
		key: "content",
		config: theme?.ModalHeader,
		props,
		base: [
			{
				display: "flex",
				alignItems: "center",
				my: 0,
			},
		],
	});
}

export function Close(props: ModalHeaderProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<ModalHeaderStyleKeys>({
		key: "close",
		config: theme?.ModalHeader,
		props,
		base: [
			{
				ml: "auto",
			},
		],
	});
}

export function Icon(props: ModalHeaderProps): CSSSystem {
	const { theme, colorStyle } = props;

	let colorStyles: CSSObjectSystem = {};

	switch (colorStyle) {
		case "primary": {
			colorStyles = {
				color: "primary.base",
			};
			break;
		}
		case "negative": {
			colorStyles = {
				color: "negative.base",
			};
			break;
		}

		case "positive": {
			colorStyles = {
				color: "positive.base",
			};
			break;
		}

		case "warn": {
			colorStyles = {
				color: "warn.base",
			};
			break;
		}
	}

	return createCSSSystemStandard<ModalHeaderStyleKeys>({
		key: "icon",
		config: theme?.ModalHeader,
		props,
		base: [
			{
				height: "2rem",
				width: "2rem",
				fontSize: "2rem",
				mr: "scale-2",
			},
			colorStyles,
		],
	});
}

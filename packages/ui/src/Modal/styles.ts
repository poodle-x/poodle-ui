import { getSpacing } from "@poodle/system";
import { createCSSSystemStandard } from "../theme";
import { CSSObjectSystem, CSSSystem } from "../styled";
import { ModalProps } from "./Modal";
import safeThemeUnitValue from "../utils/safeThemeValue";
import { ModalStyleKeys } from "./index";

export function Root(props: ModalProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<ModalStyleKeys>({
		key: "root",
		config: theme?.Modal,
		props,
		base: [
			{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: "modal",
			},
		],
	});
}

export function Overlay(props: ModalProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<ModalStyleKeys>({
		key: "overlay",
		config: theme?.Modal,
		props,
		base: [
			{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: -1,
				backgroundColor: "rgba(0, 0, 0, 0.25)",
			},
		],
	});
}

export function Inner(props: ModalProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard({
		key: "inner",
		config: theme?.Modal,
		props,
		base: [
			{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				outline: "none",
			},
		],
	});
}

export function Container(props: ModalProps): CSSSystem {
	const { theme } = props;

	const topBottomMargin = getSpacing("scale-20")({ theme });

	return createCSSSystemStandard<ModalStyleKeys>({
		key: "container",
		config: theme?.Modal,
		props,
		base: [
			{
				maxHeight: `calc(100% - ${`${safeThemeUnitValue(topBottomMargin)}`})`,
				mx: "scale-4",
				my: "scale-10",
				width: "100%",
				maxWidth: "600px",
			},
		],
	});
}

export function Modal(props: ModalProps): CSSSystem {
	const { theme, colorStyle } = props;

	let colorStyles: CSSObjectSystem = {};

	switch (colorStyle) {
		case "primary": {
			colorStyles = {
				borderTop: "4px solid",
				borderColor: "primary.base",
			};
			break;
		}
		case "negative": {
			colorStyles = {
				borderTop: "4px solid",
				borderColor: "negative.base",
			};
			break;
		}
		case "positive": {
			colorStyles = {
				borderTop: "4px solid",
				borderColor: "positive.base",
			};
			break;
		}
		case "warn": {
			colorStyles = {
				borderTop: "4px solid",
				borderColor: "warn.base",
			};
			break;
		}
	}

	return createCSSSystemStandard({
		key: "modal",
		config: theme?.Modal,
		props,
		base: [
			{
				width: "100%",
				maxHeight: "100%",
				borderRadius: "4px",
				backgroundColor: "modal.base",
				boxShadow: "lv1",
			},
			colorStyles,
		],
	});
}

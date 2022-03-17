import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { InputProps } from "./Input";
import { InputStyleKeys } from "./";

export function Root(props: InputProps): CSSSystem {
	const { error, theme } = props;

	return createCSSSystemStandard<InputStyleKeys>({
		key: "root",
		config: theme?.Input,
		props,
		base: [
			{
				display: "flex",
				alignItems: "center",
				width: "100%",
				boxSizing: "border-box",
				borderRadius: "4px",
				border: "1px solid",
				borderColor: error ? "negative.base" : "border.base",
				backgroundColor: "#fff",
				transition: "125ms border-color ease-in",
				paddingX: "scale-2",
				paddingY: "scale-2",

				"&:focus-within": {
					borderColor: "primary.base",
				},
				"&:hover": {
					borderColor: "primary.base",
				},
			},
		],
	});
}

export function Input(props: InputProps): CSSSystem {
	const { theme } = props;
	return createCSSSystemStandard<InputStyleKeys>({
		key: "input",
		config: theme?.Input,
		props,
		base: [
			{
				padding: 0,
				width: "100%",
				height: "100%",
				border: "none",
				outline: "none",
				resize: "none",
				boxSizing: "content-box",
				background: "transparent",
				textStyle: "input",
			},
		],
	});
}

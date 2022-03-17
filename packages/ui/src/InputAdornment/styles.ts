import { createCSSSystemStandard } from "../theme";
import { CSSObjectSystem, CSSSystem } from "../styled";
import { InputAdornmentProps } from "./InputAdornment";
import { InputAdornmentStyleKeys } from "./";

export function Root(props: InputAdornmentProps): CSSSystem {
	const { theme, adornmentPosition, isIcon } = props;

	let positionStyles: CSSObjectSystem = {};
	let iconStyles: CSSObjectSystem = {};

	if (adornmentPosition === "start") {
		positionStyles = {
			paddingLeft: "scale-2",
		};
	} else {
		positionStyles = {
			paddingRight: "scale-2",
		};
	}

	if (isIcon) {
		iconStyles = {
			fontSize: "1.5rem",
		};
	}

	return createCSSSystemStandard<InputAdornmentStyleKeys>({
		key: "root",
		config: theme?.InputAdornment,
		props,
		base: [
			{
				display: "flex",
				color: "text",
				alignItems: "center",
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				textStyle: "input",
				...(positionStyles as CSSObjectSystem),
				...iconStyles,
			},
		],
	});
}

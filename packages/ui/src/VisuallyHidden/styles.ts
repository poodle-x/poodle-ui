import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { VisuallyHiddenProps } from "./VisuallyHidden";
import { VisuallyHiddenStyleKeys } from "./index";

export function Root(props: VisuallyHiddenProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<VisuallyHiddenStyleKeys>({
		key: "root",
		config: theme?.VisuallyHidden,
		props,
		base: [
			{
				clip: "rect(0 0 0 0)",
				clipPath: "inset(50%)",
				height: "1px",
				overflow: "hidden",
				position: "absolute",
				whiteSpace: "nowrap",
				width: "1px",
			},
		],
	});
}

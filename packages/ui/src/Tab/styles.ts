import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { TabProps } from "./Tab";

export function Root(props: TabProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard({
		key: "root",
		config: theme?.Tab,
		props,
		base: [
			{
				minWidth: "100px",
				px: "scale-4",
				py: "scale-2",
				outline: "none",
				border: `2px solid transparent`,
				cursor: "pointer",
				color: "text",
				backGroundColor: "transparent",

				"&:focus": {
					border: `2px dotted`,
					borderColor: "primary.base",
				},

				'&[aria-selected="true"][data-orientation="vertical"]': {
					color: "primary.base",
					borderRight: "2px solid",
					borderRightColor: "primary.base",
				},

				'&[aria-selected="true"][data-orientation="horizontal"]': {
					color: "primary.base",
					borderBottom: "2px solid",
					borderBottomColor: "primary.base",
				},

				"&:disabled": {
					color: "disabledText",
					cursor: "not-allowed",
				},
			},
		],
	});
}

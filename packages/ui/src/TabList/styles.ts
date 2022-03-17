import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { TabListProps } from "./TabList";

export function Root(props: TabListProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard({
		key: "root",
		config: theme?.TabList,
		props,
		base: [
			{
				display: "flex",
				justifyContent: "flex-start",

				"&[aria-orientation='horizontal']": {
					flexDirection: "row",
					borderBottom: "1px solid",
					borderColor: "border",
				},

				"&[aria-orientation='vertical']": {
					flexDirection: "column",
					borderRight: "1px solid",
					borderColor: "border",
				},
			},
		],
	});
}

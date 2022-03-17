import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { TabsProps } from "./Tabs";
import { TabsStyleKeys } from "./index";
import { TabOrientation } from "../hooks/useTabsState";

export function Root(props: TabsProps): CSSSystem {
	const { theme, orientation = TabOrientation.HORIZONTAL } = props;

	return createCSSSystemStandard<TabsStyleKeys>({
		key: "root",
		config: theme?.Tabs,
		props,
		base: [
			{
				display: "flex",
				flexDirection:
					orientation === TabOrientation.VERTICAL ? "row" : "column",
			},
		],
	});
}

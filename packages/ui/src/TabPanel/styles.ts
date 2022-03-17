import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { TabPanelProps } from "./TabPanel";

export function Root(props: TabPanelProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard({
		key: "root",
		config: theme?.TabPanel,
		props,
		base: [
			{
				paddingY: "scale-4",
				paddingX: "scale-4",
				outline: "none",
			},
		],
	});
}

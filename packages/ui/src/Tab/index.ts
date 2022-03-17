import { Tab, TabProps } from "./Tab";
import { StandardThemeConfig } from "../theme";

export * from "./Tab";

export default Tab;

export type TabStyleKeys = "root";

export interface TabThemeConfig
	extends StandardThemeConfig<TabStyleKeys, TabProps> {}

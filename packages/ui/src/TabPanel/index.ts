import { TabPanel, TabPanelProps } from "./TabPanel";
import { StandardThemeConfig } from "../theme";

export * from "./TabPanel";

export default TabPanel;

export type TabPanelStyleKeys = "root";

export interface TabPanelThemeConfig
	extends StandardThemeConfig<TabPanelStyleKeys, TabPanelProps> {}

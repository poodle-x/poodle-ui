import { TabList, TabListProps } from "./TabList";
import { StandardThemeConfig } from "../theme";

export * from "./TabList";

export default TabList;

export type TabListStyleKeys = "root";

export interface TabListThemeConfig
	extends StandardThemeConfig<TabListStyleKeys, TabListProps> {}

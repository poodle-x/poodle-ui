import { Tabs, TabsProps } from "./Tabs";
import { StandardThemeConfig } from "../theme";
import { TabValue, TabsContext, TabsContextValue } from "../hooks/useTabsState";

export * from "./Tabs";

export default Tabs;

export type TabsStyleKeys = "root" | "list";

export interface TabsThemeConfig
	extends StandardThemeConfig<TabsStyleKeys, TabsProps> {}

export { TabValue, TabsContext, TabsContextValue };

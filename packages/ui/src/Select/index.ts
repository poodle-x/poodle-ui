import { Select, SelectProps } from "./Select";
import { StandardThemeConfig } from "../theme";

export * from "./Select";

export default Select;

export type SelectStyleKeys = "root" | "native" | "icon" | "divider";

export interface SelectThemeConfig
	extends StandardThemeConfig<SelectStyleKeys, SelectProps> {}

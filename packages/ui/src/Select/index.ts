import { StandardThemeConfig } from "../theme";
import { Select, SelectProps } from "./Select";

export * from "./Select";

export default Select;

export type SelectStyleKeys =
	| "root"
	| "native"
	| "icon"
	| "divider"
	| "valueText";

export interface SelectThemeConfig
	extends StandardThemeConfig<SelectStyleKeys, SelectProps> {}

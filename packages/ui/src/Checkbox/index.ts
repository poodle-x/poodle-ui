import { Checkbox, CheckboxProps } from "./Checkbox";
import { StandardThemeConfig } from "../theme";

export * from "./Checkbox";

export default Checkbox;

export type CheckboxStyleKeys = "root" | "control" | "input" | "icon" | "label";

export interface CheckboxThemeConfig
	extends StandardThemeConfig<CheckboxStyleKeys, CheckboxProps> {}

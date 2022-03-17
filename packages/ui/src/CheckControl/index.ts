import { CheckControl, CheckControlProps } from "./CheckControl";
import { StandardThemeConfig } from "../theme";

export * from "./CheckControl";

export default CheckControl;

export type CheckControlStyleKeys =
	| "root"
	| "control"
	| "input"
	| "icon"
	| "label"
	| "labelText";

export interface CheckControlThemeConfig
	extends StandardThemeConfig<CheckControlStyleKeys, CheckControlProps> {}

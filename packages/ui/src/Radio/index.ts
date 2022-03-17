import { Radio, RadioProps } from "./Radio";
import { StandardThemeConfig } from "../theme";

export * from "./Radio";

export default Radio;

export type RadioStyleKeys = "root" | "control" | "input" | "icon" | "label";

export interface RadioThemeConfig
	extends StandardThemeConfig<RadioStyleKeys, RadioProps> {}

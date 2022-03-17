import { Input, InputProps } from "./Input";
import { StandardThemeConfig } from "../theme";

export * from "./Input";

export default Input;

export type InputStyleKeys = "root" | "input";

export interface InputThemeConfig
	extends StandardThemeConfig<InputStyleKeys, InputProps> {}

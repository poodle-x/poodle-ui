import { InputAdornment, InputAdornmentProps } from "./InputAdornment";
import { StandardThemeConfig } from "../theme";

export * from "./InputAdornment";

export default InputAdornment;

export type InputAdornmentStyleKeys = "root";

export interface InputAdornmentThemeConfig
	extends StandardThemeConfig<InputAdornmentStyleKeys, InputAdornmentProps> {}

import { StandardThemeConfig } from "../theme";
import * as styles from "./styles";
import { ButtonProps, Button } from "./Button";

export { styles as buttonStyles };

export * from "./Button";

export default Button;

export type ButtonStyleKeys =
	| "root"
	| "content"
	| "icon"
	| "startIcon"
	| "endIcon";

export interface ButtonThemeConfig
	extends StandardThemeConfig<ButtonStyleKeys, ButtonProps> {}

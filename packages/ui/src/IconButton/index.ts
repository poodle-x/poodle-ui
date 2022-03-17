import { IconButton, IconButtonProps } from "./IconButton";
import { StandardThemeConfig } from "../theme";

export * from "./IconButton";

export default IconButton;

export type IconButtonStyleKeys = "root";

export interface IconButtonThemeConfig
	extends StandardThemeConfig<IconButtonStyleKeys, IconButtonProps> {}

import { ModalHeader, ModalHeaderProps } from "./ModalHeader";
import { StandardThemeConfig } from "../theme";

export * from "./ModalHeader";

export default ModalHeader;

export type ModalHeaderStyleKeys = "root" | "content" | "close" | "icon";

export interface ModalHeaderThemeConfig
	extends StandardThemeConfig<ModalHeaderStyleKeys, ModalHeaderProps> {}

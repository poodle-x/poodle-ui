import { ModalFooter, ModalFooterProps } from "./ModalFooter";
import { StandardThemeConfig } from "../theme";

export * from "./ModalFooter";

export default ModalFooter;

export type ModalFooterStyleKeys = "root";

export interface ModalFooterThemeConfig
	extends StandardThemeConfig<ModalFooterStyleKeys, ModalFooterProps> {}

import { ModalBody, ModalBodyProps } from "./ModalBody";
import { StandardThemeConfig } from "../theme";

export * from "./ModalBody";

export default ModalBody;

export type ModalBodyStyleKeys = "root";

export interface ModalBodyThemeConfig
	extends StandardThemeConfig<ModalBodyStyleKeys, ModalBodyProps> {}

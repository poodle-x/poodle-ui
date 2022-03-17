import React from "react";
import { Modal, ModalProps } from "./Modal";
import { StandardThemeConfig } from "../theme";

export * from "./Modal";

export default Modal;

export type ModalStyleKeys =
	| "root"
	| "overlay"
	| "inner"
	| "container"
	| "modal";

export interface ModalThemeConfig
	extends StandardThemeConfig<ModalStyleKeys, ModalProps> {}

export interface ModalContextValue {
	autoIdLabelledby?: string;
	autoIdDescribedby?: string;
}

export const ModalContext = React.createContext<ModalContextValue>({});

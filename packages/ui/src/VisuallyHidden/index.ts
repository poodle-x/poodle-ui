import { VisuallyHidden, VisuallyHiddenProps } from "./VisuallyHidden";
import { StandardThemeConfig } from "../theme";

export * from "./VisuallyHidden";

export default VisuallyHidden;

export type VisuallyHiddenStyleKeys = "root";

export interface VisuallyHiddenThemeConfig
	extends StandardThemeConfig<VisuallyHiddenStyleKeys, VisuallyHiddenProps> {}

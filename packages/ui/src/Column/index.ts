import { Column, ColumnProps } from "./Column";
import { StandardThemeConfig } from "../theme";

export * from "./Column";

export default Column;

export type ColumnStyleKeys = "root";

export interface ColumnThemeConfig
	extends StandardThemeConfig<ColumnStyleKeys, ColumnProps> {}

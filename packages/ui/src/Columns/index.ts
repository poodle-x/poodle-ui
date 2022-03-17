import { Columns, ColumnsProps } from "./Columns";
import { StandardThemeConfig } from "../theme";

export * from "./Columns";

export default Columns;

export type ColumnsStyleKeys = "root";

export interface ColumnsThemeConfig
	extends StandardThemeConfig<ColumnsStyleKeys, ColumnsProps> {}

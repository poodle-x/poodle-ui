import { TableBody, TableBodyProps } from "./TableBody";
import { StandardThemeConfig } from "../theme";

export * from "./TableBody";

export default TableBody;

export type TableBodyStyleKeys = "root";

export interface TableBodyThemeConfig
	extends StandardThemeConfig<TableBodyStyleKeys, TableBodyProps> {}

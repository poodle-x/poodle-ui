import { TableRow, TableRowProps } from "./TableRow";
import { StandardThemeConfig } from "../theme";

export * from "./TableRow";

export default TableRow;

export type TableRowStyleKeys = "root";

export interface TableRowThemeConfig
	extends StandardThemeConfig<TableRowStyleKeys, TableRowProps> {}

import { TableCell, TableCellProps } from "./TableCell";
import { StandardThemeConfig } from "../theme";

export * from "./TableCell";

export default TableCell;

export type TableCellStyleKeys = "root";

export interface TableCellThemeConfig
	extends StandardThemeConfig<TableCellStyleKeys, TableCellProps> {}

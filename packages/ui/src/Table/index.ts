import { Table, TableProps } from "./Table";
import { StandardThemeConfig } from "../theme";

export * from "./Table";

export default Table;

export type TableStyleKeys = "root" | "table";

export interface TableThemeConfig
	extends StandardThemeConfig<TableStyleKeys, TableProps> {}

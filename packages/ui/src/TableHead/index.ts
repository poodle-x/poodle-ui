import { TableHead, TableHeadProps } from "./TableHead";
import { StandardThemeConfig } from "../theme";

export * from "./TableHead";

export default TableHead;

export type TableHeadStyleKeys = "root";

export interface TableHeadThemeConfig
	extends StandardThemeConfig<TableHeadStyleKeys, TableHeadProps> {}

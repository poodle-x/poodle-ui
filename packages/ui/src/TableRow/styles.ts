import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { TableRowProps } from "./TableRow";
import { TableContextValue, TableStyleKeys } from "../Table";

export function Root(props: TableRowProps & TableContextValue): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<TableStyleKeys>({
		key: "root",
		config: theme?.TableRow,
		props,
		base: [],
	});
}

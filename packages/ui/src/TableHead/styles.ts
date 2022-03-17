import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { TableHeadProps } from "./TableHead";
import { TableContextValue } from "../Table";
import { TableHeadStyleKeys } from "./";

export function Root(props: TableHeadProps & TableContextValue): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<TableHeadStyleKeys>({
		key: "root",
		config: theme?.TableHead,
		props,
		base: [],
	});
}

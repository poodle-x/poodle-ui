import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { TableBodyProps } from "./TableBody";
import { TableBodyStyleKeys } from "./index";

export function Root(props: TableBodyProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<TableBodyStyleKeys>({
		key: "root",
		config: theme?.TableBody,
		props,
		base: [],
	});
}

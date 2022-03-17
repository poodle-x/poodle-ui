import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { {{NameCamel}}Props } from "./{{NameCamel}}";

export function Root(
	props: {{NameCamel}}Props & {
	}
): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard({
		key: "root",
		config: theme?.{{NameCamel}},
		props,
		base: [
			{
				display: "flex",
			},
		],
	});
}

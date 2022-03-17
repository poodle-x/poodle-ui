import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { ModalBodyProps } from "./ModalBody";
import { ModalBodyStyleKeys } from "./";

export function Root(props: ModalBodyProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<ModalBodyStyleKeys>({
		key: "root",
		config: theme?.ModalBody,
		props,
		base: [
			{
				minHeight: 200,
				py: "scale-4",
				px: "scale-6",
			},
		],
	});
}

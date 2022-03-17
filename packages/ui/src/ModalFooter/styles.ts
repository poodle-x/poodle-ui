import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { ModalFooterProps } from "./ModalFooter";

export function Root(props: ModalFooterProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard({
		key: "root",
		config: theme?.ModalFooter,
		props,
		base: [
			{
				display: "flex",
				justifyContent: "flex-end",
				py: "scale-4",
				px: "scale-6",
				bg: "modal.footer",
				borderBottomLeftRadius: "base",
				borderBottomRightRadius: "base",
			},
		],
	});
}

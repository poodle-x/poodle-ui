import { useTheme } from "@poodle/ui/theme";
import { useClassNames, ClassName, CSSSystem } from "@poodle/ui/styled";

export function useThemeClassNames(data: {
	props?: { [key: string]: any };
	lists: {
		[key: string]: {
			props?: { [key: string]: any };
			theme?: { [key: string]: any };
			classNames: Array<
				ClassName | CSSSystem | ((props: { [key: string]: any }) => CSSSystem)
			>;
			styles?: Array<
				CSSSystem | ((props: { [key: string]: any }) => CSSSystem)
			>;
		};
	};
}): { [key: string]: string } {
	const { props, lists } = data;

	const { theme } = useTheme();

	return useClassNames({
		theme,
		props,
		lists,
	});
}

import { ThemeContext } from "@emotion/react";
import deepmerge from "deepmerge";
import React from "react";
import { ThemeConfig } from "./";

export function useTheme(
	options: {
		override?: ThemeConfig;
		extend?: ThemeConfig;
	} = {}
): { theme: ThemeConfig } {
	const { override, extend } = options;

	const themeContext: ThemeConfig = React.useContext(ThemeContext);

	const returnTheme = React.useMemo(() => {
		if (override) {
			return override;
		}

		if (extend) {
			return deepmerge(themeContext, extend, {
				arrayMerge: (_, sourceArray) => {
					return sourceArray;
				},
			});
		}

		return themeContext;
	}, [extend, override, themeContext]);

	return {
		theme: returnTheme || {},
	};
}

import { useTheme } from "../theme";

function useDefaultProps<T>(
	props: {
		[key: string]: any;
	},
	config?: {
		themeDefaultProps?: (theme?: { [key: string]: any }) => any | undefined;
	}
): T {
	const { theme: themeOverride, themeExtend } = props;

	const { theme } = useTheme({
		override: themeOverride,
		extend: themeExtend,
	});

	if (config?.themeDefaultProps) {
		const defaultProps = config.themeDefaultProps(theme);
		return {
			...defaultProps,
			...props,
			theme,
		};
	}

	return {
		...props,
		theme,
	} as any;
}

export default useDefaultProps;

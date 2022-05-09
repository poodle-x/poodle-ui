import { useTheme } from "../../theme";

function useDefaultProps<T>(
	props: {
		[key: string]: any;
	},
	config?: {
		themeDefaultProps?: (theme?: { [key: string]: any }) => any | undefined;
	}
): { props: T; isLocalTheme: boolean } {
	const { theme: themeOverride, themeExtend } = props;

	const isLocalTheme = themeOverride !== undefined || themeExtend !== undefined;

	const { theme } = useTheme({
		override: themeOverride,
		extend: themeExtend,
	});

	if (config?.themeDefaultProps) {
		const defaultProps = config.themeDefaultProps(theme);
		return {
			props: {
				...defaultProps,
				...props,
				theme,
			},
			isLocalTheme,
		};
	}

	return {
		props: {
			...props,
			theme,
		} as any,
		isLocalTheme,
	};
}

export default useDefaultProps;

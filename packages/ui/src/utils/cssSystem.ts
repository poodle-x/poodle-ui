import { CSSObjectSystem } from "../styled";
import { getThemeValue, system, ThemeValue } from "../theme";

export function cssSystem(data: {
	props: any;
	base: CSSObjectSystem[];
	applies?: (ThemeValue<CSSObjectSystem> | undefined)[];
	override?: ThemeValue<CSSObjectSystem>;
}) {
	const { props, applies = [], override, base } = data;

	const overrideTheme = getThemeValue<CSSObjectSystem | undefined>(
		props,
		override,
		undefined
	);

	if (overrideTheme) {
		return system(
			{ ...overrideTheme, theme: props.theme },
			{
				sendProps: props,
			}
		);
	}

	return [
		...base.map((b) =>
			system(
				{ ...b, theme: props.theme },
				{
					sendProps: props,
				}
			)
		),
		...applies.reduce<(CSSObjectSystem | CSSObjectSystem[])[]>((prev, s) => {
			const v = getThemeValue(props, s, undefined);

			if (v) {
				return [
					...prev,
					system({ ...v, theme: props.theme }, { sendProps: props }),
				];
			}

			return prev;
		}, []),
	];
}

import { ResponsiveProp, ThemeValue } from "../theme";

function negativePrimitiveValue(
	value: ThemeValue<string | number>
): ThemeValue<string | number> {
	if (typeof value === "string") {
		return `-${value}`;
	}

	if (typeof value === "number") {
		return value * -1;
	}

	return value;
}

export function negativeResponsiveValue(
	value: ResponsiveProp<number | string>
) {
	if (typeof value === "string") {
		return `-${value}`;
	}

	if (typeof value === "number") {
		return value * -1;
	}

	if (Array.isArray(value)) {
		return value.map((v) => {
			return negativePrimitiveValue(v);
		});
	}

	if (typeof value === "object") {
		return Object.keys(value).reduce<{
			[key: string]:
				| ThemeValue<string | number>
				| ThemeValue<string | number>[];
		}>((r, k) => {
			const v = value[k];
			const s = Array.isArray(v)
				? v.map((vv) => {
						return negativePrimitiveValue(vv);
				  })
				: negativePrimitiveValue(v);
			return {
				...r,
				[k]: s,
			};
		}, {});
	}

	return value;
}

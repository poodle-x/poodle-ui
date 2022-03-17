import { ResponsiveProp, ThemeValue } from "../theme";

export function transformResponsiveValue<T, R = T>(
	value: ResponsiveProp<T>,
	transform: (value: ThemeValue<T>) => R
): ResponsiveProp<R> {
	let result: ResponsiveProp<R> = {};
	if (Array.isArray(value)) {
		result = value.map((v) => {
			return transform(v);
		});
	} else if (typeof value === "object") {
		result = Object.keys(value).reduce<{
			[key: string]: ThemeValue<R> | Array<ThemeValue<R>>;
		}>((a, key) => {
			const v: ThemeValue<T> = (value as any)[key];
			if (typeof v === "function") {
				return {
					...a,
					[key]: transform(v),
				};
			} else if (Array.isArray(v)) {
				return {
					...a,
					[key]: v.map((vv) => {
						return transform(vv);
					}),
				};
			}

			return {
				...a,
				[key]: transform(v),
			};
		}, {});
	} else {
		result = transform(value);
	}

	return result;
}

export function safeThemeUnitValue(
	value: string | number,
	config?: {
		unit?: string;
	}
): string {
	const finalConfig = {
		unit: "px",
		...config,
	};

	if (typeof value === "string") {
		return value;
	}

	return `${value}${finalConfig.unit}`;
}

export default safeThemeUnitValue;

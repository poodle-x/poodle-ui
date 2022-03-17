import { ResponsiveProp } from "../theme";

export function responsiveValueThreshold<T>(
	value: ResponsiveProp<T>,
	threshold: string,
	breakPointScale: string[]
): ResponsiveProp<T> {
	let calcValue: { [k: string]: ResponsiveProp<T> } | undefined = undefined;

	if (threshold && !Array.isArray(value) && typeof value === "object") {
		const scaleIndex = breakPointScale.findIndex((b) => b === threshold);
		if (scaleIndex >= 0) {
			breakPointScale.slice(scaleIndex, breakPointScale.length).forEach((b) => {
				if (!calcValue) {
					calcValue = {};
				}
				calcValue[b] = (value as any)[b];
			});
		}
	} else if (threshold && Array.isArray(value)) {
		const scaleIndex = breakPointScale.findIndex((b) => b === threshold);
		const br = breakPointScale.slice(scaleIndex, breakPointScale.length);
		if (scaleIndex >= 0) {
			br.forEach((b, i) => {
				if (value[scaleIndex + i + 1]) {
					if (!calcValue) {
						calcValue = {};
					}
					calcValue[b] = value[scaleIndex + i + 1];
				}
			});
		}
	} else if (
		threshold &&
		(typeof value === "string" || typeof value === "number")
	) {
		return {
			[threshold]: value,
		};
	}

	return calcValue || value;
}

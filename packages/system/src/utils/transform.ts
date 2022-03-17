import {
	SystemConfigTransform,
	SystemConfigTransformProperties,
} from "../system";

export function transformPropertyMultipleValue(
	part: string
): SystemConfigTransformProperties {
	return (data) => {
		const properties: string[] = [];

		const { props, key } = data;

		for (const k in props[key]) {
			if (props[key].hasOwnProperty(k)) {
				properties.push(`&:${part}(${k})`);
			}
		}

		return properties;
	};
}

export const transformMultipleValue: SystemConfigTransform = (
	props,
	value,
	key,
	property
) => {
	// @todo should change regex to sub string to increase performance
	const regex = /\((.+)\)/gm;

	const result = regex.exec(property);

	const keyValue: string = result ? result[1] : "";

	return value[keyValue];
};

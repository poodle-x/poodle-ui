import { getBreakpoint, getBreakpointsScale } from "./breakpoints";
import { getThemeValue } from "./";

/**
 * Custom function to override get media query function when the value passing
 * is a responsive type.
 */
export type MediaFn = (option: MediaFnOptions) => string;
export type GetBreakpointScale = (props: { [key: string]: any }) => string[];

export type SystemConfigTransform = (
	props: { [key: string]: any },
	value: any,
	key: string,
	property: string
) => string | number | { [key: string]: string | number } | undefined;

export type SystemConfigTransformProperties = (data: {
	props: { [key: string]: any };
	key: string;
}) => string[];

export interface SystemConfig {
	properties?: string[] | SystemConfigTransformProperties;
	transform?: SystemConfigTransform;
	customMediaFn?: MediaFn;
	customGetBreakpointsScale?: GetBreakpointScale;
	isMultipleValue?: boolean;
}

export interface MediaFnOptions {
	scale: number | string;
	value: number | string;
	props: { [key: string]: any };
	config: SystemConfig;
}

export interface CreateSystemOptions {
	customMediaFn?: MediaFn;
	customGetBreakpointsScale?: GetBreakpointScale;
}

export interface SystemConfigList {
	[key: string]: SystemConfig | true;
}

function getValue(data: {
	key: string;
	props: { [key: string]: any };
	config: SystemConfig;
	value: any;
}) {
	const { props, config, value, key } = data;

	let style: { [key: string]: any } = {};

	if (config.properties) {
		let rawProperties: string[] | undefined;

		if (typeof config.properties === "function") {
			rawProperties = config.properties({
				props,
				key,
			});
		} else {
			rawProperties = config.properties;
		}

		rawProperties.forEach((property) => {
			style[property] = config.transform
				? config.transform(props, value, key, property)
				: getThemeValue<string | number>(props, value, "");
		});
	} else {
		const v = config.transform
			? config.transform(props, value, key, key)
			: getThemeValue<{ [key: string]: string | number } | string | number>(
					props,
					value,
					{}
			  );

		if (typeof v === "string" || typeof v === "number") {
			style[key] = v;
		}

		if (typeof v === "object") {
			style = {
				...style,
				...v,
			};
		}
	}

	return style;
}

function mediaFn(options: MediaFnOptions): string {
	let media = "";
	const { scale, props } = options;
	const breakpoint = getBreakpoint(scale)(props);

	if (breakpoint) {
		media = `@media screen and (min-width: ${
			typeof breakpoint === "number" ? `${breakpoint}px` : breakpoint
		})`;
	}
	return media;
}

function mediaScaleFn(options: {
	key: string;
	config: SystemConfig;
	mediaFn: MediaFn;
	scale: string | number;
	styleValue: any;
	props: { [key: string]: any };
}) {
	const { config, scale, mediaFn, styleValue, props, key } = options;
	const media = mediaFn({
		config,
		scale,
		props,
		value: styleValue,
	});
	if (media) {
		return {
			[media]: getValue({
				key,
				config,
				value: styleValue,
				props,
			}),
		};
	}
}

function getKeyStyles(data: {
	key: string;
	config: SystemConfig;
	props: { [key: string]: any };
	sendProps?: { [key: string]: any };
	customMediaFn?: MediaFn;
	customGetBreakpointsScale?: GetBreakpointScale;
}): Array<{ [p: string]: any }> {
	const {
		config,
		props,
		key,
		customMediaFn,
		customGetBreakpointsScale,
		sendProps,
	} = data;
	const styles: Array<{ [key: string]: any }> = [];
	const currentValue = props[key];
	const currentMediaFn = config.customMediaFn || customMediaFn || mediaFn;
	const currentGetBreakpointsScale =
		config.customGetBreakpointsScale ||
		customGetBreakpointsScale ||
		getBreakpointsScale;

	const forwardProps = sendProps || props;

	if (Array.isArray(currentValue)) {
		currentValue.forEach((value, index) => {
			const keyValue = getValue({ config, value, props: forwardProps, key });
			if (index === 0) {
				styles.push(keyValue);
			} else {
				const media = currentMediaFn({
					config,
					scale: index - 1,
					props: forwardProps,
					value,
				});
				if (media) {
					styles.push({
						[media]: keyValue,
					});
				}
			}
		});
		return styles;
	}

	if (typeof currentValue === "object") {
		const listResponsive = Object.keys(currentValue);

		const spare = listResponsive.findIndex((v) => v === "_");

		if (spare >= 0) {
			styles.push(
				getValue({
					key,
					config,
					value: currentValue[listResponsive[spare]],
					props: forwardProps,
				})
			);
			listResponsive.splice(spare, 1);
		}

		const responsiveScale = currentGetBreakpointsScale(props);

		responsiveScale.forEach((scale) => {
			const spare = listResponsive.findIndex((v) => v === scale);
			if (spare >= 0) {
				const styleScale = mediaScaleFn({
					key,
					props: forwardProps,
					config,
					scale: listResponsive[spare],
					mediaFn: currentMediaFn,
					styleValue: currentValue[listResponsive[spare]],
				});
				styleScale && styles.push(styleScale);
				listResponsive.splice(spare, 1);
			}
		});

		listResponsive.forEach((res) => {
			const styleScale = mediaScaleFn({
				key,
				props: forwardProps,
				config,
				scale: res,
				mediaFn: currentMediaFn,
				styleValue: currentValue[res],
			});
			styleScale && styles.push(styleScale);
		});

		return styles;
	}

	if (
		typeof currentValue === "string" ||
		typeof currentValue === "number" ||
		typeof currentValue === "function"
	) {
		styles.push(
			getValue({ config, value: currentValue, props: forwardProps, key })
		);
		return styles;
	}

	return styles;
}

export interface SystemOperationOptions {
	returnOnlySystemProps?: boolean;
	sendProps?: { [key: string]: any };
}

export type SystemOperation = (
	props: { [p: string]: any },
	runOptions?: SystemOperationOptions
) => Array<{ [p: string]: any }>;

export function createSystem(
	systems: SystemConfigList,
	options?: CreateSystemOptions
): SystemOperation {
	const operation: SystemOperation = (props, runOptions = {}) => {
		const { returnOnlySystemProps, sendProps } = runOptions;
		const { customMediaFn, customGetBreakpointsScale } = options || {};
		let styles: Array<{ [key: string]: any }> = [];

		Object.keys(props)
			.filter((p) => p !== "theme")
			.forEach((p) => {
				let foundedInSystem = false;
				for (const keys in systems) {
					const keysPart = keys.split(",");

					const rawConfig = systems[keys];

					const key = keysPart.find((k) => k === p);

					foundedInSystem = Boolean(key);

					let config: SystemConfig;

					if (rawConfig === true) {
						config = {
							properties: [keys],
						};
					} else {
						config = rawConfig;
					}

					if (key) {
						if (config.isMultipleValue) {
							let rawProperties: string[] | undefined;

							if (typeof config.properties === "function") {
								rawProperties = config.properties({
									props,
									key,
								});
							} else {
								rawProperties = config.properties;
							}

							const properties = rawProperties || [key];

							properties.forEach((property) => {
								let value: { [key: string]: any } = props[key];

								if (config.transform) {
									const resovle = config.transform(
										props,
										props[key],
										key,
										property
									);

									if (
										resovle &&
										typeof resovle !== "number" &&
										typeof resovle !== "string"
									) {
										value = resovle;
									}
								}

								styles.push({
									[property]: operation(
										{ ...value, theme: props.theme },
										runOptions
									),
								});
							});
						} else {
							styles = [
								...styles,
								...getKeyStyles({
									key,
									config,
									props,
									sendProps,
									customMediaFn,
									customGetBreakpointsScale,
								}),
							];
						}
						break;
					}
				}

				if (
					!foundedInSystem &&
					!returnOnlySystemProps &&
					props[p] &&
					typeof props[p] === "object"
				) {
					return (styles = [
						...styles,
						{ [p]: operation({ ...props[p], theme: props.theme }, runOptions) },
					]);
				}

				if (!foundedInSystem && !returnOnlySystemProps) {
					styles = [...styles, { [p]: props[p] }];
				}
			});

		return styles;
	};

	return operation;
}

export function compose(...args: Array<SystemConfigList>): SystemConfigList {
	const finalList: SystemConfigList = {};
	args.forEach((list) => {
		Object.keys(list).forEach((key) => {
			const parts = key.split(",");
			parts.forEach((part) => {
				finalList[part] = list[key];
			});
		});
	});
	return finalList;
}

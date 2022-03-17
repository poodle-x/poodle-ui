import { BreakpointsThemeConfig, getBreakpoint } from "./breakpoints";
import { SystemThemeConfig } from "./";
import {
	createSystem,
	SystemConfigList,
	SystemConfig,
	compose,
} from "./system";

describe("system", () => {
	describe("createSystem", () => {
		const config: SystemConfig = {
			properties: ["paddingTop", "paddingBottom"],
			transform: (props, value) => {
				if (typeof value === "string" || typeof value === "number") {
					return value + "__ok";
				}
				if (typeof value === "function") {
					return value(props);
				}
			},
		};

		it("should return styles with properties", () => {
			const systems: SystemConfigList = {
				x: config,
				y: config,
			};
			const result = createSystem(systems)({
				custom: 2,
				x: "1",
				y: (props: any) => {
					return props.custom;
				},
			});

			expect(result).toEqual([
				{ custom: 2 },
				{ paddingTop: "1__ok", paddingBottom: "1__ok" },
				{ paddingTop: 2, paddingBottom: 2 },
			]);
		});

		it("should return styles with key equal to true", () => {
			const systems: SystemConfigList = {
				x: true,
				y: true,
			};
			const result = createSystem(systems)({
				custom: 2,
				x: "1",
				y: (props: any) => {
					return props.custom;
				},
			});

			expect(result).toEqual([{ custom: 2 }, { x: "1" }, { y: 2 }]);
		});

		it("should return styles no properties", () => {
			const systems: SystemConfigList = {
				x: {
					transform: (props, value, key) => {
						return {
							paddingTop: `${value}_${key}`,
						};
					},
				},
				y: {},
			};
			const result = createSystem(systems)({
				custom: 2,
				x: "1",
				y: (props: any) => {
					return props.custom;
				},
			});

			expect(result).toEqual([
				{
					custom: 2,
				},
				{
					paddingTop: "1_x",
				},
				{
					y: 2,
				},
			]);
		});

		it("should return responsive styles with properties", () => {
			const systems: SystemConfigList = {
				x: config,
				y: config,
				z: config,
			};

			const themeBreakpoints: BreakpointsThemeConfig = {
				scale: ["a", "b"],
				sets: {
					a: 400,
					b: "48em",
					c: 600,
				},
			};

			const result = createSystem(systems)({
				x: ["1", 2, 3, 4],
				y: {
					_: 5,
					a: 6,
					b: 7,
				},
				z: {
					_: 8,
					c: 9,
					d: 10,
				},
				theme: {
					breakpoints: themeBreakpoints,
				} as SystemThemeConfig,
			});

			expect(result).toEqual([
				{
					paddingBottom: "1__ok",
					paddingTop: "1__ok",
				},
				{
					"@media screen and (min-width: 400px)": {
						paddingBottom: "2__ok",
						paddingTop: "2__ok",
					},
				},
				{
					"@media screen and (min-width: 48em)": {
						paddingBottom: "3__ok",
						paddingTop: "3__ok",
					},
				},
				{
					paddingBottom: "5__ok",
					paddingTop: "5__ok",
				},
				{
					"@media screen and (min-width: 400px)": {
						paddingBottom: "6__ok",
						paddingTop: "6__ok",
					},
				},
				{
					"@media screen and (min-width: 48em)": {
						paddingBottom: "7__ok",
						paddingTop: "7__ok",
					},
				},
				{
					paddingBottom: "8__ok",
					paddingTop: "8__ok",
				},
				{
					"@media screen and (min-width: 600px)": {
						paddingBottom: "9__ok",
						paddingTop: "9__ok",
					},
				},
			]);
		});

		it("should return responsive styles no properties", () => {
			const themeBreakpoints: BreakpointsThemeConfig = {
				scale: ["a", "b"],
				sets: {
					a: 400,
					b: "48em",
					c: 600,
				},
			};

			const systems: SystemConfigList = {
				x: {
					transform: (props, value, key) => {
						return {
							paddingTop: `${value}_${key}`,
						};
					},
				},
				y: {},
			};
			const result = createSystem(systems)({
				custom: 2,
				x: ["1", 2, 3, 4],
				y: {
					_: (props: any) => {
						return props.custom;
					},
					a: 6,
					b: 7,
				},
				theme: {
					breakpoints: themeBreakpoints,
				} as SystemThemeConfig,
			});

			expect(result).toEqual([
				{
					custom: 2,
				},
				{
					paddingTop: "1_x",
				},
				{
					"@media screen and (min-width: 400px)": {
						paddingTop: "2_x",
					},
				},
				{
					"@media screen and (min-width: 48em)": {
						paddingTop: "3_x",
					},
				},
				{
					y: 2,
				},
				{
					"@media screen and (min-width: 400px)": {
						y: 6,
					},
				},
				{
					"@media screen and (min-width: 48em)": {
						y: 7,
					},
				},
			]);
		});

		it("should return styles with custom media fn", () => {
			const systems: SystemConfigList = {
				x: {
					...config,
					customMediaFn: (options) => {
						let media = "";
						const { scale, props } = options;

						const breakpoint = getBreakpoint(scale)(props);

						if (breakpoint) {
							media = `@media speech and (min-width: ${
								typeof breakpoint === "number" ? `${breakpoint}px` : breakpoint
							})`;
						}
						return media;
					},
				},
				y: config,
			};

			const themeBreakpoints: BreakpointsThemeConfig = {
				scale: ["a", "b"],
				sets: {
					a: 400,
					b: "48em",
				},
			};

			const result = createSystem(systems, {
				customMediaFn: (options) => {
					let media = "";
					const { scale, props } = options;

					const breakpoint = getBreakpoint(scale)(props);

					if (breakpoint) {
						media = `@media print and (min-width: ${
							typeof breakpoint === "number" ? `${breakpoint}px` : breakpoint
						})`;
					}
					return media;
				},
			})({
				x: ["1", 2, 3, 4],
				y: [2, 3],
				theme: {
					breakpoints: themeBreakpoints,
				} as SystemThemeConfig,
			});

			expect(result).toEqual([
				{
					paddingBottom: "1__ok",
					paddingTop: "1__ok",
				},
				{
					"@media speech and (min-width: 400px)": {
						paddingBottom: "2__ok",
						paddingTop: "2__ok",
					},
				},
				{
					"@media speech and (min-width: 48em)": {
						paddingBottom: "3__ok",
						paddingTop: "3__ok",
					},
				},
				{
					paddingBottom: "2__ok",
					paddingTop: "2__ok",
				},
				{
					"@media print and (min-width: 400px)": {
						paddingBottom: "3__ok",
						paddingTop: "3__ok",
					},
				},
			]);
		});

		it("should send props", () => {
			const systems: SystemConfigList = {
				x: config,
				y: config,
			};
			const result = createSystem(systems)(
				{
					custom: 2,
					y: (props: any) => {
						return props.custom;
					},
				},
				{
					sendProps: {
						custom: 3,
					},
				}
			);

			expect(result).toEqual([
				{
					custom: 2,
				},
				{
					paddingBottom: 3,
					paddingTop: 3,
				},
			]);
		});

		it("should run deep props", () => {
			const systems: SystemConfigList = {
				x: config,
				y: config,
			};

			const themeBreakpoints: BreakpointsThemeConfig = {
				scale: ["a", "b", "c"],
				sets: {
					a: 400,
					b: "48em",
					c: 600,
				},
			};

			const result = createSystem(systems)({
				x: { _: 2, a: 10 },
				":hover": {
					x: { _: 2, a: 10 },
					"& > #id": {
						y: { _: 55, b: 10 },
					},
				},
				theme: {
					breakpoints: themeBreakpoints,
				} as SystemThemeConfig,
			});

			expect(result).toEqual([
				{
					paddingBottom: "2__ok",
					paddingTop: "2__ok",
				},
				{
					"@media screen and (min-width: 400px)": {
						paddingBottom: "10__ok",
						paddingTop: "10__ok",
					},
				},
				{
					":hover": [
						{
							paddingBottom: "2__ok",
							paddingTop: "2__ok",
						},
						{
							"@media screen and (min-width: 400px)": {
								paddingBottom: "10__ok",
								paddingTop: "10__ok",
							},
						},
						{
							"& > #id": [
								{
									paddingBottom: "55__ok",
									paddingTop: "55__ok",
								},
								{
									"@media screen and (min-width: 48em)": {
										paddingBottom: "10__ok",
										paddingTop: "10__ok",
									},
								},
							],
						},
					],
				},
			]);
		});
	});

	describe("compose", () => {
		it("should compose configs", () => {
			const result = compose(
				{
					"a,b": {
						properties: ["b"],
					},
					d: true,
				},
				{
					b: {
						properties: ["x"],
					},
				}
			);
			expect(result).toEqual({
				a: { properties: ["b"] },
				b: { properties: ["x"] },
				d: true,
			});
		});
	});
});

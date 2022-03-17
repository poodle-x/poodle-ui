import { SystemThemeConfig, getColor, colorsSystem } from "./";
import { SystemTestCase, systemPropTestCases } from "./utils/testHelper";

describe("system colors", () => {
	describe("getColor", () => {
		it("should return color with color value is string", () => {
			const theme: SystemThemeConfig = {
				colors: {
					sets: {
						primary: "red",
						secondary: "yellow",
					},
					modes: {
						dark: {
							primary: "cyan",
						},
					},
				},
			};

			const results = [
				getColor("primary")({ theme }),
				getColor("non")({ theme }),
				getColor("primary")({
					theme: {
						...theme,
						mode: "dark",
					},
				}),
				getColor("secondary")({
					theme: {
						...theme,
						mode: "dark",
					},
				}),
			];

			expect(results).toEqual(["red", "non", "cyan", "yellow"]);
		});

		it("should return color with color value is object", () => {
			const theme: SystemThemeConfig = {
				colors: {
					sets: {
						primary: {
							base: "green",
						},
						secondary: {
							500: "orange",
						},
					},
					modes: {
						dark: {
							primary: {
								base: "cyan",
							},
						},
					},
				},
			};

			const results = [
				getColor("primary")({ theme }),
				getColor("non")({ theme }),
				getColor("secondary.500")({ theme }),
				getColor("primary")({
					theme: {
						...theme,
						mode: "dark",
					},
				}),
			];

			expect(results).toEqual(["green", "non", "orange", "cyan"]);
		});
	});

	describe("colors props", () => {
		const testCases: SystemTestCase[] = [
			{
				name: "background props",
				data: {
					steps: [
						[{ bg: "#fff" }, [{ background: "#fff" }]],
						[{ background: "primary" }, [{ background: "red" }]],
						[
							{
								custom: "primary",
								bg: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: "primary" }, { background: "cyan" }],
							{ mode: "dark" },
						],
					],
				},
			},

			{
				name: "background color props",
				data: {
					steps: [
						[{ bgc: "#fff" }, [{ backgroundColor: "#fff" }]],
						[{ backgroundColor: "primary" }, [{ backgroundColor: "red" }]],
						[
							{
								custom: "primary",
								bgc: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: "primary" }, { backgroundColor: "cyan" }],
							{ mode: "dark" },
						],
					],
				},
			},

			{
				name: "color props",
				data: {
					steps: [
						[{ color: "#fff" }, [{ color: "#fff" }]],
						[{ color: "primary" }, [{ color: "red" }]],
						[
							{
								custom: "primary",
								color: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: "primary" }, { color: "cyan" }],
							{ mode: "dark" },
						],
					],
				},
			},

			{
				name: "fill props",
				data: {
					steps: [
						[{ fill: "#fff" }, [{ fill: "#fff" }]],
						[{ fill: "primary" }, [{ fill: "red" }]],
						[
							{
								custom: "primary",
								fill: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: "primary" }, { fill: "cyan" }],
							{ mode: "dark" },
						],
					],
				},
			},
		];

		systemPropTestCases({
			testCases,
			systemConfigs: colorsSystem,
			theme: {
				colors: {
					sets: {
						primary: "red",
						secondary: "yellow",
					},
					modes: {
						dark: {
							primary: "cyan",
						},
					},
				},
			},
		});
	});
});

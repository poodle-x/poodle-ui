import {
	SystemThemeConfig,
	getFontUrl,
	getAutoLoadFontUrls,
	getFontBase,
	getFontWeight,
	getFontFamily,
	getFontSize,
	getFontSet,
	fontsSystem,
} from "./";
import { SystemTestCase, systemPropTestCases } from "./utils/testHelper";

describe("system fonts", () => {
	describe("getFontUrl", () => {
		it("should return correctly", () => {
			const theme: SystemThemeConfig = {
				fonts: {
					fontUrls: {
						open: "open url",
					},
				},
			};

			const results = [
				getFontUrl("open")({ theme }),
				getFontUrl("no")({ theme }),
			];

			expect(results).toEqual(["open url", ""]);
		});
	});

	describe("getAutoLoadFontUrls", () => {
		it("should return font names correctly", () => {
			const theme: SystemThemeConfig = {
				fonts: {
					autoLoadFonts: ["open", "roboto"],
				},
			};
			const results = getAutoLoadFontUrls()({ theme });
			expect(results).toEqual(["open", "roboto"]);
		});

		it("should return font urls correctly", () => {
			const theme: SystemThemeConfig = {
				fonts: {
					autoLoadFonts: ["open", "roboto"],
					fontUrls: {
						open: "open url",
						roboto: "roboto url",
					},
				},
			};
			const results = getAutoLoadFontUrls(true)({ theme });
			expect(results).toEqual(["open url", "roboto url"]);
		});
	});

	describe("getFontBase", () => {
		it("should return correctly", () => {
			const theme: SystemThemeConfig = {
				fonts: {
					base: {
						color: "red",
					},
				},
			};

			const results = getFontBase()({ theme });

			expect(results).toEqual({ color: "red" });
		});
	});

	describe("getFontWeight", () => {
		it("should return correctly", () => {
			const theme: SystemThemeConfig = {
				fonts: {
					weights: {
						bold: 700,
					},
				},
			};

			const results = [
				getFontWeight("bold")({ theme }),
				getFontWeight("normal")({ theme }),
			];

			expect(results).toEqual([700, "normal"]);
		});
	});

	describe("getFontFamily", () => {
		it("should return correctly", () => {
			const theme: SystemThemeConfig = {
				fonts: {
					families: {
						head: "open serif",
					},
				},
			};

			const results = [
				getFontFamily("head")({ theme }),
				getFontFamily("Roboto serif")({ theme }),
			];

			expect(results).toEqual(["open serif", "Roboto serif"]);
		});
	});

	describe("getFontSize", () => {
		it("should return correctly", () => {
			const theme: SystemThemeConfig = {
				fonts: {
					scale: "1rem",
					sizeSets: {
						head: "10em",
					},
				},
			};

			const results = [
				getFontSize("scale-1")({ theme }),
				getFontSize("scale-1.25")({ theme }),
				getFontSize("head")({ theme }),
				getFontSize("5rem")({ theme }),
				getFontSize(5)({ theme }),
			];

			expect(results).toEqual(["1rem", "1.25rem", "10em", "5rem", 5]);
		});
	});

	describe("getFontSet", () => {
		it("should return correctly", () => {
			const theme: SystemThemeConfig = {
				fonts: {
					sets: {
						head: {
							color: "red",
						},
					},
				},
			};

			const results = [
				getFontSet("head")({ theme }),
				getFontSet("roboto")({ theme }),
			];

			expect(results).toEqual([{ color: "red" }, undefined]);
		});
	});

	describe("fonts props", () => {
		const testCases: SystemTestCase[] = [
			{
				name: "lineHeight props",
				data: {
					steps: [
						[{ lineHeight: 100 }, [{ lineHeight: 100 }]],
						[{ lineHeight: "100%" }, [{ lineHeight: "100%" }]],
						[
							{
								custom: 100,
								lineHeight: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: 100 }, { lineHeight: 100 }],
						],
					],
				},
			},
			{
				name: "fontFamily props",
				data: {
					steps: [
						[{ fontFamily: "open" }, [{ fontFamily: "open serif" }]],
						[{ fontFamily: "roboto serif" }, [{ fontFamily: "roboto serif" }]],
						[
							{
								custom: "open",
								fontFamily: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: "open" }, { fontFamily: "open serif" }],
						],
					],
				},
			},
			{
				name: "textAlign props",
				data: {
					steps: [
						[{ textAlign: "left" }, [{ textAlign: "left" }]],
						[
							{
								custom: "right",
								textAlign: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: "right" }, { textAlign: "right" }],
						],
					],
				},
			},
			{
				name: "fontWeight props",
				data: {
					steps: [
						[{ fontWeight: "lit" }, [{ fontWeight: 600 }]],
						[{ fontWeight: "bold" }, [{ fontWeight: "bold" }]],
						[
							{
								custom: "lit",
								fontWeight: (props: any) => {
									return props.custom;
								},
							},
							[
								{
									custom: "lit",
								},
								{
									fontWeight: 600,
								},
							],
						],
					],
				},
			},
			{
				name: "letterSpacing props",
				data: {
					steps: [
						[{ letterSpacing: 100 }, [{ letterSpacing: 100 }]],
						[
							{
								custom: "100%",
								letterSpacing: (props: any) => {
									return props.custom;
								},
							},
							[
								{
									custom: "100%",
								},
								{
									letterSpacing: "100%",
								},
							],
						],
					],
				},
			},
			{
				name: "fontStyle props",
				data: {
					steps: [
						[{ fontStyle: "normal" }, [{ fontStyle: "normal" }]],
						[
							{
								custom: "italic",
								fontStyle: (props: any) => {
									return props.custom;
								},
							},
							[
								{
									custom: "italic",
								},
								{
									fontStyle: "italic",
								},
							],
						],
					],
				},
			},
			{
				name: "fontSize props",
				data: {
					steps: [
						[{ fontSize: "head" }, [{ fontSize: "17px" }]],
						[{ fontSize: "scale-1.5" }, [{ fontSize: "1.5rem" }]],
						[{ fontSize: 20 }, [{ fontSize: 20 }]],
						[
							{
								custom: "head",
								fontSize: (props: any) => {
									return props.custom;
								},
							},
							[
								{
									custom: "head",
								},
								{
									fontSize: "17px",
								},
							],
						],
					],
				},
			},
			{
				name: "textTransform props",
				data: {
					steps: [
						[{ textTransform: "uppercase" }, [{ textTransform: "uppercase" }]],
					],
				},
			},
			{
				name: "textDecoration props",
				data: {
					steps: [[{ textDecoration: "none" }, [{ textDecoration: "none" }]]],
				},
			},
			{
				name: "textOverflow props",
				data: {
					steps: [[{ textOverflow: "clip" }, [{ textOverflow: "clip" }]]],
				},
			},
			{
				name: "whiteSpace props",
				data: {
					steps: [[{ whiteSpace: "pre" }, [{ whiteSpace: "pre" }]]],
				},
			},
			{
				name: "wordBreak props",
				data: {
					steps: [[{ wordBreak: "break-all" }, [{ wordBreak: "break-all" }]]],
				},
			},
			{
				name: "overflowWrap props",
				data: {
					steps: [
						[{ overflowWrap: "anywhere" }, [{ overflowWrap: "anywhere" }]],
					],
				},
			},
			{
				name: "textStyle props",
				data: {
					steps: [
						[{ textStyle: "head" }, [{ fontWeight: 900, fontSize: "2rem" }]],
					],
				},
			},
		];

		systemPropTestCases({
			testCases,
			systemConfigs: fontsSystem,
			theme: {
				colors: {
					sets: {
						primary: "cyan",
					},
				},
				fonts: {
					sets: {
						head: {
							fontWeight: "head",
							fontSize: "scale-2",
						},
					},
					scale: "1rem",
					weights: {
						lit: 600,
						head: 900,
					},
					base: {
						color: "cyan",
					},
					autoLoadFonts: ["roboto", "open"],
					fontUrls: {
						roboto: "robot url",
					},
					families: {
						open: "open serif",
					},
					sizeSets: {
						head: "17px",
					},
				},
			},
		});
	});
});

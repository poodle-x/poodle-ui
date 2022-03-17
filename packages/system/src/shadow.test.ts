import {
	getBoxShadow,
	getTextShadow,
	shadowSystem,
	SystemThemeConfig,
} from "./index";
import { systemPropTestCases, SystemTestCase } from "./utils/testHelper";

describe("shadow system", () => {
	describe("getBoxShadow", () => {
		it("should return boxShadow with string", () => {
			const theme: SystemThemeConfig = {
				shadows: {
					boxShadowSets: {},
				},
			};
			const result = getBoxShadow("none")({ theme });
			expect(result).toEqual("none");
		});

		it("should return boxShadow with theme system", () => {
			const theme: SystemThemeConfig = {
				shadows: {
					boxShadowSets: {
						modal: "12px 12px 2px 1px rgba(0, 0, 255, .2)",
					},
				},
			};

			let result = getBoxShadow("modal")({ theme });
			expect(result).toEqual("12px 12px 2px 1px rgba(0, 0, 255, .2)");

			result = getBoxShadow("auto")({ theme });
			expect(result).toEqual("auto");
		});
	});

	describe("getTextShadow", () => {
		it("should return boxShadow with string", () => {
			const theme: SystemThemeConfig = {
				shadows: {
					textShadowSets: {},
				},
			};
			const result = getTextShadow("none")({ theme });
			expect(result).toEqual("none");
		});

		it("should return boxShadow with theme system", () => {
			const theme: SystemThemeConfig = {
				shadows: {
					textShadowSets: {
						text: "12px 12px 2px 1px rgba(0, 0, 255, .2)",
					},
				},
			};

			let result = getTextShadow("text")({ theme });
			expect(result).toEqual("12px 12px 2px 1px rgba(0, 0, 255, .2)");

			result = getTextShadow("auto")({ theme });
			expect(result).toEqual("auto");
		});
	});

	describe("shadow props", function () {
		const testCases: SystemTestCase[] = [
			{
				name: "boxShadow props",
				data: {
					steps: [
						[{ boxShadow: "5px" }, [{ boxShadow: "5px" }]],
						[{ boxShadow: "lv1" }, [{ boxShadow: "1px" }]],
					],
				},
			},

			{
				name: "textShadow props",
				data: {
					steps: [
						[{ textShadow: "32px" }, [{ textShadow: "32px" }]],
						[{ textShadow: "lv2" }, [{ textShadow: "3px" }]],
					],
				},
			},
		];

		systemPropTestCases({
			testCases,
			systemConfigs: shadowSystem,
			theme: {
				shadows: {
					boxShadowSets: {
						lv1: "1px",
						lv2: "2px",
					},
					textShadowSets: {
						lv1: "2px",
						lv2: "3px",
					},
				},
			},
		});
	});
});

import { SystemThemeConfig, createSystem, spacingSystem } from "./";
import { getSpacing } from "./spacing";

describe("system spacing", () => {
	describe("getSpacing", () => {
		it("should return spacing with number", () => {
			const theme: SystemThemeConfig = {
				spacing: {
					scale: 16,
				},
			};

			const results = [
				getSpacing(2)({ theme }),
				getSpacing(7)({ theme }),
				getSpacing(8)({ theme }),
			];

			expect(results).toEqual([2, 7, 8]);
		});

		it("should return spacing with function", () => {
			const theme: SystemThemeConfig = {
				spacing: {
					scale: 16,
				},
			};

			const results = [
				getSpacing(() => {
					return 5;
				})({ theme, another: 5 }),
			];

			expect(results).toEqual([5]);
		});

		it("should return spacing with scale pattern", () => {
			let theme: SystemThemeConfig = {
				spacing: {
					scale: 16,
				},
			};

			let results = [
				getSpacing("scale-1")({ theme }),
				getSpacing("scale-2.5")({ theme }),
				getSpacing("scale-4")({ theme }),
			];

			expect(results).toEqual([16, 16 * 2.5, 4 * 16]);

			theme = {
				spacing: {
					scale: "1.5rem",
				},
			};

			results = [
				getSpacing("scale-1")({ theme }),
				getSpacing("scale-2.5")({ theme }),
				getSpacing("scale-4")({ theme }),
			];

			expect(results).toEqual(["1.5rem", "3.75rem", "6rem"]);

			theme = {
				spacing: {
					scale: () => {
						return "1.5rem";
					},
				},
			};

			results = [
				getSpacing("scale-1")({ theme }),
				getSpacing("scale-2.5")({ theme }),
				getSpacing("scale-4")({ theme }),
			];

			expect(results).toEqual(["1.5rem", "3.75rem", "6rem"]);
		});

		it("should return spacing in sets", () => {
			const theme: SystemThemeConfig = {
				spacing: {
					scale: 16,
					sets: {
						custom: "1rem",
						"custom-3": 20,
						"custom-4": () => {
							return 40;
						},
					},
				},
			};

			const results = [
				getSpacing("custom")({ theme }),
				getSpacing("custom-3")({ theme }),
				getSpacing("custom-4")({ theme }),
			];

			expect(results).toEqual(["1rem", 20, 40]);
		});

		it("should return spacing with unit", () => {
			const theme: SystemThemeConfig = {
				spacing: {
					scale: 16,
					sets: {
						minor: 10,
					},
				},
			};

			const results = [
				getSpacing(2, { withUnit: true })({ theme }),
				getSpacing("scale-2", { withUnit: true })({ theme }),
				getSpacing("minor", { withUnit: true })({ theme }),
				getSpacing("5px", { withUnit: true })({ theme }),
			];

			expect(results).toEqual(["2px", "32px", "10px", "5px"]);
		});
	});

	describe("spacing props", () => {
		function test(data: {
			theme?: SystemThemeConfig;
			steps: Array<Array<any>>;
		}) {
			const { theme, steps } = data;
			const themeFinal: SystemThemeConfig = {
				spacing: {
					scale: "1.5rem",
					sets: {
						s: "1.5rem",
						m: "2rem",
						l: "3rem",
					},
				},
				...theme,
			};

			steps.forEach((step) => {
				const result = createSystem(spacingSystem)({
					theme: { ...themeFinal },
					...step[0],
				});

				expect(result).toEqual(step[1]);
			});
		}

		it("p props", () => {
			test({
				steps: [
					[{ p: 1 }, [{ padding: 1 }]],
					[{ padding: 1 }, [{ padding: 1 }]],
					[{ p: "1em" }, [{ padding: "1em" }]],
					[{ p: "scale-2" }, [{ padding: "3rem" }]],
					[{ p: "scale-2.5" }, [{ padding: "3.75rem" }]],
				],
			});
		});

		it("pt props", () => {
			test({
				steps: [
					[{ pt: 1 }, [{ paddingTop: 1 }]],
					[{ paddingTop: 1 }, [{ paddingTop: 1 }]],
					[{ pt: "1em" }, [{ paddingTop: "1em" }]],
					[{ pt: "scale-2" }, [{ paddingTop: "3rem" }]],
					[{ pt: "scale-2.5" }, [{ paddingTop: "3.75rem" }]],
				],
			});
		});

		it("pr props", () => {
			test({
				steps: [
					[{ pr: 1 }, [{ paddingRight: 1 }]],
					[{ paddingRight: 1 }, [{ paddingRight: 1 }]],
					[{ pr: "1em" }, [{ paddingRight: "1em" }]],
					[{ pr: "scale-2" }, [{ paddingRight: "3rem" }]],
					[{ pr: "scale-2.5" }, [{ paddingRight: "3.75rem" }]],
				],
			});
		});

		it("pb props", () => {
			test({
				steps: [
					[{ pb: 1 }, [{ paddingBottom: 1 }]],
					[{ paddingBottom: 1 }, [{ paddingBottom: 1 }]],
					[{ pb: "1em" }, [{ paddingBottom: "1em" }]],
					[{ pb: "scale-2" }, [{ paddingBottom: "3rem" }]],
					[{ pb: "scale-2.5" }, [{ paddingBottom: "3.75rem" }]],
				],
			});
		});

		it("pl props", () => {
			test({
				steps: [
					[{ pl: 1 }, [{ paddingLeft: 1 }]],
					[{ paddingLeft: 1 }, [{ paddingLeft: 1 }]],
					[{ pl: "1em" }, [{ paddingLeft: "1em" }]],
					[{ pl: "scale-2" }, [{ paddingLeft: "3rem" }]],
					[{ pl: "scale-2.5" }, [{ paddingLeft: "3.75rem" }]],
				],
			});
		});

		it("px props", () => {
			test({
				steps: [
					[{ px: 1 }, [{ paddingLeft: 1, paddingRight: 1 }]],
					[{ paddingX: 1 }, [{ paddingLeft: 1, paddingRight: 1 }]],
					[{ px: "1em" }, [{ paddingLeft: "1em", paddingRight: "1em" }]],
					[{ px: "scale-2" }, [{ paddingLeft: "3rem", paddingRight: "3rem" }]],
					[
						{ px: "scale-2.5" },
						[{ paddingLeft: "3.75rem", paddingRight: "3.75rem" }],
					],
				],
			});
		});

		it("py props", () => {
			test({
				steps: [
					[{ py: 1 }, [{ paddingBottom: 1, paddingTop: 1 }]],
					[{ paddingY: 1 }, [{ paddingBottom: 1, paddingTop: 1 }]],
					[{ py: "1em" }, [{ paddingBottom: "1em", paddingTop: "1em" }]],
					[{ py: "scale-2" }, [{ paddingBottom: "3rem", paddingTop: "3rem" }]],
					[
						{ py: "scale-2.5" },
						[{ paddingBottom: "3.75rem", paddingTop: "3.75rem" }],
					],
				],
			});
		});

		it("m props", () => {
			test({
				steps: [
					[{ m: 1 }, [{ margin: 1 }]],
					[{ margin: 1 }, [{ margin: 1 }]],
					[{ m: "1em" }, [{ margin: "1em" }]],
					[{ m: "scale-2" }, [{ margin: "3rem" }]],
					[{ m: "scale-2.5" }, [{ margin: "3.75rem" }]],
				],
			});
		});

		it("mt props", () => {
			test({
				steps: [
					[{ mt: 1 }, [{ marginTop: 1 }]],
					[{ marginTop: 1 }, [{ marginTop: 1 }]],
					[{ mt: "1em" }, [{ marginTop: "1em" }]],
					[{ mt: "scale-2" }, [{ marginTop: "3rem" }]],
					[{ mt: "scale-2.5" }, [{ marginTop: "3.75rem" }]],
				],
			});
		});

		it("mr props", () => {
			test({
				steps: [
					[{ mr: 1 }, [{ marginRight: 1 }]],
					[{ marginRight: 1 }, [{ marginRight: 1 }]],
					[{ mr: "1em" }, [{ marginRight: "1em" }]],
					[{ mr: "scale-2" }, [{ marginRight: "3rem" }]],
					[{ mr: "scale-2.5" }, [{ marginRight: "3.75rem" }]],
				],
			});
		});

		it("mb props", () => {
			test({
				steps: [
					[{ mb: 1 }, [{ marginBottom: 1 }]],
					[{ marginBottom: 1 }, [{ marginBottom: 1 }]],
					[{ mb: "1em" }, [{ marginBottom: "1em" }]],
					[{ mb: "scale-2" }, [{ marginBottom: "3rem" }]],
					[{ mb: "scale-2.5" }, [{ marginBottom: "3.75rem" }]],
				],
			});
		});

		it("ml props", () => {
			test({
				steps: [
					[{ ml: 1 }, [{ marginLeft: 1 }]],
					[{ marginLeft: 1 }, [{ marginLeft: 1 }]],
					[{ ml: "1em" }, [{ marginLeft: "1em" }]],
					[{ ml: "scale-2" }, [{ marginLeft: "3rem" }]],
					[{ ml: "scale-2.5" }, [{ marginLeft: "3.75rem" }]],
				],
			});
		});

		it("mx props", () => {
			test({
				steps: [
					[{ mx: 1 }, [{ marginLeft: 1, marginRight: 1 }]],
					[{ marginX: 1 }, [{ marginLeft: 1, marginRight: 1 }]],
					[{ mx: "1em" }, [{ marginLeft: "1em", marginRight: "1em" }]],
					[{ mx: "scale-2" }, [{ marginLeft: "3rem", marginRight: "3rem" }]],
					[
						{ mx: "scale-2.5" },
						[{ marginLeft: "3.75rem", marginRight: "3.75rem" }],
					],
				],
			});
		});

		it("my props", () => {
			test({
				steps: [
					[{ my: 1 }, [{ marginBottom: 1, marginTop: 1 }]],
					[{ marginY: 1 }, [{ marginBottom: 1, marginTop: 1 }]],
					[{ my: "1em" }, [{ marginBottom: "1em", marginTop: "1em" }]],
					[{ my: "scale-2" }, [{ marginBottom: "3rem", marginTop: "3rem" }]],
					[
						{ my: "scale-2.5" },
						[{ marginBottom: "3.75rem", marginTop: "3.75rem" }],
					],
				],
			});
		});
	});
});

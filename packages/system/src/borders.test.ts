import { createSystem, SystemThemeConfig } from "./index";
import { bordersSystem, getBorder, getRadius } from "./borders";

describe("theme borders", () => {
	describe("getBorder", () => {
		it("should return border", () => {
			const theme: SystemThemeConfig = {
				colors: {
					sets: {
						red: "cyan",
					},
				},
				borders: {
					sets: {
						test: {
							color: "red",
							style: "solid",
							width: "3px",
						},
						test2: {
							color: "#fff",
							style: "solid",
							width: "1px",
						},
					},
				},
			};

			const results = [
				getBorder("1px solid blue")({ theme }),
				getBorder("test")({ theme }),
				getBorder("test2")({ theme }),
			];

			expect(results).toEqual([
				"1px solid blue",
				"3px solid cyan",
				"1px solid #fff",
			]);
		});

		it("should return border with spacing theme", () => {
			const theme: SystemThemeConfig = {
				spacing: {
					scale: 4,
				},
				colors: {
					sets: {
						red: "cyan",
					},
				},
				borders: {
					sets: {
						test: {
							color: "red",
							style: "solid",
							width: "scale-2",
						},
						test2: {
							color: "#fff",
							style: "solid",
							width: 20,
						},
					},
				},
			};

			const results = [
				getBorder("test")({ theme }),
				getBorder("test2")({ theme }),
			];

			expect(results).toEqual(["8px solid cyan", "20px solid #fff"]);
		});

		it("should return border with function", () => {
			const theme: SystemThemeConfig = {
				borders: {
					sets: {
						test: {
							color: "red",
							style: "solid",
							width: "3px",
						},
					},
				},
			};

			const results = [
				getBorder(({ theme }) => {
					return theme.borders.sets.test.color;
				})({ theme }),
			];

			expect(results).toEqual(["red"]);
		});
	});

	describe("getRadius", () => {
		it("should return radius correctly", () => {
			const theme: SystemThemeConfig = {
				borders: {
					radius: {
						s: 10,
						m: "10em",
					},
				},
			};

			const results = [
				getRadius("5px")({ theme }),
				getRadius("s")({ theme }),
				getRadius("m")({ theme }),
				getRadius(20)({ theme }),
				getRadius((p) => {
					return p.x;
				})({ theme, x: 10 }),
			];

			expect(results).toEqual(["5px", 10, "10em", 20, 10]);
		});
	});

	describe("border props", () => {
		function test(data: {
			theme?: SystemThemeConfig;
			steps: Array<Array<any>>;
		}) {
			const { theme, steps } = data;
			const themeFinal: SystemThemeConfig = {
				colors: {
					sets: {
						primary: "cyan",
					},
				},
				spacing: {
					scale: "10px",
					sets: {
						s: "1.5rem",
						m: "2rem",
						l: "3rem",
					},
				},
				borders: {
					radius: {
						s: "1.5rem",
						m: "2rem",
						l: "3rem",
					},
					sets: {
						s: {
							width: "1px",
							style: "dotted",
							color: "primary",
						},
						m: {
							width: "m",
							style: "dashed",
							color: "blue",
						},
						l: {
							width: "3px",
							style: "solid",
							color: "red",
						},
					},
				},
				...theme,
			};

			steps.forEach((step) => {
				const result = createSystem(bordersSystem)({
					theme: { ...themeFinal },
					...step[0],
				});

				expect(result).toEqual(step[1]);
			});
		}

		it("border props", () => {
			[
				"border",
				"borderTop",
				"borderLeft",
				"borderRight",
				"borderBottom",
			].forEach((b) => {
				test({
					steps: [
						[{ [b]: 1 }, [{ [b]: 1 }]],
						[{ [b]: "1px solid yellow" }, [{ [b]: "1px solid yellow" }]],
						[{ [b]: "s" }, [{ [b]: "1px dotted cyan" }]],
						[{ [b]: "m" }, [{ [b]: "2rem dashed blue" }]],
						[{ [b]: "l" }, [{ [b]: "3px solid red" }]],
					],
				});
			});
		});

		it("borderColor props", () => {
			[
				"borderColor",
				"borderTopColor",
				"borderLeftColor",
				"borderRightColor",
				"borderBottomColor",
			].forEach((b) => {
				test({
					steps: [
						[{ [b]: "blue" }, [{ [b]: "blue" }]],
						[{ [b]: "primary" }, [{ [b]: "cyan" }]],
					],
				});
			});
		});

		it("borderStyle props", () => {
			[
				"borderStyle",
				"borderTopStyle",
				"borderLeftStyle",
				"borderRightStyle",
				"borderBottomStyle",
			].forEach((b) => {
				test({
					steps: [
						[{ [b]: "dotted" }, [{ [b]: "dotted" }]],
						[{ [b]: "solid" }, [{ [b]: "solid" }]],
					],
				});
			});
		});

		it("borderStyle props", () => {
			[
				"borderStyle",
				"borderTopStyle",
				"borderLeftStyle",
				"borderRightStyle",
				"borderBottomStyle",
			].forEach((b) => {
				test({
					steps: [
						[{ [b]: "dotted" }, [{ [b]: "dotted" }]],
						[{ [b]: "solid" }, [{ [b]: "solid" }]],
					],
				});
			});
		});

		it("borderX props", () => {
			test({
				steps: [
					[{ borderX: 1 }, [{ borderLeft: 1, borderRight: 1 }]],
					[
						{ borderX: "1px solid yellow" },
						[
							{
								borderLeft: "1px solid yellow",
								borderRight: "1px solid yellow",
							},
						],
					],
					[
						{ borderX: "s" },
						[{ borderLeft: "1px dotted cyan", borderRight: "1px dotted cyan" }],
					],
					[
						{ borderX: "m" },
						[
							{
								borderLeft: "2rem dashed blue",
								borderRight: "2rem dashed blue",
							},
						],
					],
					[
						{ borderX: "l" },
						[{ borderLeft: "3px solid red", borderRight: "3px solid red" }],
					],
				],
			});
		});

		it("borderY props", () => {
			test({
				steps: [
					[{ borderY: 1 }, [{ borderTop: 1, borderBottom: 1 }]],
					[
						{ borderY: "1px solid yellow" },
						[
							{
								borderTop: "1px solid yellow",
								borderBottom: "1px solid yellow",
							},
						],
					],
					[
						{ borderY: "s" },
						[{ borderTop: "1px dotted cyan", borderBottom: "1px dotted cyan" }],
					],
					[
						{ borderY: "m" },
						[
							{
								borderTop: "2rem dashed blue",
								borderBottom: "2rem dashed blue",
							},
						],
					],
					[
						{ borderY: "l" },
						[{ borderTop: "3px solid red", borderBottom: "3px solid red" }],
					],
				],
			});
		});

		it("borderRadius", () => {
			[
				"borderRadius",
				"borderTopLeftRadius",
				"borderTopRightRadius",
				"borderBottomRightRadius",
				"borderBottomLeftRadius",
			].forEach((b) => {
				test({
					steps: [
						[{ [b]: "5px" }, [{ [b]: "5px" }]],
						[{ [b]: 10 }, [{ [b]: 10 }]],
						[{ [b]: "l" }, [{ [b]: "3rem" }]],
					],
				});
			});

			[
				{
					v: "borderTopRadius",
					k: ["borderTopLeftRadius", "borderTopRightRadius"],
				},
				{
					v: "borderRightRadius",
					k: ["borderTopRightRadius", "borderBottomRightRadius"],
				},
				{
					v: "borderBottomRadius",
					k: ["borderBottomLeftRadius", "borderBottomRightRadius"],
				},
				{
					v: "borderLeftRadius",
					k: ["borderTopLeftRadius", "borderBottomLeftRadius"],
				},
			].forEach((r) => {
				test({
					steps: [
						[{ [r.v]: "5px" }, [{ [r.k[0]]: "5px", [r.k[1]]: "5px" }]],
						[{ [r.v]: 10 }, [{ [r.k[0]]: 10, [r.k[1]]: 10 }]],
						[{ [r.v]: "s" }, [{ [r.k[0]]: "1.5rem", [r.k[1]]: "1.5rem" }]],
					],
				});
			});
		});

		it("outline", () => {
			test({
				steps: [
					[{ outline: "1px dotted #fff" }, [{ outline: "1px dotted #fff" }]],
				],
			});
		});

		it("outlineWidth", () => {
			test({
				steps: [[{ outlineWidth: "1px" }, [{ outlineWidth: "1px" }]]],
			});
		});

		it("outlineStyle", () => {
			test({
				steps: [[{ outlineStyle: "dashed" }, [{ outlineStyle: "dashed" }]]],
			});
		});

		it("outlineColor", () => {
			test({
				steps: [
					[{ outlineColor: "red" }, [{ outlineColor: "cyan" }]],
					[{ outlineColor: "white" }, [{ outlineColor: "white" }]],
				],
				theme: {
					colors: {
						sets: {
							red: "cyan",
						},
					},
				},
			});
		});
	});
});

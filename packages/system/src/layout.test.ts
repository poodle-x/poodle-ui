import { getzIndex, layoutSystem } from "./layout";
import { SystemTestCase, systemPropTestCases } from "./utils/testHelper";
import { SystemThemeConfig } from "./index";

describe("layout system", () => {
	describe("getzIndex", () => {
		it("should return zIndex with number", () => {
			const theme: SystemThemeConfig = {
				layouts: {
					zIndices: {},
				},
			};
			const result = getzIndex(1000)({ theme });
			expect(result).toEqual(1000);
		});

		it("should return zIndex with string", () => {
			const theme: SystemThemeConfig = {
				layouts: {
					zIndices: {},
				},
			};
			const result = getzIndex("auto")({ theme });
			expect(result).toEqual("auto");
		});

		it("should return zIndex with theme system", () => {
			const theme: SystemThemeConfig = {
				layouts: {
					zIndices: {
						header: "1000",
						footer: 1200,
					},
				},
			};
			let result = getzIndex("header")({ theme });
			expect(result).toEqual("1000");

			result = getzIndex("footer")({ theme });
			expect(result).toEqual(1200);

			result = getzIndex("auto")({ theme });
			expect(result).toEqual("auto");
		});
	});

	describe("layout props", () => {
		const testCases: SystemTestCase[] = [
			{
				name: "width props",
				data: {
					steps: [
						[{ w: 100 }, [{ width: 100 }]],
						[{ width: "100vh" }, [{ width: "100vh" }]],
						[
							{
								custom: 100,
								width: (props: any) => {
									return props.custom;
								},
							},
							[
								{
									custom: 100,
								},
								{
									width: 100,
								},
							],
						],
					],
				},
			},
			{
				name: "height props",
				data: {
					steps: [
						[{ h: 100 }, [{ height: 100 }]],
						[{ height: "100vh" }, [{ height: "100vh" }]],
						[
							{
								custom: 100,
								height: (props: any) => {
									return props.custom;
								},
							},
							[
								{
									custom: 100,
								},
								{ height: 100 },
							],
						],
					],
				},
			},
			{
				name: "display props",
				data: {
					steps: [
						[{ display: "flex" }, [{ display: "flex" }]],
						[
							{
								custom: "aaa",
								display: (props: any) => {
									return props.custom;
								},
							},
							[
								{
									custom: "aaa",
								},
								{ display: "aaa" },
							],
						],
					],
				},
			},
			{
				name: "size props",
				data: {
					steps: [
						[{ size: 10 }, [{ width: 10, height: 10 }]],
						[{ size: "100rem" }, [{ width: "100rem", height: "100rem" }]],
						[
							{
								custom: 50,
								size: (props: any) => {
									return props.custom;
								},
							},
							[
								{
									custom: 50,
								},
								{ width: 50, height: 50 },
							],
						],
					],
				},
			},
			{
				name: "position props",
				data: {
					steps: [
						[{ position: "absolute" }, [{ position: "absolute" }]],
						[
							{
								custom: "aaa",
								position: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: "aaa" }, { position: "aaa" }],
						],
					],
				},
			},
			{
				name: "top props",
				data: {
					steps: [
						[{ top: "scale-1.5" }, [{ top: "2.25rem" }]],
						[{ top: 1 }, [{ top: 1 }]],
						[{ top: "10px" }, [{ top: "10px" }]],
						[
							{
								custom: 1,
								top: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: 1 }, { top: 1 }],
						],
					],
				},
			},
			{
				name: "bottom props",
				data: {
					steps: [
						[{ bottom: "scale-1.5" }, [{ bottom: "2.25rem" }]],
						[{ bottom: 1 }, [{ bottom: 1 }]],
						[{ bottom: "10px" }, [{ bottom: "10px" }]],
						[
							{
								custom: 1,
								bottom: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: 1 }, { bottom: 1 }],
						],
					],
				},
			},
			{
				name: "left props",
				data: {
					steps: [
						[{ left: "scale-1.5" }, [{ left: "2.25rem" }]],
						[{ left: 1 }, [{ left: 1 }]],
						[{ left: "10px" }, [{ left: "10px" }]],
						[
							{
								custom: 1,
								left: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: 1 }, { left: 1 }],
						],
					],
				},
			},
			{
				name: "right props",
				data: {
					steps: [
						[{ right: "scale-1.5" }, [{ right: "2.25rem" }]],
						[{ right: 1 }, [{ right: 1 }]],
						[{ right: "10px" }, [{ right: "10px" }]],
						[
							{
								custom: 1,
								right: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: 1 }, { right: 1 }],
						],
					],
				},
			},
			{
				name: "minWidth props",
				data: {
					steps: [
						[{ minWidth: "scale-1.5" }, [{ minWidth: "2.25rem" }]],
						[{ minWidth: 1 }, [{ minWidth: 1 }]],
						[{ minWidth: "10px" }, [{ minWidth: "10px" }]],
						[
							{
								custom: 1,
								minWidth: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: 1 }, { minWidth: 1 }],
						],
					],
				},
			},
			{
				name: "maxWidth props",
				data: {
					steps: [
						[{ maxWidth: "scale-1.5" }, [{ maxWidth: "2.25rem" }]],
						[{ maxWidth: 1 }, [{ maxWidth: 1 }]],
						[{ maxWidth: "10px" }, [{ maxWidth: "10px" }]],
						[
							{
								custom: 1,
								maxWidth: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: 1 }, { maxWidth: 1 }],
						],
					],
				},
			},
			{
				name: "maxHeight props",
				data: {
					steps: [
						[{ maxHeight: "scale-1.5" }, [{ maxHeight: "2.25rem" }]],
						[{ maxHeight: 1 }, [{ maxHeight: 1 }]],
						[{ maxHeight: "10px" }, [{ maxHeight: "10px" }]],
						[
							{
								custom: 1,
								maxHeight: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: 1 }, { maxHeight: 1 }],
						],
					],
				},
			},
			{
				name: "minHeight props",
				data: {
					steps: [
						[{ minHeight: "scale-1.5" }, [{ minHeight: "2.25rem" }]],
						[{ minHeight: 1 }, [{ minHeight: 1 }]],
						[{ minHeight: "10px" }, [{ minHeight: "10px" }]],
						[
							{
								custom: 1,
								minHeight: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: 1 }, { minHeight: 1 }],
						],
					],
				},
			},
			{
				name: "overflow props",
				data: {
					steps: [
						[{ overflow: "hidden" }, [{ overflow: "hidden" }]],
						[
							{
								custom: "auto",
								overflow: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: "auto" }, { overflow: "auto" }],
						],
					],
				},
			},
			{
				name: "overflowX props",
				data: {
					steps: [
						[{ overflowX: "hidden" }, [{ overflowX: "hidden" }]],
						[
							{
								custom: "auto",
								overflowX: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: "auto" }, { overflowX: "auto" }],
						],
					],
				},
			},
			{
				name: "overflowY props",
				data: {
					steps: [
						[{ overflowY: "hidden" }, [{ overflowY: "hidden" }]],
						[
							{
								custom: "auto",
								overflowY: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: "auto" }, { overflowY: "auto" }],
						],
					],
				},
			},
			{
				name: "visibility props",
				data: {
					steps: [[{ visibility: "hidden" }, [{ visibility: "hidden" }]]],
				},
			},
			{
				name: "zIndex props",
				data: {
					steps: [
						[{ zIndex: "auto" }, [{ zIndex: "auto" }]],
						[{ zIndex: "header" }, [{ zIndex: "1000" }]],
						[
							{
								custom: "footer",
								zIndex: (props: any) => {
									return props.custom;
								},
							},
							[{ custom: "footer" }, { zIndex: 1200 }],
						],
					],
				},
			},
		];

		systemPropTestCases({
			testCases,
			systemConfigs: layoutSystem,
			theme: {
				spacing: {
					scale: "1.5rem",
					sets: {
						s: "1.5rem",
						m: "2rem",
						l: "3rem",
					},
				},
				layouts: {
					zIndices: {
						header: "1000",
						footer: 1200,
					},
				},
			},
		});
	});
});

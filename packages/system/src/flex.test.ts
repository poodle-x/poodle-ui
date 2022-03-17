import { flexSystem } from "./flex";
import { systemPropTestCases, SystemTestCase } from "./utils/testHelper";

describe("system flex", () => {
	describe("flex props", () => {
		const testCases: SystemTestCase[] = [
			{
				name: "flex props",
				data: {
					steps: [
						[{ flex: 1 }, [{ flex: 1 }]],
						[{ flex: "0 0 30px" }, [{ flex: "0 0 30px" }]],
					],
				},
			},
			{
				name: "alignItems props",
				data: {
					steps: [[{ alignItems: "center" }, [{ alignItems: "center" }]]],
				},
			},
			{
				name: "alignContent props",
				data: {
					steps: [[{ alignContent: "center" }, [{ alignContent: "center" }]]],
				},
			},
			{
				name: "justifyItems props",
				data: {
					steps: [[{ justifyItems: "center" }, [{ justifyItems: "center" }]]],
				},
			},
			{
				name: "justifyContent props",
				data: {
					steps: [
						[
							{ justifyContent: "flex-start" },
							[{ justifyContent: "flex-start" }],
						],
					],
				},
			},
			{
				name: "flexWrap props",
				data: {
					steps: [[{ flexWrap: "wrap" }, [{ flexWrap: "wrap" }]]],
				},
			},
			{
				name: "flexGrow props",
				data: {
					steps: [[{ flexGrow: 0 }, [{ flexGrow: 0 }]]],
				},
			},
			{
				name: "flexShrink props",
				data: {
					steps: [[{ flexShrink: 1 }, [{ flexShrink: 1 }]]],
				},
			},
			{
				name: "flexBasis props",
				data: {
					steps: [
						[{ flexBasis: 100 }, [{ flexBasis: 100 }]],
						[{ flexBasis: "auto" }, [{ flexBasis: "auto" }]],
					],
				},
			},
			{
				name: "justifySelf props",
				data: {
					steps: [[{ justifySelf: "center" }, [{ justifySelf: "center" }]]],
				},
			},
			{
				name: "alignSelf props",
				data: {
					steps: [[{ alignSelf: "center" }, [{ alignSelf: "center" }]]],
				},
			},
			{
				name: "order props",
				data: {
					steps: [[{ order: 2 }, [{ order: 2 }]]],
				},
			},
			{
				name: "flexDir props",
				data: {
					steps: [[{ flexDir: "row" }, [{ flexDirection: "row" }]]],
				},
			},
			{
				name: "flexDirection props",
				data: {
					steps: [[{ flexDirection: "column" }, [{ flexDirection: "column" }]]],
				},
			},
		];

		systemPropTestCases({
			testCases,
			systemConfigs: flexSystem,
		});
	});
});

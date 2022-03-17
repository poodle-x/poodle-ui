import { SystemTestCase, systemPropTestCases } from "./utils/testHelper";
import { listSystem } from "./list";

describe("list system", () => {
	describe("list props", () => {
		const testCases: SystemTestCase[] = [
			{
				name: "listStyle props",
				data: {
					steps: [
						[
							{ listStyle: 'square inside url("sqpurple.gif")' },
							[{ listStyle: 'square inside url("sqpurple.gif")' }],
						],
					],
				},
			},
			{
				name: "listStyleType props",
				data: {
					steps: [[{ listStyleType: "none" }, [{ listStyleType: "none" }]]],
				},
			},
			{
				name: "listStylePosition props",
				data: {
					steps: [
						[
							{ listStylePosition: "inside" },
							[{ listStylePosition: "inside" }],
						],
					],
				},
			},
			{
				name: "listStyleImage props",
				data: {
					steps: [
						[
							{ listStyleImage: "url('sqpurple.gif')" },
							[{ listStyleImage: "url('sqpurple.gif')" }],
						],
					],
				},
			},
		];

		systemPropTestCases({
			testCases,
			systemConfigs: listSystem,
		});
	});
});

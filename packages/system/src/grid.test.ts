import { gridSystem } from "./grid";
import { systemPropTestCases, SystemTestCase } from "./utils/testHelper";

describe("system grid", () => {
	describe("grid props", () => {
		const testCases: SystemTestCase[] = [
			{
				name: "gridTemplateRows props",
				data: {
					steps: [
						[
							{ gridTemplateRows: "1px 10px" },
							[{ gridTemplateRows: "1px 10px" }],
						],
					],
				},
			},
			{
				name: "gridTemplateColumns props",
				data: {
					steps: [
						[
							{ gridTemplateColumns: "1px 10px" },
							[{ gridTemplateColumns: "1px 10px" }],
						],
					],
				},
			},
			{
				name: "gridRowGap props",
				data: {
					steps: [
						[{ gridRowGap: "scale-2" }, [{ gridRowGap: "3rem" }]],
						[{ gridRowGap: "m" }, [{ gridRowGap: "2rem" }]],
						[{ gridRowGap: "20px" }, [{ gridRowGap: "20px" }]],
					],
				},
			},
			{
				name: "gridColumnGap props",
				data: {
					steps: [
						[{ gridColumnGap: "scale-3" }, [{ gridColumnGap: "4.5rem" }]],
						[{ gridColumnGap: "s" }, [{ gridColumnGap: "1.5rem" }]],
						[{ gridColumnGap: "20px" }, [{ gridColumnGap: "20px" }]],
					],
				},
			},
			{
				name: "gridGap props",
				data: {
					steps: [
						[{ gridGap: "scale-3" }, [{ gridColumnGap: "4.5rem" }]],
						[{ gridGap: "s" }, [{ gridColumnGap: "1.5rem" }]],
						[{ gridGap: "20px 10px" }, [{ gridColumnGap: "20px 10px" }]],
					],
				},
			},
			{
				name: "gridRowStart props",
				data: {
					steps: [[{ gridRowStart: "2 3" }, [{ gridRowStart: "2 3" }]]],
				},
			},
			{
				name: "gridRowEnd props",
				data: {
					steps: [[{ gridRowEnd: "2 3" }, [{ gridRowEnd: "2 3" }]]],
				},
			},
			{
				name: "gridColumnStart props",
				data: {
					steps: [[{ gridColumnStart: "2 3" }, [{ gridColumnStart: "2 3" }]]],
				},
			},
			{
				name: "gridColumnEnd props",
				data: {
					steps: [[{ gridColumnEnd: "2 3" }, [{ gridColumnEnd: "2 3" }]]],
				},
			},
			{
				name: "gridRow props",
				data: {
					steps: [[{ gridRow: "2 3" }, [{ gridRow: "2 3" }]]],
				},
			},
			{
				name: "gridColumn props",
				data: {
					steps: [[{ gridColumn: "2 3" }, [{ gridColumn: "2 3" }]]],
				},
			},
			{
				name: "gridArea props",
				data: {
					steps: [[{ gridArea: "2 3" }, [{ gridArea: "2 3" }]]],
				},
			},
			{
				name: "gridTemplateAreas props",
				data: {
					steps: [
						[{ gridTemplateAreas: "2 3" }, [{ gridTemplateAreas: "2 3" }]],
					],
				},
			},
			{
				name: "gridAutoColumns props",
				data: {
					steps: [[{ gridAutoColumns: "1fr" }, [{ gridAutoColumns: "1fr" }]]],
				},
			},
			{
				name: "gridAutoRows props",
				data: {
					steps: [[{ gridAutoRows: "1fr" }, [{ gridAutoRows: "1fr" }]]],
				},
			},
			{
				name: "gridAutoFlow props",
				data: {
					steps: [[{ gridAutoRows: "column" }, [{ gridAutoRows: "column" }]]],
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
				name: "alignContent props",
				data: {
					steps: [[{ alignContent: "center" }, [{ alignContent: "center" }]]],
				},
			},
			{
				name: "justifyContent props",
				data: {
					steps: [
						[{ justifyContent: "center" }, [{ justifyContent: "center" }]],
					],
				},
			},
		];

		systemPropTestCases({
			testCases,
			systemConfigs: gridSystem,
			theme: {
				spacing: {
					scale: "1.5rem",
					sets: {
						s: "1.5rem",
						m: "2rem",
						l: "3rem",
					},
				},
			},
		});
	});
});

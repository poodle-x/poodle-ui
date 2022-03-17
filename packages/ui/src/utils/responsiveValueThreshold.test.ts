import { responsiveValueThreshold } from "./responsiveValueThreshold";

const br = ["xs", "sm", "md", "lg"];

describe("responsiveValueThreshold", () => {
	it("return current value when value is not object or array", () => {
		const result1 = responsiveValueThreshold<string>("10px", "xs", br);
		expect(result1).toEqual({ xs: "10px" });

		const result2 = responsiveValueThreshold<number>(5, "md", br);
		expect(result2).toEqual({ md: 5 });
	});

	it("return responsive value correctly when value is object", () => {
		const result1 = responsiveValueThreshold<number>(
			{ xs: 10, sm: 15, md: 20, lg: 25 },
			"xs",
			br
		);

		expect(result1).toEqual({
			lg: 25,
			md: 20,
			sm: 15,
			xs: 10,
		});

		const result2 = responsiveValueThreshold<number>(
			{ xs: 10, sm: 15, md: 20, lg: 25 },
			"md",
			br
		);

		expect(result2).toEqual({
			lg: 25,
			md: 20,
		});

		const result3 = responsiveValueThreshold<number>(
			{ xs: 10, sm: 15, md: 20, lg: 25 },
			"lg",
			br
		);

		expect(result3).toEqual({
			lg: 25,
		});

		const result4 = responsiveValueThreshold<number>(
			{ xs: 10, sm: 15, md: 20, lg: 25 },
			"unknown",
			br
		);

		expect(result4).toEqual({ xs: 10, sm: 15, md: 20, lg: 25 });
	});

	it("return responsive value correctly when value is array", () => {
		const result1 = responsiveValueThreshold<number>([5, 10, 15, 20], "xs", br);
		expect(result1).toEqual({
			md: 20,
			sm: 15,
			xs: 10,
		});

		const result2 = responsiveValueThreshold<number>(
			[5, 10, 15, 20, 25, 30],
			"sm",
			br
		);
		expect(result2).toEqual({
			lg: 25,
			md: 20,
			sm: 15,
		});

		const result3 = responsiveValueThreshold<number>(
			[5, 10, 15, 20, 25, 30],
			"lg",
			br
		);
		expect(result3).toEqual({
			lg: 25,
		});

		const result4 = responsiveValueThreshold<number>([5, 10], "lg", br);
		expect(result4).toEqual([5, 10]);
	});
});

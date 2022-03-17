import { transformResponsiveValue } from "./transformResponsiveValue";

describe("transformResponsiveValue", () => {
	it("should transform array", () => {
		const result = transformResponsiveValue<number>(
			[1, 2, 3, () => 4],
			(value) => {
				if (typeof value === "function") {
					return value({}) + 1;
				}
				return value + 1;
			}
		);

		expect(result).toEqual([2, 3, 4, 5]);
	});

	it("should transform primitive value", () => {
		const result = transformResponsiveValue<string>("hello", (value) => {
			if (typeof value === "function") {
				return value({}) + " world";
			}
			return value + " world";
		});

		expect(result).toEqual("hello world");
	});

	it("should transform object value", () => {
		const result = transformResponsiveValue<number>(
			{
				a: 1,
				b: 2,
				c: [1, 2, 3],
			},
			(value) => {
				if (typeof value === "function") {
					return value({}) + 1;
				}
				return value + 1;
			}
		);

		expect(result).toEqual({
			a: 2,
			b: 3,
			c: [2, 3, 4],
		});
	});
});

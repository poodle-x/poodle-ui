import { negativeResponsiveValue } from "./negativeResponsiveValue";

describe("negativeResponsiveValue.ts", () => {
	it("should return negative value when pass string value", () => {
		const result = negativeResponsiveValue("1px");
		expect(result).toEqual("-1px");
	});

	it("should return negative value when pass number value", () => {
		const result = negativeResponsiveValue(10);
		expect(result).toEqual(-10);
	});

	it("should return not changed value when pass value is not string or number", () => {
		const a = () => {
			return 1;
		};
		const result = negativeResponsiveValue(a);
		expect(result).toEqual(a);
	});

	it("should return negative value when pass array value", () => {
		const a = () => {
			return 1;
		};
		const result = negativeResponsiveValue([10, "50px", a]);
		expect(result).toEqual([-10, "-50px", a]);
	});

	it("should return negative value when pass object value", () => {
		const a = () => {
			return 1;
		};
		const result = negativeResponsiveValue({
			sm: 1,
			md: "50px",
			lg: a,
		});
		expect(result).toEqual({
			sm: -1,
			md: "-50px",
			lg: a,
		});
	});
});

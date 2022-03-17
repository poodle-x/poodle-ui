import safeThemeUnitValue from "./safeThemeValue";

describe("safeThemeUnitValue", () => {
	it("should return string value", () => {
		expect(safeThemeUnitValue("20px")).toEqual("20px");
	});

	it("should return number with unit value", () => {
		expect(safeThemeUnitValue(20)).toEqual("20px");
		expect(
			safeThemeUnitValue(20, {
				unit: "rem",
			})
		).toEqual("20rem");
	});
});

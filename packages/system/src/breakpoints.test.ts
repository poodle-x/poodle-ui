import { getBreakpoint } from "./breakpoints";
import { SystemThemeConfig } from "./";

describe("theme breakpoints", () => {
	describe("getBreakpoint", () => {
		it("should return breakpoint with scale number", () => {
			const theme: SystemThemeConfig = {
				breakpoints: {
					scale: ["b", "a", "c"],
					sets: {
						a: 1,
						b: "2px",
						c: () => {
							return 10;
						},
					},
				},
			};

			const results = [
				getBreakpoint(0)({ theme }),
				getBreakpoint(1)({ theme }),
				getBreakpoint(2)({ theme }),
			];

			expect(results).toEqual(["2px", 1, 10]);
		});

		it("should return breakpoint in sets", () => {
			const theme: SystemThemeConfig = {
				breakpoints: {
					sets: {
						a: 1,
						b: "2px",
						c: () => {
							return 10;
						},
					},
				},
			};

			const results = [
				getBreakpoint("b")({ theme }),
				getBreakpoint("a")({ theme }),
				getBreakpoint("c")({ theme }),
				getBreakpoint("d")({ theme }),
			];

			expect(results).toEqual(["2px", 1, 10, ""]);
		});
	});
});

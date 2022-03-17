import setRef from "./setRef";

describe("setRef", () => {
	it("Should set when pass ref function", () => {
		const mock = jest.fn();
		setRef(mock, null);
		expect(mock).toBeCalledWith(null);
	});

	it("Should set when pass ref curent", () => {
		const ref = {
			current: "abc",
		};
		setRef(ref as any, null);
		expect(ref.current).toEqual(null);
	});
});

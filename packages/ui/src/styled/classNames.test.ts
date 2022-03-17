import { classNameCompose, genClassNames } from "./classNames";

describe("classNameCompose", () => {
	it("Should return class name", () => {
		const result = classNameCompose({
			props: {},
			overrideClassName: undefined,
			styles: {
				base: [{ height: 10 }],
			},
		});
		expect(result).not.toEqual("");
	});

	it("Should override class name", () => {
		const result = classNameCompose({
			props: {},
			overrideClassName: "abc",
			styles: {
				base: [{ height: 10 }],
			},
		});
		expect(result).toEqual("abc");
	});
});

describe("genClassNames", () => {
	it("should return string class names", () => {
		const props = {};
		const results = [
			genClassNames({
				props,
				classNames: [],
			}),
			genClassNames({
				props,
				classNames: ["a"],
			}),
			genClassNames({
				props,
				classNames: ["a", "b"],
			}),
		];

		expect(results).toEqual(["", "a", "a b"]);
	});

	it("should return string class names with boolean check", () => {
		const props = {};
		const results = genClassNames({
			props,
			classNames: ["a", "b", { c: true }, { d: true, f: false }],
		});

		expect(results).toEqual("a b c d");
	});

	it("should return string class names with function return", () => {
		const props = { name: "c" };
		const results = genClassNames({
			props,
			classNames: [
				"a",
				"b",
				(props) => {
					return props.name;
				},
			],
		});

		expect(results).toEqual("a b c");
	});
});

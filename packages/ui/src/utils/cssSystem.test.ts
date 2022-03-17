import { cssSystem } from "./cssSystem";

describe("cssSystem", () => {
	it("should merge base styles", () => {
		const props = {};
		const result = cssSystem({
			props,
			base: [
				{
					width: 100,
				},
				{
					height: 100,
				},
			],
		});

		expect(result).toEqual([
			[
				{
					width: 100,
				},
			],
			[
				{
					height: 100,
				},
			],
		]);
	});

	it("should extend styles", () => {
		const props = {
			value: 200,
		};
		const result = cssSystem({
			props,
			base: [
				{
					width: 100,
				},
				{
					height: 100,
				},
			],
			applies: [
				(props) => {
					return { top: props.value };
				},
				{
					bottom: 0,
				},
			],
		});

		expect(result).toEqual([
			[
				{
					width: 100,
				},
			],
			[
				{
					height: 100,
				},
			],
			[
				{
					top: 200,
				},
			],
			[
				{
					bottom: 0,
				},
			],
		]);
	});

	it("Should override styles", () => {
		const result = cssSystem({
			props: {},
			base: [
				{
					width: 100,
				},
			],
			applies: [{ height: 100 }],
			override: {
				top: 0,
			},
		});

		expect(result).toEqual([{ top: 0 }]);
	});
});

import { ModalStyleKeys } from "../Modal";
import { createCSSSystemStandard } from "../theme";
import { cssSystem, getCSSSystemBoxProps } from "./system";

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

	describe("getCSSSystemBoxProps", () => {
		it("Should return props", () => {
			const result = getCSSSystemBoxProps({
				fnCSSSystem: [
					(props) => {
						return createCSSSystemStandard<ModalStyleKeys>({
							key: "root",
							props,
							base: [
								{
									mt: 10,
									p: 50,
								},
							],
						});
					},
				],
			});
			expect(result._sx).toEqual([[[{ marginTop: 10 }, { padding: 50 }]]]);
			expect(result.className).toEqual("");
		});

		it("Should return base class", () => {
			const result = getCSSSystemBoxProps({
				baseClassName: ["test", "hello"],
				fnCSSSystem: [
					(props) => {
						return createCSSSystemStandard<ModalStyleKeys>({
							key: "root",
							props,
							base: [{}],
						});
					},
				],
			});
			expect(result.className).toEqual("test hello");
		});

		it("Should send theme", () => {
			const result = getCSSSystemBoxProps({
				isLocalTheme: true,
				componentProps: {
					theme: {
						test: 5,
					},
				},
				fnCSSSystem: [
					(props) => {
						return createCSSSystemStandard<ModalStyleKeys>({
							key: "root",
							props,
							base: [
								{
									mt: props.theme.test,
								},
							],
						});
					},
				],
			});
			expect(result._sx).toEqual([[[{ marginTop: 5 }]]]);
			expect(result.theme).toEqual({ test: 5 });

			const result2 = getCSSSystemBoxProps({
				isLocalTheme: false,
				componentProps: {
					theme: {
						test: 5,
					},
				},
				fnCSSSystem: [
					(props) => {
						return createCSSSystemStandard<ModalStyleKeys>({
							key: "root",
							props,
							base: [
								{
									mt: props.theme.test,
								},
							],
						});
					},
				],
			});
			expect(result2._sx).toEqual([[[{ marginTop: 5 }]]]);
			expect(result2.theme).toEqual(undefined);
		});

		it("Should handle isRoot", () => {
			const result = getCSSSystemBoxProps({
				isRoot: true,
				componentProps: {
					className: "root",
					_sx: {
						display: "block",
						left: "10px",
					},
				},
				baseClassName: ["test", "hello"],
				fnCSSSystem: [
					(props) => {
						return createCSSSystemStandard<ModalStyleKeys>({
							key: "root",
							props,
							base: [
								{
									mt: "10",
									p: 50,
								},
							],
						});
					},
				],
			});

			expect(result.className).toEqual("test hello root");
			expect(result._sx).toEqual([
				[
					[
						{
							marginTop: "10",
						},
						{
							padding: 50,
						},
					],
				],
				{
					display: "block",
					left: "10px",
				},
			]);
		});

		it("Should return part sx and props", () => {
			const result = getCSSSystemBoxProps({
				partProps: {
					test: "hello",
					_sx: {
						display: "block",
						left: "10px",
					},
				},
				fnCSSSystem: [
					(props) => {
						return createCSSSystemStandard<ModalStyleKeys>({
							key: "root",
							props,
							base: [
								{
									marginTop: "10",
								},
							],
						});
					},
				],
			});

			expect((result as any).test).toEqual("hello");
			expect(result._sx).toEqual([
				[
					[
						{
							marginTop: "10",
						},
					],
				],
				{
					display: "block",
					left: "10px",
				},
			]);
		});
	});
});

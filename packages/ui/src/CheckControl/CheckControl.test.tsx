import React from "react";
import { render } from "../utils/test";
import CheckControl from "./";
import { ThemeConfig } from "../theme";

describe("<CheckControl />", () => {
	it("should render CheckControl correctly", () => {
		const { container } = render(
			<CheckControl checkType="checkbox" checkLabel="label" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref: any = React.createRef<HTMLDivElement>();

		render(<CheckControl checkType="checkbox" checkLabel="label" ref={ref} />);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render control", () => {
		const { container } = render(
			<CheckControl
				checkType="checkbox"
				checkLabel="label"
				renderIcon={<span>Icon</span>}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should pass custom props", () => {
		const { container } = render(
			<CheckControl
				inputProps={{
					"aria-checked": true,
					pt: 20,
				}}
				controlProps={{
					"aria-required": true,
					mx: "30",
				}}
				iconProps={{
					"aria-required": true,
					mx: "30",
				}}
				labelProps={{
					"aria-required": true,
					mx: "30",
				}}
				checkType="radio"
				checkLabel="label"
				id="id"
				mt="20px"
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("size", () => {
		it(`Should render with size s correctly`, () => {
			const { container } = render(
				<CheckControl
					sizeStyle="s"
					checkType="checkbox"
					checkLabel="label"
					renderIcon={<span>Icon</span>}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it(`Should render with size m correctly`, () => {
			const { container } = render(
				<CheckControl
					sizeStyle="m"
					checkType="checkbox"
					checkLabel="label"
					renderIcon={<span>Icon</span>}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it(`Should render with size l correctly`, () => {
			const { container } = render(
				<CheckControl
					sizeStyle="l"
					checkType="checkbox"
					checkLabel="label"
					renderIcon={<span>Icon</span>}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			CheckControl: {
				styles: {
					root: {
						mt: 10,
					},
					control: {
						mt: 11,
					},
					icon: {
						mt: 12,
					},
					input: {
						mt: 13,
					},
					label: {
						mt: 14,
					},
				},
				modes: {
					mode: {
						variants: {
							custom: {
								root: {
									letterSpacing: 210,
								},
							},
						},
						styles: {
							root: {
								textIndent: 1,
							},
							control: {
								textIndent: 2,
							},
							icon: {
								textIndent: 3,
							},
							input: {
								textIndent: 4,
							},
							label: {
								textIndent: 5,
							},
						},
					},
				},
				variants: {
					custom: {
						root: {
							bottom: 200,
						},
						control: {
							bottom: 201,
						},
						icon: {
							bottom: 202,
						},
						input: {
							bottom: 203,
						},
						label: {
							bottom: 204,
						},
					},
				},
			},
		};

		it("should extend styles in global", () => {
			const { container } = render(
				<CheckControl checkType="checkbox" checkLabel="label" />,

				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<CheckControl
					checkType="checkbox"
					checkLabel="label"
					variant="custom"
					themeExtend={themeTest}
				/>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(
				<CheckControl checkType="checkbox" checkLabel="label" />,
				{
					theme: {
						CheckControl: {
							defaultProps: {
								id: "id",
								className: "hello",
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should disable classes", () => {
			const { container } = render(
				<CheckControl checkType="checkbox" checkLabel="label" />,
				{
					theme: {
						CheckControl: {
							overrideClasses: {
								root: true,
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override classes", () => {
			const { container } = render(
				<CheckControl checkType="checkbox" checkLabel="label" />,
				{
					theme: {
						CheckControl: {
							overrideClasses: {
								root: "morning",
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(
				<CheckControl checkType="checkbox" checkLabel="label" />,
				{
					theme: {
						CheckControl: {
							overrides: {
								root: {
									mt: 50,
								},
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});

import React from "react";
import { render } from "../utils/test";
import Button from "./Button";

describe("<Button />", () => {
	it("should render correctly", () => {
		const { container } = render(<Button>Hello</Button>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLButtonElement>();

		render(<Button ref={ref}>Button</Button>);

		expect(ref.current).toMatchSnapshot();
	});

	it("should render HTML attributes", () => {
		const { container } = render(
			<Button aria-disabled="true" id="button">
				Button
			</Button>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with start icon correctly", () => {
		const { container } = render(<Button startIcon="icon">Button</Button>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with end icon correctly", () => {
		const { container } = render(<Button endIcon="icon">Button</Button>);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("size", () => {
		it(`Should render button with size s correctly`, () => {
			const { container } = render(<Button sizeStyle="s">Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it(`Should render button with size m correctly`, () => {
			const { container } = render(<Button sizeStyle="s">Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});

		it(`Should render button with size l correctly`, () => {
			const { container } = render(<Button sizeStyle="l">Button</Button>);
			expect(container.firstChild).toMatchSnapshot();
		});
	});

	describe("variant", () => {
		describe.each([["default"], ["outline"], ["fill"]])(
			"variant %s",
			(variant) => {
				describe.each([
					["default"],
					["primary"],
					["negative"],
					["positive"],
					["warn"],
				])("color %s", (color) => {
					it(`should render with color ${color} correctly`, () => {
						const { container } = render(
							<Button variant={variant} colorStyle={color}>
								Button
							</Button>
						);
						expect(container.firstChild).toMatchSnapshot();
					});

					it(`should render disabled with color ${color} correctly`, () => {
						const { container } = render(
							<Button variant={variant} disabled={true}>
								Button
							</Button>
						);
						expect(container.firstChild).toMatchSnapshot();
					});
				});
			}
		);
	});

	describe("theming", () => {
		const themeTest = {
			mode: "mode",
			Button: {
				variants: {
					custom: {
						root: {
							letterSpacing: 250,
						},
					},
				},
				modes: {
					mode: {
						styles: {
							content: {
								letterSpacing: 250,
							},
						},
						variants: {
							custom: {
								icon: {
									letterSpacing: 250,
								},
							},
						},
					},
				},
				sizes: {
					test: {
						root: {
							height: 50,
						},
						content: {
							height: 60,
						},
						icon: {
							height: 70,
						},
						startIcon: {
							height: 80,
						},
						endIcon: {
							height: 90,
						},
					},
				},
				styles: {
					root: {
						top: 0,
						textIndent: 1,
					},
					content: {
						top: 0,
						textIndent: 2,
					},
					icon: {
						top: 0,
						textIndent: 3,
					},
					startIcon: {
						top: 0,
						textIndent: 4,
					},
					endIcon: {
						top: 0,
						textIndent: 5,
					},
				},
			},
		};

		it("should extend styles in global", () => {
			const { container } = render(
				<Button variant="custom" startIcon="icon" endIcon="icon">
					Button
				</Button>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<Button
					variant="custom"
					startIcon="icon"
					endIcon="icon"
					themeExtend={themeTest}
				>
					Button
				</Button>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(
				<Button
					themeExtend={{
						Button: {
							defaultProps: {
								variant: "fill",
							},
						},
					}}
				>
					Button
				</Button>,
				{
					theme: {
						Button: {
							defaultProps: {
								colorStyle: "primary",
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend size styles", () => {
			const { container } = render(<Button sizeStyle="test">Hello</Button>, {
				theme: {
					Button: {
						sizes: {
							test: {
								root: {
									height: "100px",
								},
							},
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend size styles with mode", () => {
			const { container } = render(<Button sizeStyle="test">Hello</Button>, {
				theme: {
					mode: "test",
					Button: {
						sizes: {
							test: {
								root: {
									height: "100px",
								},
							},
						},
						modes: {
							test: {
								sizes: {
									test: {
										root: {
											height: "110px",
										},
									},
								},
							},
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});

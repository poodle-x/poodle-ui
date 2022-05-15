import React from "react";
import { ThemeConfig } from "../theme";
import { render } from "../utils/test";
import { Box, BoxProps } from "./Box";

describe("<Box />", () => {
	it("should render correctly", () => {
		const { container, rerender } = render(<Box />);

		expect(container.firstChild).toMatchSnapshot();

		rerender(<Box>test</Box>);

		expect(container.firstChild).toMatchSnapshot();
	});

	it("should not forward css prop when using as", () => {
		function Test(props: any) {
			return <p {...props}></p>;
		}

		const { container } = render(
			<Box p="10px" as={Test}>
				Hello
			</Box>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it("`ref` and `as` props should work", () => {
		const mockRef: React.RefObject<HTMLParagraphElement> = { current: null };

		render(<Box as="p" ref={mockRef} />);

		expect(mockRef.current).not.toBeNull();

		expect((mockRef.current as HTMLParagraphElement).tagName).toEqual("P");
	});

	it("should render correctly with aria* props", () => {
		const { container } = render(<Box aria-label="label" aria-live="polite" />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("system props should work", () => {
		const { container } = render(
			<Box
				test={10}
				p={[5, 10, 100]}
				m={{
					_: 15,
					sm: 25,
					md: 35,
					lg: 45,
					xl: 55,
				}}
				h={(p) => {
					return p.test;
				}}
				_hover={{
					color: ["red", "black"],
					display: "inline-grid",
					fontSize: {
						sm: "25px",
						md: "35px",
						lg: "35px",
						xl: (p) => {
							return p.test;
						},
					},
				}}
			>
				test
			</Box>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it("should parse CSSObjectSystem with sx props", () => {
		const { container } = render(
			<Box
				test={5}
				sx={{
					h: (p) => {
						return p.test;
					},
					userSelect: "none",
					p: [5, 10, 100],
					m: {
						_: 15,
						sm: 25,
						md: 35,
						lg: 45,
						xl: 55,
					},
					_hover: {
						color: ["red", "black"],
						display: "inline-grid",
						fontSize: {
							sm: "25px",
							md: "35px",
							lg: "35px",
							xl: (p) => {
								return p.test;
							},
						},
					},
				}}
			>
				test
			</Box>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it("should inject raw css with _sx props", () => {
		const { container } = render(
			<Box
				_sx={
					{
						p: 10,
						margin: 0,
						"&:hover": {
							color: "blue",
						},
						// Force any type to check the box should not process the padding system
					} as any
				}
			>
				test
			</Box>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it("box styles should always on top", () => {
		const Hello: React.FC<BoxProps> = (props) => {
			const { children } = props;
			return (
				<Box
					{...props}
					_sx={{
						fontSize: "20px",
					}}
					sx={{
						p: 10,
						m: 20,
					}}
				>
					{children}
				</Box>
			);
		};

		const { container } = render(<Hello p={50}>test</Hello>);

		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			Box: {
				modes: {
					mode: {
						styles: {
							root: {
								letterSpacing: 250,
							},
						},
					},
				},
				styles: {
					root: {
						top: 0,
						textIndent: 1,
					},
				},
			},
		};

		it("should extend theme in global", () => {
			const { container } = render(
				<Box m={20} p={20}>
					Button
				</Box>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend theme in local", () => {
			const { container } = render(
				<Box m={20} p={20} themeExtend={themeTest}>
					Button
				</Box>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles in global", () => {
			const { container } = render(
				<Box m={20} p={20} themeExtend={themeTest}>
					Button
				</Box>,
				{
					theme: {
						Box: {
							overrides: {
								root: {
									margin: 1,
								},
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles in local", () => {
			const { container } = render(
				<Box
					m={20}
					p={20}
					themeExtend={{
						Box: {
							overrides: {
								root: {
									margin: 2,
								},
							},
						},
					}}
				>
					Button
				</Box>,
				{
					theme: {
						Box: {
							overrides: {
								root: {
									margin: 1,
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

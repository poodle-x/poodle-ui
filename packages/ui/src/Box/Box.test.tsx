import React from "react";
import { Stylesheet, css, useClassNames } from "../styled";
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

	it("box styles should always on top", () => {
		const styles = () => {
			const style: Stylesheet = {
				padding: 20,
			};
			return css(style);
		};

		const Hello: React.FC<BoxProps> = (props) => {
			const { children } = props;

			const classes = useClassNames({
				props,
				lists: {
					root: {
						classNames: [styles],
					},
				},
			});

			return (
				<Box {...props} className={classes.root}>
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

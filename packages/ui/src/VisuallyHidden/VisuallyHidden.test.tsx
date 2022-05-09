import React from "react";
import { ThemeConfig } from "../theme";
import { render } from "../utils/test";
import VisuallyHidden from "./";

describe("<VisuallyHidden />", () => {
	it("should render VisuallyHidden correctly", () => {
		const { container } = render(
			<VisuallyHidden>VisuallyHidden</VisuallyHidden>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<VisuallyHidden ref={ref}>VisuallyHidden</VisuallyHidden>);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<VisuallyHidden as="p" id="id" mt="20px">
				VisuallyHidden
			</VisuallyHidden>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			VisuallyHidden: {
				styles: {
					root: {
						mt: 10,
						letterSpacing: 250,
					},
				},
				variants: {
					custom: {
						root: {
							top: 0,
							textIndent: 1,
						},
					},
				},
			},
		};

		it("should extend styles in global", () => {
			const { container } = render(
				<VisuallyHidden variant="custom">VisuallyHidden</VisuallyHidden>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<VisuallyHidden variant="custom" themeExtend={themeTest}>
					VisuallyHidden
				</VisuallyHidden>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(
				<VisuallyHidden>VisuallyHidden</VisuallyHidden>,
				{
					theme: {
						VisuallyHidden: {
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

		it("should override styles", () => {
			const { container } = render(
				<VisuallyHidden>VisuallyHidden</VisuallyHidden>,
				{
					theme: {
						VisuallyHidden: {
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

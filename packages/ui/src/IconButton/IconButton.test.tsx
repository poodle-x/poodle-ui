import React from "react";
import { ThemeConfig } from "../theme";
import { render } from "../utils/test";
import IconButton from "./";

describe("<IconButton />", () => {
	it("should render IconButton correctly", () => {
		const { container } = render(<IconButton>IconButton</IconButton>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render shape IconButton correctly", () => {
		const { container } = render(
			<IconButton shapeStyle="square">IconButton</IconButton>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<IconButton ref={ref}>IconButton</IconButton>);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<IconButton id="id" mt="20px">
				IconButton
			</IconButton>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			IconButton: {
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
				<IconButton variant="custom">IconButton</IconButton>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<IconButton variant="custom" themeExtend={themeTest}>
					IconButton
				</IconButton>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(<IconButton>IconButton</IconButton>, {
				theme: {
					IconButton: {
						defaultProps: {
							id: "id",
							className: "hello",
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(<IconButton>IconButton</IconButton>, {
				theme: {
					IconButton: {
						overrides: {
							root: {
								mt: 50,
							},
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});

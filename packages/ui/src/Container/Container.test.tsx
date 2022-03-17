import { render } from "../utils/test";
import Container from "./";
import React from "react";
import { ThemeConfig } from "../theme";

describe("<Container />", () => {
	it("should render Container correctly", () => {
		const { container } = render(<Container>Container</Container>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<Container ref={ref}>Container</Container>);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<Container id="id" mt="20px" aria-expanded="true">
				Container
			</Container>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with fixed prop", () => {
		const { container } = render(<Container fixed="sm">Container</Container>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with gutter prop", () => {
		const { container } = render(
			<Container gutter="scale-10">Container</Container>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			Container: {
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
				<Container variant="custom">Container</Container>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<Container variant="custom" themeExtend={themeTest}>
					Container
				</Container>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(<Container>Container</Container>, {
				theme: {
					Container: {
						defaultProps: {
							id: "id",
							className: "hello",
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should disable classes", () => {
			const { container } = render(<Container>Container</Container>, {
				theme: {
					Container: {
						overrideClasses: {
							root: true,
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override classes", () => {
			const { container } = render(<Container>Container</Container>, {
				theme: {
					Container: {
						overrideClasses: {
							root: "morning",
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(<Container>Container</Container>, {
				theme: {
					Container: {
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

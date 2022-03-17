import React from "react";
import { render } from "../utils/test";
import Radio from "./";
import { ThemeConfig } from "../theme";

describe("<Radio />", () => {
	it("should render Radio correctly", () => {
		const { container } = render(<Radio label="Hello world" />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<Radio label="Hello world" ref={ref} />);

		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<Radio label="Hello world" id="id" mt="20px" />
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			Radio: {
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
			const { container } = render(<Radio variant="custom" label="hello" />, {
				theme: themeTest,
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<Radio label="Hello" variant="custom" themeExtend={themeTest} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(<Radio label="Hello" />, {
				theme: {
					Radio: {
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
			const { container } = render(<Radio label="Hello" />, {
				theme: {
					Radio: {
						overrideClasses: {
							root: true,
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override classes", () => {
			const { container } = render(<Radio label="Hello" />, {
				theme: {
					Radio: {
						overrideClasses: {
							root: "morning",
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(<Radio label="Hello" />, {
				theme: {
					Radio: {
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

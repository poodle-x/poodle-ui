import React from "react";
import { render } from "../utils/test";
import InputAdornment from "./";
import { ThemeConfig } from "../theme";

describe("<InputAdornment />", () => {
	it("should render InputAdornment correctly", () => {
		const { container } = render(
			<InputAdornment>InputAdornment</InputAdornment>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render InputAdornment position end correctly", () => {
		const { container } = render(
			<InputAdornment adornmentPosition="end">InputAdornment</InputAdornment>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<InputAdornment ref={ref}>InputAdornment</InputAdornment>);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<InputAdornment id="id" mt="20px">
				InputAdornment
			</InputAdornment>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			InputAdornment: {
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
				<InputAdornment variant="custom">InputAdornment</InputAdornment>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<InputAdornment variant="custom" themeExtend={themeTest}>
					InputAdornment
				</InputAdornment>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(
				<InputAdornment>InputAdornment</InputAdornment>,
				{
					theme: {
						InputAdornment: {
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
				<InputAdornment>InputAdornment</InputAdornment>,
				{
					theme: {
						InputAdornment: {
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
				<InputAdornment>InputAdornment</InputAdornment>,
				{
					theme: {
						InputAdornment: {
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
				<InputAdornment>InputAdornment</InputAdornment>,
				{
					theme: {
						InputAdornment: {
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

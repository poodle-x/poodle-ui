import React from "react";
import { ThemeConfig } from "../theme";
import { render } from "../utils/test";
import Input from "./";

describe("<Input />", () => {
	it("should render Input correctly", () => {
		const { container } = render(
			<Input
				id="id"
				inputProps={{
					"aria-label": "Simple label",
				}}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render error Input correctly", () => {
		const { container } = render(
			<Input
				error={true}
				id="id"
				inputProps={{
					"aria-label": "Simple label",
				}}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render Input textarea correctly", () => {
		const { container } = render(
			<Input
				multiline={true}
				inputProps={{
					rows: 3,
					"aria-label": "Simple label",
				}}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render Input with adornment correctly", () => {
		const { container } = render(
			<Input
				inputProps={{
					"aria-label": "Simple label",
				}}
				startAdornment="$"
				endAdornment="kg"
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();
		const refInput = React.createRef<HTMLDivElement>();

		render(
			<Input
				ref={ref}
				inputProps={{
					ref: refInput,
				}}
			/>
		);
		expect(ref.current).toMatchSnapshot();
		expect(refInput.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<Input
				id="id"
				mt="20px"
				inputProps={{
					px: 10,
				}}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			Input: {
				styles: {
					root: {
						mt: 10,
						letterSpacing: 250,
					},
					input: {
						fontSize: 50,
					},
				},
				variants: {
					custom: {
						root: {
							top: 0,
							textIndent: 1,
						},
						input: {
							left: 100,
						},
					},
				},
			},
		};

		it("should extend styles in global", () => {
			const { container } = render(<Input variant="custom" />, {
				theme: themeTest,
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<Input variant="custom" themeExtend={themeTest} />
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(<Input />, {
				theme: {
					Input: {
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
			const { container } = render(<Input />, {
				theme: {
					Input: {
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

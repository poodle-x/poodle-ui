import React from "react";
import { render } from "../utils/test";
import Select from "./";
import { ThemeConfig } from "../theme";
import { InputAdornment } from "../InputAdornment";

describe("<Select />", () => {
	it("should render Select correctly", () => {
		const { container } = render(
			<Select>
				<option value="tiger">Tiger</option>
				<option value="lion">Lion</option>
				<option value="dog">Dog</option>
			</Select>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render Select with error correctly", () => {
		const { container } = render(
			<Select error={true}>
				<option value="tiger">Tiger</option>
				<option value="lion">Lion</option>
				<option value="dog">Dog</option>
			</Select>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render Select with adornment correctly", () => {
		const { container } = render(
			<Select
				error={true}
				startAdornment={<InputAdornment>$</InputAdornment>}
				endAdornment={
					<InputAdornment
						adornmentPosition="end"
						isIcon={true}
						color="negative.base"
					>
						end
					</InputAdornment>
				}
			>
				<option value="tiger">Tiger</option>
				<option value="lion">Lion</option>
				<option value="dog">Dog</option>
			</Select>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(
			<Select ref={ref}>
				<option value="tiger">Tiger</option>
				<option value="lion">Lion</option>
				<option value="dog">Dog</option>
			</Select>
		);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<Select
				id="id"
				mt="20px"
				selectProps={{
					"aria-label": "name",
				}}
			>
				<option value="tiger">Tiger</option>
				<option value="lion">Lion</option>
				<option value="dog">Dog</option>
			</Select>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			Select: {
				styles: {
					root: {
						mt: 10,
						letterSpacing: 250,
					},
					icon: {
						mt: 11,
						letterSpacing: 251,
					},
					divider: {
						mt: 12,
						letterSpacing: 252,
					},
					native: {
						mt: 13,
						letterSpacing: 251,
					},
				},
				variants: {
					custom: {
						root: {
							top: 0,
							textIndent: 1,
						},
						icon: {
							top: 1,
							textIndent: 2,
						},
						native: {
							top: 2,
							textIndent: 3,
						},
						divider: {
							top: 3,
							textIndent: 4,
						},
					},
				},
			},
		};

		it("should extend styles in global", () => {
			const { container } = render(
				<Select variant="custom">
					<option value="tiger">Tiger</option>
					<option value="lion">Lion</option>
					<option value="dog">Dog</option>
				</Select>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<Select variant="custom" themeExtend={themeTest}>
					<option value="tiger">Tiger</option>
					<option value="lion">Lion</option>
					<option value="dog">Dog</option>
				</Select>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(
				<Select>
					<option value="tiger">Tiger</option>
					<option value="lion">Lion</option>
					<option value="dog">Dog</option>
				</Select>,
				{
					theme: {
						Select: {
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
				<Select>
					<option value="tiger">Tiger</option>
					<option value="lion">Lion</option>
					<option value="dog">Dog</option>
				</Select>,
				{
					theme: {
						Select: {
							overrideClasses: {
								root: true,
								divider: true,
								native: true,
								icon: true,
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override classes", () => {
			const { container } = render(
				<Select>
					<option value="tiger">Tiger</option>
					<option value="lion">Lion</option>
					<option value="dog">Dog</option>
				</Select>,
				{
					theme: {
						Select: {
							overrideClasses: {
								root: "morning",
								divider: "divider",
								icon: "icon",
								native: "native",
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(
				<Select>
					<option value="tiger">Tiger</option>
					<option value="lion">Lion</option>
					<option value="dog">Dog</option>
				</Select>,
				{
					theme: {
						Select: {
							overrides: {
								root: {
									mt: 51,
								},
								divider: {
									mt: 52,
								},
								icon: {
									mt: 53,
								},
								native: {
									mt: 54,
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

import React from "react";
import { render } from "../utils/test";
import {{NameCamel}} from "./";
import { ThemeConfig } from "../theme";

describe("<{{NameCamel}} />", () => {
	it("should render {{NameCamel}} correctly", () => {
		const { container } = render(<{{NameCamel}}>{{NameCamel}}</{{NameCamel}}>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<{{NameCamel}} ref={ref}>{{NameCamel}}</{{NameCamel}}>);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<{{NameCamel}} id="id" mt="20px">
				{{NameCamel}}
			</{{NameCamel}}>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			{{NameCamel}}: {
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
				<{{NameCamel}} variant="custom">{{NameCamel}}</{{NameCamel}}>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<{{NameCamel}} variant="custom" themeExtend={themeTest}>
					{{NameCamel}}
				</{{NameCamel}}>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(<{{NameCamel}}>{{NameCamel}}</{{NameCamel}}>, {
				theme: {
					{{NameCamel}}: {
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
			const { container } = render(<{{NameCamel}}>{{NameCamel}}</{{NameCamel}}>, {
				theme: {
					{{NameCamel}}: {
						overrideClasses: {
							root: true,
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override classes", () => {
			const { container } = render(<{{NameCamel}}>{{NameCamel}}</{{NameCamel}}>, {
				theme: {
					{{NameCamel}}: {
						overrideClasses: {
							root: "morning",
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(<{{NameCamel}}>{{NameCamel}}</{{NameCamel}}>, {
				theme: {
					{{NameCamel}}: {
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

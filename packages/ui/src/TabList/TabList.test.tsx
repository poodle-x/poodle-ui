import React from "react";
import { render } from "../utils/test";
import TabList from "./";
import { ThemeConfig } from "../theme";

describe("<TabList />", () => {
	it("should render TabList correctly", () => {
		const { container } = render(<TabList>TabList</TabList>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<TabList ref={ref}>TabList</TabList>);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<TabList id="id" mt="20px">
				TabList
			</TabList>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			TabList: {
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
				<TabList variant="custom">TabList</TabList>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<TabList variant="custom" themeExtend={themeTest}>
					TabList
				</TabList>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(<TabList>TabList</TabList>, {
				theme: {
					TabList: {
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
			const { container } = render(<TabList>TabList</TabList>, {
				theme: {
					TabList: {
						overrideClasses: {
							root: true,
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override classes", () => {
			const { container } = render(<TabList>TabList</TabList>, {
				theme: {
					TabList: {
						overrideClasses: {
							root: "morning",
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(<TabList>TabList</TabList>, {
				theme: {
					TabList: {
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

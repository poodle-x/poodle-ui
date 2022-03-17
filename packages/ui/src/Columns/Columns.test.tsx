import React from "react";
import { render } from "../utils/test";
import Columns, { ColumnsContext } from "./";
import { ThemeConfig } from "../theme";

describe("<Columns />", function () {
	it("should render columns correctly", () => {
		const { container } = render(<Columns>Hello</Columns>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<Columns ref={ref}>Columns</Columns>);

		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<Columns aria-disabled="true" id="columns" as="section" p={10}>
				Columns
			</Columns>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with wrap", () => {
		const { container } = render(
			<Columns wrapMode={true} gutter="50px">
				Columns
			</Columns>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with custom gutter correctly", () => {
		const { container } = render(
			<Columns wrapGutter="30px" gutter="50px">
				Columns
			</Columns>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with array responsive gutter correctly", () => {
		const { container } = render(
			<Columns
				wrapGutter={["scale-4", 25, 35, 45]}
				gutter={["scale-4", 20, 30, 40]}
			>
				Columns
			</Columns>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with object responsive gutter correctly", () => {
		const { container } = render(
			<Columns
				wrapGutter={{
					sm: 15,
					md: 25,
					lg: 35,
					xl: 45,
				}}
				gutter={{
					_: 5,
					sm: 10,
					md: 20,
					lg: 30,
					xl: 40,
				}}
			>
				Columns
			</Columns>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with custom collapse correctly", () => {
		const { container } = render(<Columns collapse="md">Columns</Columns>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with custom collapse and gutter correctly", () => {
		const { container } = render(
			<Columns gutter="20px" collapse="md">
				Columns
			</Columns>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with custom collapse and responsive gutter correctly", () => {
		const { container } = render(
			<Columns
				gutter={{
					_: 5,
					sm: 10,
					md: 20,
					lg: 30,
					xl: 40,
				}}
				collapse="md"
			>
				Columns
			</Columns>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should send context to children correctly", () => {
		const TestComp = function () {
			const context = React.useContext(ColumnsContext);

			return (
				<div data-testid="test">
					{JSON.stringify(context.gutter)}|{JSON.stringify(context.wrapGutter)}|
					{JSON.stringify(context.collapse)}|{JSON.stringify(context.wrapMode)}
				</div>
			);
		};

		const gutter = {
			xs: 10,
			sm: 20,
			md: 30,
			lg: 40,
		};

		const wrapGutter = {
			xs: 15,
			sm: 25,
			md: 35,
			lg: 45,
		};

		const { getByTestId } = render(
			<Columns
				gutter={gutter}
				wrapGutter={wrapGutter}
				wrapMode={true}
				collapse="md"
			>
				<TestComp />
			</Columns>
		);

		expect(getByTestId("test").innerHTML).toEqual(
			`${JSON.stringify(gutter)}|${JSON.stringify(wrapGutter)}|"md"|true`
		);
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			Columns: {
				styles: {
					root: {
						mt: 10,
						top: 0,
						textIndent: 1,
					},
				},
				variants: {
					custom: {
						root: {
							letterSpacing: 200,
						},
					},
				},
			},
		};

		it("should extend styles in global", () => {
			const { container } = render(
				<Columns variant="custom">Columns</Columns>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<Columns variant="custom" themeExtend={themeTest}>
					Columns
				</Columns>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(<Columns>Columns</Columns>, {
				theme: {
					Columns: {
						defaultProps: {
							gutter: 50,
							id: "id",
							className: "hello",
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should disable classes", () => {
			const { container } = render(<Columns>Columns</Columns>, {
				theme: {
					Columns: {
						overrideClasses: {
							root: true,
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override classes", () => {
			const { container } = render(<Columns>Columns</Columns>, {
				theme: {
					Columns: {
						overrideClasses: {
							root: "morning",
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(<Columns>Columns</Columns>, {
				theme: {
					Columns: {
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

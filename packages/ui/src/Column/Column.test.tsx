import { render } from "../utils/test";
import Column from "./";
import React from "react";
import { ColumnsContext } from "../Columns";
import { ThemeConfig } from "../theme";

describe("<Column />", () => {
	it("should render column correctly", () => {
		const { container } = render(
			<ColumnsContext.Provider
				value={{
					gutter: "8px",
				}}
			>
				<Column>Column</Column>
			</ColumnsContext.Provider>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(
			<ColumnsContext.Provider
				value={{
					gutter: "8px",
				}}
			>
				<Column ref={ref}>Column</Column>
			</ColumnsContext.Provider>
		);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<ColumnsContext.Provider
				value={{
					wrapGutter: "10px",
					gutter: "8px",
				}}
			>
				<Column id="100" mt="10px" aria-disabled="true" as="section">
					Column
				</Column>
			</ColumnsContext.Provider>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with array responsive gutter correctly", () => {
		const { container } = render(
			<ColumnsContext.Provider
				value={{
					wrapGutter: ["15px", "25px", "35px", "40px"],
					gutter: ["5px", "10px", "15px", "20px"],
				}}
			>
				<Column>Column</Column>
			</ColumnsContext.Provider>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with gutter and collapse correctly", () => {
		const { container } = render(
			<ColumnsContext.Provider
				value={{
					gutter: "scale-2",
					collapse: "md",
				}}
			>
				<Column>Column</Column>
			</ColumnsContext.Provider>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with array responsive gutter and collapse correctly", () => {
		const { container } = render(
			<ColumnsContext.Provider
				value={{
					gutter: ["5px", "10px", "15px", "20px", "25px"],
					collapse: "md",
				}}
			>
				<Column>Column</Column>
			</ColumnsContext.Provider>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with object responsive gutter correctly", () => {
		const { container } = render(
			<ColumnsContext.Provider
				value={{
					wrapGutter: {
						_: 15,
						sm: 25,
						md: 35,
						lg: 45,
						xl: 55,
					},
					gutter: {
						_: 5,
						sm: 10,
						md: 20,
						lg: 30,
						xl: 40,
					},
				}}
			>
				<Column>Column</Column>
			</ColumnsContext.Provider>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with object responsive gutter and collapse correctly", () => {
		const { container } = render(
			<ColumnsContext.Provider
				value={{
					collapse: "md",
					gutter: {
						_: 5,
						sm: 10,
						md: 20,
						lg: 30,
						xl: 40,
					},
				}}
			>
				<Column>Column</Column>
			</ColumnsContext.Provider>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render col width correctly", () => {
		const { container } = render(
			<ColumnsContext.Provider
				value={{
					collapse: "md",
					gutter: "10px",
				}}
			>
				<Column colWidth="50%">Column</Column>
			</ColumnsContext.Provider>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			Column: {
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
			const { container } = render(<Column variant="custom">Column</Column>, {
				theme: themeTest,
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<Column variant="custom" themeExtend={themeTest}>
					Column
				</Column>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(<Column>Column</Column>, {
				theme: {
					Column: {
						defaultProps: {
							colWidth: "50%",
							id: "id",
							className: "hello",
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should disable classes", () => {
			const { container } = render(<Column>Column</Column>, {
				theme: {
					Column: {
						overrideClasses: {
							root: true,
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override classes", () => {
			const { container } = render(<Column>Column</Column>, {
				theme: {
					Column: {
						overrideClasses: {
							root: "morning",
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(<Column>Column</Column>, {
				theme: {
					Column: {
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

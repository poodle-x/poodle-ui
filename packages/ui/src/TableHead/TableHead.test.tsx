import React from "react";
import { Table, TableLevelContext } from "../Table";
import { ThemeConfig } from "../theme";
import { render } from "../utils/test";
import TableHead from "./";

describe("<TableHead />", () => {
	it("should render TableHead correctly", () => {
		const { container } = render(
			<table>
				<TableHead>
					<tr>
						<td>Table</td>
					</tr>
				</TableHead>
			</table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(
			<table>
				<TableHead ref={ref}>
					<tr>
						<td>Table</td>
					</tr>
				</TableHead>
			</table>
		);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<table>
				<TableHead id="id" mt="20px">
					<tr>
						<td>Table</td>
					</tr>
				</TableHead>
			</table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should send context correctly", () => {
		const { container } = render(
			<table>
				<TableHead>
					<tr>
						<td>
							<TableLevelContext.Consumer>
								{(value) => JSON.stringify(value)}
							</TableLevelContext.Consumer>
						</td>
					</tr>
				</TableHead>
			</table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			TableHead: {
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
				<table>
					<TableHead variant="custom">
						<tr>
							<td>Table</td>
						</tr>
					</TableHead>
				</table>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<table>
					<TableHead variant="custom" themeExtend={themeTest}>
						<tr>
							<td>Table</td>
						</tr>
					</TableHead>
				</table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(
				<table>
					<TableHead>
						<tr>
							<td>Table</td>
						</tr>
					</TableHead>
				</table>,
				{
					theme: {
						TableHead: {
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
				<table>
					<TableHead>
						<tr>
							<td>Table</td>
						</tr>
					</TableHead>
				</table>,
				{
					theme: {
						TableHead: {
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
				<table>
					<TableHead>
						<tr>
							<td>Table</td>
						</tr>
					</TableHead>
				</table>,
				{
					theme: {
						TableHead: {
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
				<table>
					<TableHead>
						<tr>
							<td>Table</td>
						</tr>
					</TableHead>
				</table>,
				{
					theme: {
						TableHead: {
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

		it("should extend size styles", () => {
			const { container } = render(
				<Table sizeStyle="test">
					<TableHead>
						<tr>
							<td>Table</td>
						</tr>
					</TableHead>
				</Table>,
				{
					theme: {
						TableHead: {
							sizes: {
								test: {
									root: {
										height: "100px",
									},
								},
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend size styles with mode", () => {
			const { container } = render(
				<Table sizeStyle="test">
					<TableHead>
						<tr>
							<td>Table</td>
						</tr>
					</TableHead>
				</Table>,
				{
					theme: {
						mode: "test",
						TableHead: {
							sizes: {
								test: {
									root: {
										height: "100px",
									},
								},
							},
							modes: {
								test: {
									sizes: {
										test: {
											root: {
												height: "110px",
											},
										},
									},
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

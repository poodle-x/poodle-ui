import React from "react";
import { render } from "../utils/test";
import Table, { TableContext } from "./";
import { ThemeConfig } from "../theme";

describe("<Table />", () => {
	it("should render Table correctly", () => {
		const { container } = render(
			<Table>
				<tbody>
					<tr>
						<td>Table</td>
					</tr>
				</tbody>
			</Table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLTableElement>();

		render(
			<Table ref={ref}>
				<tbody>
					<tr>
						<td>Table</td>
					</tr>
				</tbody>
			</Table>
		);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<Table
				id="id"
				mt="20px"
				tableProps={{
					p: 50,
				}}
			>
				<tbody>
					<tr>
						<td>Table</td>
					</tr>
				</tbody>
			</Table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render table with withBorder, withDivider, withHover prop", () => {
		const { container } = render(
			<Table withDivider={true} withBorder={true} withHover={true}>
				<tbody>
					<tr>
						<td>Table</td>
					</tr>
				</tbody>
			</Table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should send context with withBorder, withDivider, withHover prop", () => {
		const Func = () => {
			return (
				<TableContext.Consumer>
					{(value) => <div>{JSON.stringify(value)}</div>}
				</TableContext.Consumer>
			);
		};

		const { container } = render(
			<Table withDivider={true} withBorder={true} withHover={true}>
				<tbody>
					<tr>
						<td>
							<Func />
						</td>
					</tr>
				</tbody>
			</Table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			Table: {
				styles: {
					root: {
						mt: 10,
						letterSpacing: 250,
					},
					table: {
						p: 10,
						letterSpacing: 350,
					},
				},
				variants: {
					custom: {
						root: {
							top: 0,
							textIndent: 1,
						},
						table: {
							top: 1,
							textIndent: 2,
						},
					},
				},
			},
		};

		it("should extend styles in global", () => {
			const { container } = render(
				<Table variant="custom">
					<tbody>
						<tr>
							<td>Table</td>
						</tr>
					</tbody>
				</Table>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<Table variant="custom" themeExtend={themeTest}>
					<tbody>
						<tr>
							<td>Table</td>
						</tr>
					</tbody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(
				<Table>
					<tbody>
						<tr>
							<td>Table</td>
						</tr>
					</tbody>
				</Table>,
				{
					theme: {
						Table: {
							defaultProps: {
								id: "id",
								className: "hello",
								tableProps: {
									"aria-disabled": "true",
								},
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should disable classes", () => {
			const { container } = render(
				<Table>
					<tbody>
						<tr>
							<td>Table</td>
						</tr>
					</tbody>
				</Table>,
				{
					theme: {
						Table: {
							overrideClasses: {
								root: true,
								table: true,
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override classes", () => {
			const { container } = render(
				<Table>
					<tbody>
						<tr>
							<td>Table</td>
						</tr>
					</tbody>
				</Table>,
				{
					theme: {
						Table: {
							overrideClasses: {
								root: "morning",
								table: "yeah",
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(
				<Table>
					<tbody>
						<tr>
							<td>Table</td>
						</tr>
					</tbody>
				</Table>,
				{
					theme: {
						Table: {
							overrides: {
								root: {
									mt: 50,
								},
								table: {
									p: 20,
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
					<tbody>
						<tr>
							<td>Table</td>
						</tr>
					</tbody>
				</Table>,
				{
					theme: {
						Table: {
							sizes: {
								test: {
									root: {
										height: "100px",
									},
									table: {
										height: "200px",
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
					<tbody>
						<tr>
							<td>Table</td>
						</tr>
					</tbody>
				</Table>,
				{
					theme: {
						mode: "test",
						Table: {
							sizes: {
								test: {
									root: {
										height: "100px",
									},
									table: {
										height: "200px",
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
											table: {
												height: "210px",
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

import React from "react";
import { render } from "../utils/test";
import TableCell from "./";
import { ThemeConfig } from "../theme";
import { Table, TableContext, TableLevelContext } from "../Table";

describe("<TableCell />", () => {
	it("should render TableCell correctly", () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<TableCell>TableCell</TableCell>
					</tr>
				</tbody>
			</table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(
			<table>
				<tbody>
					<tr>
						<TableCell ref={ref}>TableCell</TableCell>
					</tr>
				</tbody>
			</table>
		);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<table>
				<tbody>
					<tr>
						<TableCell id="id" mt="20px">
							TableCell
						</TableCell>
					</tr>
				</tbody>
			</table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with level head correctly", () => {
		const { container } = render(
			<table>
				<TableLevelContext.Provider
					value={{
						level: "head",
					}}
				>
					<thead>
						<tr>
							<TableCell>TableCell</TableCell>
						</tr>
					</thead>
				</TableLevelContext.Provider>
			</table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render with divider context correctly", () => {
		const { container } = render(
			<table>
				<TableContext.Provider
					value={{
						withDivider: true,
					}}
				>
					<tbody>
						<tr>
							<TableCell>TableCell</TableCell>
						</tr>
					</tbody>
				</TableContext.Provider>
			</table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("size", () => {
		it("should render with size s correctly", () => {
			const { container } = render(
				<Table sizeStyle="s">
					<tbody>
						<tr>
							<TableCell>TableCell</TableCell>
						</tr>
					</tbody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with size m correctly", () => {
			const { container } = render(
				<Table>
					<tbody>
						<tr>
							<TableCell>TableCell</TableCell>
						</tr>
					</tbody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with size l correctly", () => {
			const { container } = render(
				<Table sizeStyle="l">
					<tbody>
						<tr>
							<TableCell>TableCell</TableCell>
						</tr>
					</tbody>
				</Table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			TableCell: {
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
					<tbody>
						<tr>
							<TableCell variant="custom">TableCell</TableCell>
						</tr>
					</tbody>
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
					<tbody>
						<tr>
							<TableCell variant="custom" themeExtend={themeTest}>
								TableCell
							</TableCell>
						</tr>
					</tbody>
				</table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(
				<table>
					<tbody>
						<tr>
							<TableCell>TableCell</TableCell>
						</tr>
					</tbody>
				</table>,
				{
					theme: {
						TableCell: {
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
					<tbody>
						<tr>
							<TableCell>TableCell</TableCell>
						</tr>
					</tbody>
				</table>,
				{
					theme: {
						TableCell: {
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
					<tbody>
						<tr>
							<TableCell>TableCell</TableCell>
						</tr>
					</tbody>
				</table>,
				{
					theme: {
						TableCell: {
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
					<tbody>
						<tr>
							<TableCell>TableCell</TableCell>
						</tr>
					</tbody>
				</table>,
				{
					theme: {
						TableCell: {
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
					<tbody>
						<tr>
							<TableCell>TableCell</TableCell>
						</tr>
					</tbody>
				</Table>,
				{
					theme: {
						TableCell: {
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
					<tbody>
						<tr>
							<TableCell>TableCell</TableCell>
						</tr>
					</tbody>
				</Table>,
				{
					theme: {
						mode: "test",
						TableCell: {
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

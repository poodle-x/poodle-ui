import React from "react";
import { Table, TableLevelContext } from "../Table";
import { ThemeConfig } from "../theme";
import { render } from "../utils/test";
import TableBody from "./";

describe("<TableBody />", () => {
	it("should render TableBody correctly", () => {
		const { container } = render(
			<table>
				<TableBody>
					<tr>
						<td>Table</td>
					</tr>
				</TableBody>
			</table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(
			<table>
				<TableBody ref={ref}>
					<tr>
						<td>Table</td>
					</tr>
				</TableBody>
			</table>
		);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<table>
				<TableBody id="id" mt="20px">
					<tr>
						<td>Table</td>
					</tr>
				</TableBody>
			</table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should send context correctly", () => {
		const { container } = render(
			<table>
				<TableBody>
					<tr>
						<td>
							<TableLevelContext.Consumer>
								{(value) => JSON.stringify(value)}
							</TableLevelContext.Consumer>
						</td>
					</tr>
				</TableBody>
			</table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			TableBody: {
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
					<TableBody variant="custom">
						<tr>
							<td>Table</td>
						</tr>
					</TableBody>
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
					<TableBody variant="custom" themeExtend={themeTest}>
						<tr>
							<td>Table</td>
						</tr>
					</TableBody>
				</table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(
				<table>
					<TableBody>
						<tr>
							<td>Table</td>
						</tr>
					</TableBody>
				</table>,
				{
					theme: {
						TableBody: {
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

		it("should override styles", () => {
			const { container } = render(
				<table>
					<TableBody>
						<tr>
							<td>Table</td>
						</tr>
					</TableBody>
				</table>,
				{
					theme: {
						TableBody: {
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
					<TableBody>
						<tr>
							<td>Table</td>
						</tr>
					</TableBody>
				</Table>,
				{
					theme: {
						TableBody: {
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
					<TableBody>
						<tr>
							<td>Table</td>
						</tr>
					</TableBody>
				</Table>,
				{
					theme: {
						mode: "test",
						TableBody: {
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

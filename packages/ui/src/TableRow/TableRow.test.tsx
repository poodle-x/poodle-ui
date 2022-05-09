import React from "react";
import { Table } from "../Table";
import { ThemeConfig } from "../theme";
import { render } from "../utils/test";
import TableRow from "./";

describe("<TableRow />", () => {
	it("should render TableRow correctly", () => {
		const { container } = render(
			<table>
				<tbody>
					<TableRow>
						<td>TableRow</td>
					</TableRow>
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
					<TableRow ref={ref}>
						<td>TableRow</td>
					</TableRow>
				</tbody>
			</table>
		);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<table>
				<tbody>
					<TableRow id="id" mt="20px">
						<td>TableRow</td>
					</TableRow>
				</tbody>
			</table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render props isSelected correctly", () => {
		const { container } = render(
			<table>
				<tbody>
					<TableRow isSelected={true}>
						<td>TableRow</td>
					</TableRow>
				</tbody>
			</table>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			TableRow: {
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
						<TableRow variant="custom">
							<td>TableRow</td>
						</TableRow>
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
						<TableRow variant="custom" themeExtend={themeTest}>
							<td>TableRow</td>
						</TableRow>
					</tbody>
				</table>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(
				<table>
					<tbody>
						<TableRow>
							<td>TableRow</td>
						</TableRow>
					</tbody>
				</table>,
				{
					theme: {
						TableRow: {
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
					<tbody>
						<TableRow>
							<td>TableRow</td>
						</TableRow>
					</tbody>
				</table>,
				{
					theme: {
						TableRow: {
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
						<TableRow>
							<td>TableRow</td>
						</TableRow>
					</tbody>
				</Table>,
				{
					theme: {
						TableRow: {
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
						<TableRow>
							<td>TableRow</td>
						</TableRow>
					</tbody>
				</Table>,
				{
					theme: {
						mode: "test",
						TableRow: {
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

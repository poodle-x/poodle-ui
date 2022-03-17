import React from "react";
import { render } from "../utils/test";
import TabPanel from "./";
import { ThemeConfig } from "../theme";
import { Tabs } from "../Tabs";

describe("<TabPanel />", () => {
	it("should render TabPanel correctly", async () => {
		const { findByRole, rerender } = render(
			<Tabs>
				<TabPanel value="text">TabPanel</TabPanel>
			</Tabs>
		);
		expect(await findByRole("tabpanel", { hidden: true })).toMatchSnapshot();

		rerender(
			<Tabs value="text">
				<TabPanel value="text">TabPanel</TabPanel>
			</Tabs>
		);

		expect(await findByRole("tabpanel")).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(
			<Tabs>
				<TabPanel ref={ref} value="text">
					TabPanel
				</TabPanel>
			</Tabs>
		);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<Tabs>
				<TabPanel value="text" id="id" mt="20px">
					TabPanel
				</TabPanel>
			</Tabs>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			TabPanel: {
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
				<Tabs>
					<TabPanel value="text" variant="custom">
						TabPanel
					</TabPanel>
				</Tabs>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<Tabs>
					<TabPanel value="text" variant="custom" themeExtend={themeTest}>
						TabPanel
					</TabPanel>
				</Tabs>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(
				<Tabs>
					<TabPanel value="text">TabPanel</TabPanel>
				</Tabs>,
				{
					theme: {
						TabPanel: {
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
				<Tabs>
					<TabPanel value="text">TabPanel</TabPanel>
				</Tabs>,
				{
					theme: {
						TabPanel: {
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
				<Tabs>
					<TabPanel value="text">TabPanel</TabPanel>
				</Tabs>,
				{
					theme: {
						TabPanel: {
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
				<Tabs>
					<TabPanel value="text">TabPanel</TabPanel>
				</Tabs>,
				{
					theme: {
						TabPanel: {
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
	});
});

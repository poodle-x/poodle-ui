import React from "react";
import { TabOrientation } from "../hooks/useTabsState";
import { Tabs } from "../Tabs";
import { ThemeConfig } from "../theme";
import { render, userEvent } from "../utils/test";
import Tab from "./";

describe("<Tab />", () => {
	it("should render Tab correctly", async () => {
		const { findByRole, rerender } = render(
			<Tabs>
				<Tab value="text">Tab</Tab>
			</Tabs>
		);
		expect(await findByRole("tab")).toMatchSnapshot();

		rerender(
			<Tabs orientation={TabOrientation.VERTICAL}>
				<Tab value="text">Tab</Tab>
			</Tabs>
		);

		expect(await findByRole("tab")).toMatchSnapshot();
	});

	it("should render Tab selected correctly", async () => {
		const { findAllByRole } = render(
			<Tabs value="text2">
				<Tab value="text">Tab</Tab>
				<Tab value="text2">Tab2</Tab>
			</Tabs>
		);
		expect(await findAllByRole("tab")).toMatchSnapshot();
	});

	it("should preserve onClick", async () => {
		const mock = jest.fn();
		const { getByTestId } = render(
			<Tabs>
				<Tab data-testid="test" onClick={mock} value="text">
					Tab
				</Tab>
				<Tab value="text2">Tab2</Tab>
			</Tabs>
		);

		const tab = getByTestId("test");

		userEvent.click(tab);

		expect(mock).toHaveBeenCalled();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(
			<Tabs>
				<Tab ref={ref} value="text">
					Tab
				</Tab>
			</Tabs>
		);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", async () => {
		const { findByRole } = render(
			<Tabs>
				<Tab id="id" mt="20px" value="text">
					Tab
				</Tab>
			</Tabs>
		);
		expect(await findByRole("tab")).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			Tab: {
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

		it("should extend styles in global", async () => {
			const { findByRole } = render(
				<Tabs variant="1">
					<Tab variant="custom" value="text">
						Tab
					</Tab>
				</Tabs>,
				{
					theme: themeTest,
				}
			);
			expect(await findByRole("tab")).toMatchSnapshot();
		});

		it("should extend styles in local", async () => {
			const { findByRole } = render(
				<Tabs>
					<Tab themeExtend={themeTest} value="text">
						Tab
					</Tab>
				</Tabs>
			);
			expect(await findByRole("tab")).toMatchSnapshot();
		});

		it("should render with default props correctly", async () => {
			const { findByRole } = render(
				<Tabs>
					<Tab value="text">Tab</Tab>
				</Tabs>,
				{
					theme: {
						Tab: {
							defaultProps: {
								id: "id",
								className: "hello",
							},
						},
					},
				}
			);
			expect(await findByRole("tab")).toMatchSnapshot();
		});

		it("should override styles", async () => {
			const { findByRole } = render(
				<Tabs>
					<Tab value="text">Tab</Tab>
				</Tabs>,
				{
					theme: {
						Tab: {
							overrides: {
								root: {
									mt: 50,
								},
							},
						},
					},
				}
			);
			expect(await findByRole("tab")).toMatchSnapshot();
		});
	});
});

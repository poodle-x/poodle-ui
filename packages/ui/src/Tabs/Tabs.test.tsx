import { axe } from "jest-axe";
import React from "react";
import { TabOrientation } from "../hooks/useTabsState";
import { Tab } from "../Tab";
import { TabList } from "../TabList";
import { TabPanel } from "../TabPanel";
import { ThemeConfig } from "../theme";
import { fireEvent, render } from "../utils/test";
import Tabs from "./";

describe("<Tabs />", () => {
	it("should render Tabs correctly", () => {
		const { container } = render(<Tabs>Tabs</Tabs>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<Tabs ref={ref}>Tabs</Tabs>);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<Tabs id="id" mt="20px">
				Tabs
			</Tabs>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	function checkTabActive(tab: HTMLElement) {
		expect(tab.getAttribute("aria-selected")).toEqual("true");
		expect(tab.getAttribute("tabindex")).toEqual("0");
	}

	function checkTabInActive(tab: HTMLElement) {
		expect(tab.getAttribute("aria-selected")).toEqual("false");
		expect(tab.getAttribute("tabindex")).toEqual("-1");
	}

	function checkTabPanelActive(tab: HTMLElement) {
		expect(tab.getAttribute("hidden")).toEqual(null);
	}

	function checkTabPanelInActive(tab: HTMLElement) {
		expect(tab.getAttribute("hidden")).toEqual("");
	}

	function checkTabs(
		tabs: HTMLElement[],
		tabPanels: HTMLElement[],
		active: number,
		inactive: number[]
	) {
		checkTabActive(tabs[active]);
		checkTabPanelActive(tabPanels[active]);

		inactive.forEach((i) => {
			checkTabInActive(tabs[i]);
			checkTabPanelInActive(tabPanels[i]);
		});
	}

	const renderKey = (ori: TabOrientation) => {
		return (
			<Tabs orientation={ori}>
				<TabList aria-label="Settings">
					<Tab value={0}>First</Tab>
					<Tab value={1}>Second</Tab>
					<Tab value={2}>Third</Tab>
				</TabList>
				<TabPanel value={0}>First</TabPanel>
				<TabPanel value={1}>Second</TabPanel>
				<TabPanel value={2}>Third</TabPanel>
			</Tabs>
		);
	};

	it("should pass axe", async () => {
		const { container } = render(renderKey(TabOrientation.HORIZONTAL));
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it("should change active tab uncontrolled", () => {
		const { getAllByRole } = render(renderKey(TabOrientation.HORIZONTAL));

		const tabs = getAllByRole("tab");

		const tabPanels = getAllByRole("tabpanel", {
			hidden: true,
		});

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		fireEvent.click(tabs[1]);

		checkTabs(tabs, tabPanels, 1, [0, 2]);

		fireEvent.click(tabs[2]);

		checkTabs(tabs, tabPanels, 2, [0, 1]);
	});

	it("should change active tab horizontal with keyboard arrow", () => {
		const { getAllByRole, getByRole } = render(
			renderKey(TabOrientation.HORIZONTAL)
		);

		const tabList = getByRole("tablist");

		const tabs = getAllByRole("tab");

		const tabPanels = getAllByRole("tabpanel", {
			hidden: true,
		});

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		fireEvent.keyDown(tabList, { key: "ArrowRight", code: "ArrowRight" });

		checkTabs(tabs, tabPanels, 1, [0, 2]);

		fireEvent.keyDown(tabList, { key: "ArrowRight", code: "ArrowRight" });

		checkTabs(tabs, tabPanels, 2, [0, 1]);

		fireEvent.keyDown(tabList, { key: "ArrowRight", code: "ArrowRight" });

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		fireEvent.keyDown(tabList, { key: "ArrowLeft", code: "ArrowLeft" });

		checkTabs(tabs, tabPanels, 2, [0, 1]);

		fireEvent.keyDown(tabList, { key: "ArrowLeft", code: "ArrowLeft" });

		checkTabs(tabs, tabPanels, 1, [0, 2]);

		fireEvent.keyDown(tabList, { key: "ArrowLeft", code: "ArrowLeft" });

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		fireEvent.keyDown(tabList, { key: "End", code: "End" });

		checkTabs(tabs, tabPanels, 2, [0, 1]);

		fireEvent.keyDown(tabList, { key: "Home", code: "Home" });

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		// Shouldn't do anything
		fireEvent.keyDown(tabList, { key: "ArrowUp", code: "ArrowUp" });

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		fireEvent.keyDown(tabList, { key: "ArrowDown", code: "ArrowDown" });

		checkTabs(tabs, tabPanels, 0, [1, 2]);
	});

	it("should change active tab vertical with keyboard arrow", () => {
		const { getAllByRole, getByRole } = render(
			renderKey(TabOrientation.VERTICAL)
		);

		const tabList = getByRole("tablist");

		const tabs = getAllByRole("tab");

		const tabPanels = getAllByRole("tabpanel", {
			hidden: true,
		});

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		fireEvent.keyDown(tabList, { key: "ArrowDown", code: "ArrowDown" });

		checkTabs(tabs, tabPanels, 1, [0, 2]);

		fireEvent.keyDown(tabList, { key: "ArrowDown", code: "ArrowDown" });

		checkTabs(tabs, tabPanels, 2, [0, 1]);

		fireEvent.keyDown(tabList, { key: "ArrowDown", code: "ArrowDown" });

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		fireEvent.keyDown(tabList, { key: "ArrowUp", code: "ArrowUp" });

		checkTabs(tabs, tabPanels, 2, [0, 1]);

		fireEvent.keyDown(tabList, { key: "ArrowUp", code: "ArrowUp" });

		checkTabs(tabs, tabPanels, 1, [0, 2]);

		fireEvent.keyDown(tabList, { key: "ArrowUp", code: "ArrowUp" });

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		fireEvent.keyDown(tabList, { key: "End", code: "End" });

		checkTabs(tabs, tabPanels, 2, [0, 1]);

		fireEvent.keyDown(tabList, { key: "Home", code: "Home" });

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		// Shouldn't do anything
		fireEvent.keyDown(tabList, { key: "ArrowLeft", code: "ArrowLeft" });

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		fireEvent.keyDown(tabList, { key: "ArrowRight", code: "ArrowRight" });

		checkTabs(tabs, tabPanels, 0, [1, 2]);
	});

	it("should change active tab when have disabled tabs", () => {
		const { getAllByRole, getByRole, rerender } = render(
			<Tabs>
				<TabList aria-label="Settings">
					<Tab value={0}>First</Tab>
					<Tab value={1} disabled={true}>
						Second
					</Tab>
					<Tab value={2}>Third</Tab>
				</TabList>
				<TabPanel value={0}>First</TabPanel>
				<TabPanel value={1}>Second</TabPanel>
				<TabPanel value={2}>Third</TabPanel>
			</Tabs>
		);

		let tabList = getByRole("tablist");

		let tabs = getAllByRole("tab");

		let tabPanels = getAllByRole("tabpanel", {
			hidden: true,
		});

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		fireEvent.keyDown(tabList, { key: "ArrowRight", code: "ArrowRight" });

		checkTabs(tabs, tabPanels, 2, [0, 1]);

		fireEvent.keyDown(tabList, { key: "ArrowLeft", code: "ArrowLeft" });

		checkTabs(tabs, tabPanels, 0, [1, 2]);

		rerender(
			<Tabs>
				<TabList aria-label="Settings">
					<Tab value={0} disabled={true}>
						First
					</Tab>
					<Tab value={1}>Second</Tab>
					<Tab value={2}>Third</Tab>
					<Tab value={3} disabled={true}>
						Fourth
					</Tab>
				</TabList>
				<TabPanel value={0}>First</TabPanel>
				<TabPanel value={1}>Second</TabPanel>
				<TabPanel value={2}>Third</TabPanel>
				<TabPanel value={3}>Fourth</TabPanel>
			</Tabs>
		);

		tabList = getByRole("tablist");

		tabs = getAllByRole("tab");

		tabPanels = getAllByRole("tabpanel", {
			hidden: true,
		});

		fireEvent.keyDown(tabList, { key: "End", code: "End" });

		checkTabs(tabs, tabPanels, 2, [0, 1, 3]);

		fireEvent.keyDown(tabList, { key: "Home", code: "Home" });

		checkTabs(tabs, tabPanels, 1, [0, 2, 3]);
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			Tabs: {
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
			const { container } = render(<Tabs variant="custom">Tabs</Tabs>, {
				theme: themeTest,
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<Tabs variant="custom" themeExtend={themeTest}>
					Tabs
				</Tabs>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(<Tabs>Tabs</Tabs>, {
				theme: {
					Tabs: {
						defaultProps: {
							id: "id",
							className: "hello",
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(<Tabs>Tabs</Tabs>, {
				theme: {
					Tabs: {
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

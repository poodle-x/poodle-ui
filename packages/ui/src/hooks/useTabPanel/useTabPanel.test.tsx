import React from "react";
import { render, renderHook } from "../../utils/test";
import {
	TabOrientation,
	TabRegisterType,
	TabsContext,
	TabValue,
} from "../useTabsState";

import useTabPanel, {
	UseTabPanelOptions,
	UseTabPanelReturn,
} from "./useTabPanel";

describe("useTabPanel", () => {
	it("should init", () => {
		const { result } = renderHook<UseTabPanelOptions, UseTabPanelReturn>(
			() => {
				return useTabPanel({ id: "test", value: "v0" });
			},
			{
				wrapper: (p) => {
					return (
						<TabsContext.Provider
							value={
								{
									listTab: [],
									value: "",
									orientation: TabOrientation.HORIZONTAL,
									register: jest.fn(),
									unregister: jest.fn(),
								} as any
							}
						>
							{p.children}
						</TabsContext.Provider>
					);
				},
			}
		);

		expect(result.current.selected).toEqual(false);
		expect(result.current.props).toEqual({
			role: "tabpanel",
			id: "test",

			tabIndex: 0,
			hidden: true,
		});
	});

	it("should return selected props", () => {
		const { result } = renderHook<UseTabPanelOptions, UseTabPanelReturn>(
			() => {
				return useTabPanel({ id: "test", value: "v0" });
			},
			{
				wrapper: (p) => {
					return (
						<TabsContext.Provider
							value={
								{
									listTab: [["v0", "0"]],
									value: "v0",
									orientation: TabOrientation.HORIZONTAL,
									register: jest.fn(),
									unregister: jest.fn(),
								} as any
							}
						>
							{p.children}
						</TabsContext.Provider>
					);
				},
			}
		);

		expect(result.current.selected).toEqual(true);
		expect(result.current.props).toEqual({
			role: "tabpanel",
			id: "test",
			"aria-labelledby": "0",
			tabIndex: 0,
			hidden: false,
		});
	});

	it("should register when have parent", () => {
		const Panel = ({ value }: { value: TabValue }) => {
			const { setRef, props } = useTabPanel({
				id: "panel-id",
				value: value,
			});
			return (
				<div data-testid="parent">
					<div
						{...props}
						data-value={value}
						data-testid="panel"
						ref={setRef as any}
					>
						Panel
					</div>
				</div>
			);
		};
		const mock = jest.fn();
		const COMP = (props: { orientation: TabOrientation }) => {
			const [value, setValue] = React.useState<TabValue>("v0");
			return (
				<TabsContext.Provider
					value={
						{
							onChange: (value: TabValue) => {
								setValue(value);
							},
							listTab: [
								["v0", "0"],
								["v1", "1"],
								["v2", "2"],
							],
							value: value,
							orientation: props.orientation,
							register: mock,
							unregister: jest.fn(),
						} as any
					}
				>
					<Panel value={value} />
				</TabsContext.Provider>
			);
		};

		render(<COMP orientation={TabOrientation.VERTICAL} />);

		expect(mock).toHaveBeenCalledWith(
			TabRegisterType.PANEL,
			"v0",
			"panel-id",
			0
		);
	});
});

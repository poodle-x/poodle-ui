import React from "react";
import { render, renderHook } from "../../utils/test";
import {
	TabOrientation,
	TabRegisterType,
	TabsContext,
	TabValue,
} from "../useTabsState";
import useTab, { UseTabOptions, UseTabReturn } from "./useTab";

describe("useTab", () => {
	it("should init", () => {
		const { result } = renderHook<UseTabOptions, UseTabReturn>(
			() => {
				return useTab({ id: "test", value: "v0" });
			},
			{
				wrapper: (p) => {
					return (
						<TabsContext.Provider
							value={
								{
									listTab: [],
									listTabPanel: [],
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
			"aria-selected": false,
			id: "test",
			role: "tab",
			tabIndex: -1,
		});
	});

	it("should return selected props", () => {
		const { result } = renderHook<UseTabOptions, UseTabReturn>(
			() => {
				return useTab({ id: "test", value: "v0" });
			},
			{
				wrapper: (p) => {
					return (
						<TabsContext.Provider
							value={
								{
									listTab: [["v0", "0"]],
									listTabPanel: [["v0", "0"]],
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
			"aria-controls": "0",
			"aria-selected": true,
			id: "test",
			role: "tab",
			tabIndex: 0,
		});
	});

	it("should register when have parent", () => {
		const Tab = ({ value }: { value: TabValue }) => {
			const { setRef, props } = useTab({
				id: "tab-id",
				value: value,
			});
			return (
				<div data-testid="parent">
					<div
						{...props}
						data-value={value}
						data-testid="tab"
						ref={setRef as any}
					>
						tab
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
							listTab: [["v0", "0"]],
							listTabPanel: [["v0", "0"]],
							value: value,
							orientation: props.orientation,
							register: mock,
							unregister: jest.fn(),
						} as any
					}
				>
					<Tab value={value} />
				</TabsContext.Provider>
			);
		};

		render(<COMP orientation={TabOrientation.VERTICAL} />);

		expect(mock).toHaveBeenCalledWith(TabRegisterType.TAB, "v0", "tab-id", 0);
	});
});

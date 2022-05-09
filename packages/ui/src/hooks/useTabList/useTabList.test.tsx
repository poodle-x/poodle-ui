import React from "react";
import { fireEvent, hookAct, render, renderHook } from "../../utils/test";
import { TabOrientation, TabsContext, TabValue } from "../useTabsState";
import useTabList, { UseTabListReturn } from "./useTabList";

const List = (props: { value: TabValue }) => {
	const { setRef } = useTabList();
	return (
		<div data-value={props.value} data-testid="list" ref={setRef as any}>
			<div role="tab">Tab0</div>
			<div role="tab">Tab1</div>
			<div role="tab">Tab2</div>
		</div>
	);
};

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
				} as any
			}
		>
			<List value={value} />
		</TabsContext.Provider>
	);
};

describe("useTabList", () => {
	it("should init", () => {
		const { result } = renderHook<any, UseTabListReturn>(
			() => {
				return useTabList();
			},
			{
				wrapper: (p) => {
					return (
						<TabsContext.Provider
							value={
								{
									listTab: [],
									value: "10",
									orientation: TabOrientation.HORIZONTAL,
								} as any
							}
						>
							{p.children}
						</TabsContext.Provider>
					);
				},
			}
		);

		expect(result.current.props).toEqual({
			role: "tablist",
			"aria-orientation": TabOrientation.HORIZONTAL,
		});
	});

	it("should add event when set ref", () => {
		const mock = {
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		};
		const { result } = renderHook<any, UseTabListReturn>(
			() => {
				return useTabList();
			},
			{
				wrapper: (p) => {
					return (
						<TabsContext.Provider
							value={
								{
									listTab: [],
									value: "10",
									orientation: TabOrientation.HORIZONTAL,
								} as any
							}
						>
							{p.children}
						</TabsContext.Provider>
					);
				},
			}
		);

		hookAct(() => {
			result.current.setRef(mock as any);
		});
		expect(mock.addEventListener).toBeCalledWith(
			"keydown",
			expect.any(Function)
		);
		expect(mock.removeEventListener).not.toBeCalled();
	});

	describe("keyboard event", () => {
		function getValue(list: HTMLElement) {
			return list.getAttribute("data-value");
		}

		function key(
			k: "right" | "left" | "end" | "home" | "top" | "down",
			list: HTMLElement
		) {
			switch (k) {
				case "right": {
					fireEvent.keyDown(list, { key: "ArrowRight", code: "ArrowRight" });
					break;
				}
				case "left": {
					fireEvent.keyDown(list, { key: "ArrowLeft", code: "ArrowLeft" });
					break;
				}
				case "top": {
					fireEvent.keyDown(list, { key: "ArrowUp", code: "ArrowUp" });
					break;
				}
				case "down": {
					fireEvent.keyDown(list, { key: "ArrowDown", code: "ArrowDown" });
					break;
				}
				case "home": {
					fireEvent.keyDown(list, { key: "Home", code: "Home" });
					break;
				}
				case "end": {
					fireEvent.keyDown(list, { key: "End", code: "End" });
					break;
				}
			}
		}

		it("event keyboard tab horizontal", () => {
			const { getByTestId } = render(
				<COMP orientation={TabOrientation.HORIZONTAL} />
			);

			const list: HTMLElement = getByTestId("list");

			expect(getValue(list)).toEqual("v0");

			// do nothing
			key("top", list);

			expect(getValue(list)).toEqual("v0");

			// do nothing
			key("down", list);

			expect(getValue(list)).toEqual("v0");

			key("end", list);

			expect(getValue(list)).toEqual("v2");

			key("home", list);

			expect(getValue(list)).toEqual("v0");

			key("right", list);

			expect(getValue(list)).toEqual("v1");

			key("right", list);

			expect(getValue(list)).toEqual("v2");

			key("right", list);

			expect(getValue(list)).toEqual("v0");

			key("left", list);

			expect(getValue(list)).toEqual("v2");

			key("left", list);

			expect(getValue(list)).toEqual("v1");
		});

		it("event keyboard tab vertical", () => {
			const { getByTestId } = render(
				<COMP orientation={TabOrientation.VERTICAL} />
			);

			const list: HTMLElement = getByTestId("list");

			expect(getValue(list)).toEqual("v0");

			// do nothing
			key("left", list);

			expect(getValue(list)).toEqual("v0");

			// do nothing
			key("right", list);

			expect(getValue(list)).toEqual("v0");

			key("end", list);

			expect(getValue(list)).toEqual("v2");

			key("home", list);

			expect(getValue(list)).toEqual("v0");

			key("down", list);

			expect(getValue(list)).toEqual("v1");

			key("down", list);

			expect(getValue(list)).toEqual("v2");

			key("down", list);

			expect(getValue(list)).toEqual("v0");

			key("top", list);

			expect(getValue(list)).toEqual("v2");

			key("top", list);

			expect(getValue(list)).toEqual("v1");
		});
	});
});

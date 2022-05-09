import React from "react";
import { TabOrientation, TabsContext } from "../useTabsState";

export interface UseTabListReturn {
	setRef: (node: HTMLElement) => void;
	props: { role: string; "aria-orientation": "horizontal" | "vertical" };
}

function handleDir(
	listTabs: NodeListOf<Element>,
	dir: string,
	currentIndex: number
) {
	let i = -1;

	switch (dir) {
		case "next": {
			i = currentIndex === listTabs.length - 1 ? 0 : currentIndex + 1;
			while (i !== currentIndex) {
				const element = listTabs.item(i) as HTMLButtonElement;
				if (!element.disabled) {
					return i;
				}
				i = i === listTabs.length - 1 ? 0 : i + 1;
			}
			break;
		}
		case "prev": {
			i = currentIndex === 0 ? listTabs.length - 1 : currentIndex - 1;

			while (i !== currentIndex) {
				const element = listTabs.item(i) as HTMLButtonElement;
				if (!element.disabled) {
					return i;
				}
				i = i === 0 ? listTabs.length - 1 : i - 1;
			}
			break;
		}
		case "first": {
			while (i !== currentIndex) {
				i = i + 1;
				const element = listTabs.item(i) as HTMLButtonElement;
				if (!element.disabled) {
					return i;
				}
			}
			break;
		}
		case "last": {
			i = listTabs.length - 1;
			while (i !== currentIndex) {
				const element = listTabs.item(i) as HTMLButtonElement;
				if (!element.disabled) {
					return i;
				}
				i = i - 1;
			}
			break;
		}
	}
	return -1;
}

export default function useTabList(): UseTabListReturn {
	const { orientation, listTab, value, onChange } = React.useContext(
		TabsContext
	);

	const localRef = React.useRef<HTMLElement | null>(null);

	const handleKeyDown = React.useCallback(
		(e: KeyboardEvent) => {
			e.preventDefault();

			function changeToIndex(index: number, listTabs: NodeListOf<Element>) {
				if (onChange) {
					onChange(listTab[index][0], e);
					const element = listTabs?.item(index) as HTMLElement | undefined;
					element?.focus();
				}
			}

			const listTabs = localRef.current?.querySelectorAll(`*[role="tab"]`);

			if (!listTabs || listTabs.length === 0) {
				return;
			}

			let dir;

			const currentIndex = listTab.findIndex((lt) => lt[0] === value);

			if (currentIndex === -1) {
				return;
			}

			switch (e.code) {
				case "ArrowLeft": {
					if (orientation === TabOrientation.HORIZONTAL) {
						dir = "prev";
					}
					break;
				}
				case "ArrowRight": {
					if (orientation === TabOrientation.HORIZONTAL) {
						dir = "next";
					}
					break;
				}
				case "ArrowUp": {
					if (orientation === TabOrientation.VERTICAL) {
						dir = "prev";
					}
					break;
				}
				case "ArrowDown": {
					if (orientation === TabOrientation.VERTICAL) {
						dir = "next";
					}
					break;
				}
				case "Home": {
					dir = "first";
					break;
				}
				case "End": {
					dir = "last";
					break;
				}
			}

			if (!dir) {
				return;
			}

			const index = handleDir(listTabs, dir, currentIndex);

			if (index > -1) {
				changeToIndex(index, listTabs);
			}
		},
		[listTab, onChange, value, orientation]
	);

	const setRef = React.useCallback(
		(node: HTMLElement) => {
			localRef.current?.removeEventListener("keydown", handleKeyDown);

			if (node) {
				localRef.current = node;
				localRef.current.addEventListener("keydown", handleKeyDown);
			}
		},
		[handleKeyDown]
	);

	React.useEffect(() => {
		return () => {
			localRef.current?.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	return {
		setRef,
		props: {
			role: "tablist",
			"aria-orientation": orientation,
		},
	};
}

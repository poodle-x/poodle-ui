import React from "react";
import { TabRegisterType, TabsContext, TabValue } from "../useTabsState";
import useAutoId from "../useAutoId";
import useSafeLayoutEffect from "../../utils/useSafeLayoutEffect";

export interface UseTabOptions {
	id?: string;
	value: TabValue;
}

export interface UseTabReturn {
	selected: boolean;
	props: {
		role: string;
		"aria-selected": boolean;
		"aria-controls"?: string;
		tabIndex: number;
		id?: string;
	};
	setRef: (node: HTMLElement) => void;
}

export default function useTab(options: UseTabOptions): UseTabReturn {
	const { id, value } = options;

	const currentId = useAutoId(id, {
		base: "poodle-tab",
	});

	const localRef = React.useRef<HTMLElement | null>(null);

	const {
		register,
		unregister,
		value: selectedValue,
		listTabPanel,
	} = React.useContext(TabsContext);

	const selected = Boolean(
		selectedValue !== undefined && selectedValue === value
	);

	const panel = listTabPanel.find((l) => l[0] === value);

	const props = {
		role: "tab",
		id: currentId,
		tabIndex: selected ? 0 : -1,
		"aria-selected": selected,
		"aria-controls": panel?.[1] || undefined,
	};

	useSafeLayoutEffect(() => {
		if (currentId) {
			const node = localRef.current;

			const parent = node?.parentNode;

			const listTabs = parent?.querySelectorAll(`*[role="tab"]`);

			if (parent) {
				const index = Array.prototype.indexOf.call(listTabs, node);
				register(TabRegisterType.TAB, value, currentId, index);
			}
		}
		return () => {
			if (currentId) {
				unregister(TabRegisterType.TAB, value, currentId);
			}
		};
	}, [currentId, register, unregister, value]);

	const setRef = React.useCallback((node: HTMLElement) => {
		localRef.current = node;
	}, []);

	return {
		selected,
		props,
		setRef,
	};
}

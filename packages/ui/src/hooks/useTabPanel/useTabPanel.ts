import React from "react";
import { TabRegisterType, TabsContext, TabValue } from "../useTabsState";
import useAutoId from "../useAutoId";
import useSafeLayoutEffect from "../../utils/useSafeLayoutEffect";

export interface UseTabPanelOptions {
	id?: string;
	value: TabValue;
}

export interface UseTabPanelReturn {
	selected: boolean;
	props: {
		role: string;
		id?: string;
		"aria-labelledby"?: string | undefined;
		tabIndex: number;
		hidden: boolean;
	};
	setRef: (node: HTMLElement) => void;
}

export default function useTabPanel(
	options: UseTabPanelOptions
): UseTabPanelReturn {
	const { id, value } = options;

	const currentId = useAutoId(id, {
		base: "poodle-tab-panel",
	});

	const localRef = React.useRef<HTMLElement | null>(null);

	const {
		register,
		unregister,
		value: selectedValue,
		listTab,
	} = React.useContext(TabsContext);

	const selected = Boolean(
		selectedValue !== undefined && selectedValue === value
	);

	const tab = listTab.find((l) => l[0] === value);

	const props = {
		role: "tabpanel",
		id: currentId,
		"aria-labelledby": tab?.[1] || undefined,
		tabIndex: 0,
		hidden: !selected,
	};

	useSafeLayoutEffect(() => {
		if (currentId) {
			const node = localRef.current;

			const parent = node?.parentNode;

			const listPanels = parent?.querySelectorAll(`*[role="tabpanel"]`);

			if (parent) {
				const index = Array.prototype.indexOf.call(listPanels, node);
				register(TabRegisterType.PANEL, value, currentId, index);
			}
		}
		return () => {
			if (currentId) {
				unregister(TabRegisterType.PANEL, value, currentId);
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

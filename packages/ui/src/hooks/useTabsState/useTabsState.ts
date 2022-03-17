import React, { SetStateAction } from "react";

export type TabValue = string | number;

export enum TabRegisterType {
	TAB = "TAB",
	PANEL = "PANEL",
}

export enum TabOrientation {
	VERTICAL = "vertical",
	HORIZONTAL = "horizontal",
}

export interface TabsContextValue {
	orientation: TabOrientation;
	listTab: [TabValue, string][];
	listTabPanel: [TabValue, string][];
	value?: TabValue;
	onChange?: (
		value: TabValue,
		event: React.SyntheticEvent | KeyboardEvent
	) => void;
	register: (
		type: TabRegisterType,
		value: TabValue,
		id: string,
		index: number
	) => void;
	unregister: (type: TabRegisterType, value: TabValue, id: string) => void;
}

export interface UseTabsStateOptions {
	propValue?: TabValue;
}

export const TabsContext = React.createContext<TabsContextValue>(
	{} as TabsContextValue
);

export default function useTabsState(props: UseTabsStateOptions) {
	const { propValue } = props;
	const [unControlledValue, setUnControlledValue] = React.useState<
		TabValue | undefined
	>();
	const [listTab, setListTab] = React.useState<[TabValue, string][]>([]);
	const [listPanel, setListPanel] = React.useState<[TabValue, string][]>([]);

	const handleRegister: TabsContextValue["register"] = React.useCallback(
		(type, value, id, index) => {
			if (type === TabRegisterType.TAB && index !== undefined) {
				setListTab((lt) => {
					return [...lt.slice(0, index), [value, id], ...lt.slice(index)];
				});
				return;
			}

			if (type === TabRegisterType.PANEL && index !== undefined) {
				setListPanel((lt) => {
					return [...lt.slice(0, index), [value, id], ...lt.slice(index)];
				});
				return;
			}

			const action: SetStateAction<[TabValue, string][]> = (cs) => {
				const current = cs.findIndex((c) => c[0] === value);
				if (current === -1) {
					return [...cs, [value, id]];
				} else {
					return cs.map((c, i) => {
						if (i !== current) {
							return c;
						} else {
							return [value, id];
						}
					});
				}
			};
			if (type === TabRegisterType.TAB) {
				setListTab(action);
			} else if (type === TabRegisterType.PANEL) {
				setListPanel(action);
			}
		},
		[]
	);

	const handleUnregister: TabsContextValue["unregister"] = React.useCallback(
		(type, value) => {
			const action: SetStateAction<[TabValue, string][]> = (cs) => {
				const current = cs.findIndex((c) => c[0] === value);
				if (current !== -1) {
					return cs.reduce<[TabValue, string][]>((prev, cur, index) => {
						if (index !== current) {
							prev.push(cur);
						}
						return prev;
					}, []);
				}
				return cs;
			};
			if (type === TabRegisterType.TAB) {
				setListTab(action);
			} else if (type === TabRegisterType.PANEL) {
				setListPanel(action);
			}
		},
		[]
	);

	React.useEffect(() => {
		if (
			propValue === undefined &&
			unControlledValue === undefined &&
			listTab.length > 0
		) {
			setUnControlledValue(listTab[0][0]);
		}
	}, [propValue, listTab, unControlledValue]);

	return {
		setUnControlledValue,
		value: propValue === undefined ? unControlledValue : propValue,
		isUncontrolled: propValue === undefined,
		listTab,
		listTabPanel: listPanel,
		handleUnregister,
		handleRegister,
	};
}

import React from "react";
import Box, { BoxProps } from "../Box";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import useTabsState, {
	TabOrientation,
	TabsContext,
	TabsContextValue,
	TabValue,
} from "../hooks/useTabsState";
import { getCSSSystemBoxProps } from "../styled/system";
import { StandardComponentProps, ThemeConfig } from "../theme";
import * as styles from "./styles";

export { TabOrientation, TabsContext, TabsContextValue, TabValue };

export interface LocalTabsProps {
	/**
	 * Send value to control active tab. By default <Tabs /> component
	 * use internal state to control active tab.
	 */
	value?: TabValue;
	/**
	 * Change tabs horizontal orientation or vertical orientation.
	 * Default is horizontal orientation.
	 */
	orientation?: TabOrientation;
	onChangeValue?: (
		value: TabValue,
		event: React.SyntheticEvent | KeyboardEvent
	) => void;
	children?: React.ReactNode;
}

export interface TabsProps
	extends Omit<BoxProps, "value">,
		StandardComponentProps,
		LocalTabsProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Tabs?.defaultProps;
}

export const Tabs: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<TabsProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, TabsProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<TabsProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		children,
		className,
		value,
		onChangeValue,
		orientation,
		...otherProps
	} = props;

	const {
		setUnControlledValue,
		isUncontrolled,
		value: calcValue,
		handleUnregister,
		handleRegister,
		listTabPanel,
		listTab,
	} = useTabsState({ propValue: value });

	const handleChangeValue: TabsContextValue["onChange"] = React.useCallback(
		(v: TabValue, e: React.SyntheticEvent<Element, Event> | KeyboardEvent) => {
			onChangeValue && onChangeValue(v, e);
			if (isUncontrolled) {
				setUnControlledValue(v);
			}
		},
		[onChangeValue, isUncontrolled, setUnControlledValue]
	);

	return (
		<TabsContext.Provider
			value={{
				listTab,
				listTabPanel,
				value: calcValue,
				register: handleRegister,
				unregister: handleUnregister,
				onChange: handleChangeValue,
				orientation: orientation || TabOrientation.HORIZONTAL,
			}}
		>
			<Box
				{...otherProps}
				{...getCSSSystemBoxProps({
					isRoot: true,
					isLocalTheme,
					componentProps: props,
					fnCSSSystem: styles.Root,
					baseClassName: ["poodle-tabs"],
				})}
				ref={ref}
			>
				{children}
			</Box>
		</TabsContext.Provider>
	);
});

Tabs.displayName = "PoodleTabs";

import React from "react";
import Box, { BoxProps } from "../Box";
import useTabPanel from "../hooks/useTabPanel";
import { TabValue } from "../hooks/useTabsState";
import { getCSSSystemBoxProps } from "../styled/system";
import { StandardComponentProps, ThemeConfig } from "../theme";
import uSetRef from "../utils/setRef";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import * as styles from "./styles";

export interface LocalTabPanelProps {
	value: TabValue;
	/**
	 * Does not unmount the children when the panel is not selected.
	 */
	keepMountChildren?: boolean;
	children?: React.ReactNode;
}

export interface TabPanelProps
	extends Omit<BoxProps, "value">,
		StandardComponentProps,
		LocalTabPanelProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.TabPanel?.defaultProps;
}

export const TabPanel: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<TabPanelProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, TabPanelProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<TabPanelProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		children,
		className,
		id,
		value,
		keepMountChildren,
		...otherProps
	} = props;

	const { props: htmlProps, selected, setRef } = useTabPanel({ id, value });

	const composeRef = React.useCallback(
		(node: HTMLElement) => {
			setRef(node);
			uSetRef(ref, node);
		},
		[setRef, ref]
	);

	return (
		<Box
			{...htmlProps}
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-tab-panel"],
			})}
			ref={composeRef}
		>
			{selected || keepMountChildren ? children : null}
		</Box>
	);
});

TabPanel.displayName = "PoodleTabPanel";

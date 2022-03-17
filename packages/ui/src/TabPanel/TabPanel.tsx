import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import uSetRef from "../utils/setRef";
import { useClassNames } from "../styled";
import * as styles from "./styles";
import { TabValue } from "../hooks/useTabsState";
import useTabPanel from "../hooks/useTabPanel";

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
	const props = useDefaultProps<TabPanelProps>(_props, {
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

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: ["poodle-tabpanel", styles.Root, className],
			},
		},
	});

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
			className={classes.root}
			ref={composeRef}
		>
			{selected || keepMountChildren ? children : null}
		</Box>
	);
});

TabPanel.displayName = "PoodleTabPanel";

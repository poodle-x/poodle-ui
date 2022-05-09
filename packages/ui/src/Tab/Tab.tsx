import React from "react";
import Box, { BoxProps } from "../Box";
import useTab from "../hooks/useTab";
import { TabsContext } from "../hooks/useTabsState";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { StandardComponentProps, ThemeConfig } from "../theme";
import uSetRef from "../utils/setRef";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import * as styles from "./styles";

export interface LocalTabProps {
	children?: React.ReactNode;
	value: string | number;
}

export interface TabProps
	extends Omit<BoxProps, "value">,
		StandardComponentProps,
		LocalTabProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Tab?.defaultProps;
}

export const Tab: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<TabProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, TabProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<TabProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const tabsContext = React.useContext(TabsContext);

	const { children, className, value, onClick, id, ...otherProps } = props;

	const { props: htmlProps, setRef } = useTab({
		id,
		value,
	});

	function handleClick(e: React.SyntheticEvent) {
		tabsContext.onChange?.(value, e);
		e.persist && e.persist();
		onClick && onClick(e as any);
	}

	const composeRef = React.useCallback(
		(node: HTMLElement) => {
			setRef(node);
			uSetRef(ref, node);
		},
		[setRef, ref]
	);

	return (
		<Box
			data-orientation={tabsContext.orientation}
			as="button"
			{...htmlProps}
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-tab"],
			})}
			onClick={handleClick}
			ref={composeRef}
		>
			{children}
		</Box>
	);
});

Tab.displayName = "PoodleTab";

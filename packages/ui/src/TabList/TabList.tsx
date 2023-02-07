import React from "react";
import Box, { BoxProps } from "../Box";
import useTabList from "../hooks/useTabList";
import { getCSSSystemBoxProps } from "../styled/system";
import { StandardComponentProps, ThemeConfig } from "../theme";
import uSetRef from "../utils/setRef";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import * as styles from "./styles";

export interface LocalTabListProps {
	children?: React.ReactNode;
}

export interface TabListProps
	extends BoxProps,
		StandardComponentProps,
		LocalTabListProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.TabList?.defaultProps;
}

export const TabList: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<TabListProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, TabListProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<TabListProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { props: htmlProps, setRef } = useTabList();

	const { children, ...otherProps } = props;

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
				baseClassName: ["poodle-tab-list"],
			})}
			ref={composeRef}
		>
			{children}
		</Box>
	);
});

TabList.displayName = "PoodleTabList";

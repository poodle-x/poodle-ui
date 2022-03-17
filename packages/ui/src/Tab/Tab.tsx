import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import uSetRef from "../utils/setRef";
import { useClassNames } from "../styled";
import * as styles from "./styles";
import { TabsContext } from "../hooks/useTabsState";
import useTab from "../hooks/useTab";

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
	const props = useDefaultProps<TabProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const tabsContext = React.useContext(TabsContext);

	const { children, className, value, onClick, id, ...otherProps } = props;

	const { props: htmlProps, setRef } = useTab({
		id,
		value,
	});

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: ["poodle-tab", styles.Root, className],
			},
		},
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
			onClick={handleClick}
			className={classes.root}
			ref={composeRef}
		>
			{children}
		</Box>
	);
});

Tab.displayName = "PoodleTab";

import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";
import useTabList from "../hooks/useTabList";
import uSetRef from "../utils/setRef";

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
	const props = useDefaultProps<TabListProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { props: htmlProps, setRef } = useTabList();

	const { children, className, ...otherProps } = props;

	const composeRef = React.useCallback(
		(node: HTMLElement) => {
			setRef(node);
			uSetRef(ref, node);
		},
		[setRef, ref]
	);

	const classes = useClassNames({
		props,
		lists: React.useMemo(() => {
			return {
				root: {
					classNames: ["poodle-tab-list", styles.Root, className],
				},
			};
		}, [className]),
	});

	return (
		<Box
			{...htmlProps}
			{...otherProps}
			className={classes.root}
			ref={composeRef}
		>
			{children}
		</Box>
	);
});

TabList.displayName = "PoodleTabList";

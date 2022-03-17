import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";

export interface LocalModalFooterProps {
	children?: React.ReactNode;
}

export interface ModalFooterProps
	extends BoxProps,
		StandardComponentProps,
		LocalModalFooterProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.ModalFooter?.defaultProps;
}

export const ModalFooter: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<ModalFooterProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, ModalFooterProps>((_props, ref) => {
	const props = useDefaultProps<ModalFooterProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { children, className, ...otherProps } = props;

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: [styles.Root, className],
			},
		},
	});

	return (
		<Box {...otherProps} className={classes.root} ref={ref}>
			{children}
		</Box>
	);
});

ModalFooter.displayName = "PoodleModalFooter";

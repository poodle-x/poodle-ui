import React from "react";
import Box, { BoxProps } from "../Box";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
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
	const { props, isLocalTheme } = useDefaultProps<ModalFooterProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const { children, ...otherProps } = props;

	return (
		<Box
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-modal-footer"],
			})}
			ref={ref}
		>
			{children}
		</Box>
	);
});

ModalFooter.displayName = "PoodleModalFooter";

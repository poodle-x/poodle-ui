import React, { useContext } from "react";
import Box, { BoxProps } from "../Box";
import { ModalContext } from "../Modal";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import * as styles from "./styles";

export interface LocalModalBodyProps {
	children?: React.ReactNode;
}

export interface ModalBodyProps
	extends BoxProps,
		StandardComponentProps,
		LocalModalBodyProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.ModalBody?.defaultProps;
}

export const ModalBody: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<ModalBodyProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, ModalBodyProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<ModalBodyProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});
	const { autoIdDescribedby } = useContext(ModalContext);

	const { children, ...otherProps } = props;

	return (
		<Box
			id={autoIdDescribedby}
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-modal-body"],
			})}
			ref={ref}
		>
			{children}
		</Box>
	);
});

ModalBody.displayName = "PoodleModalBody";

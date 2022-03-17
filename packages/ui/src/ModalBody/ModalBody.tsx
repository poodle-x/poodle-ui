import React, { useContext } from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";
import { ModalContext } from "../Modal";

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
	const props = useDefaultProps<ModalBodyProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});
	const { autoIdDescribedby } = useContext(ModalContext);

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
		<Box
			id={autoIdDescribedby}
			{...otherProps}
			className={classes.root}
			ref={ref}
		>
			{children}
		</Box>
	);
});

ModalBody.displayName = "PoodleModalBody";

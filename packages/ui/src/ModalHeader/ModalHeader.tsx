import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";
import Clear from "../icons/Clear";
import { IconButton } from "../IconButton";
import { ModalContext } from "../Modal";

export interface LocalModalHeaderProps {
	children?: React.ReactNode;
	/**
	 * Add close icon button
	 */
	withClose?: boolean;
	/**
	 * Custom props for close icon button
	 */
	closeProps?: BoxProps;
	/**
	 * Add icon to the header
	 */
	icon?: React.ReactNode;
	/**
	 * Custom props for icon element
	 */
	iconProps?: BoxProps;
	/**
	 * Custom props for content element
	 */
	contentProps?: BoxProps;
}

export interface ModalHeaderProps
	extends BoxProps,
		StandardComponentProps,
		LocalModalHeaderProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.ModalHeader?.defaultProps;
}

export const ModalHeader: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<ModalHeaderProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, ModalHeaderProps>((_props, ref) => {
	const props = useDefaultProps<ModalHeaderProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		children,
		className,
		closeProps,
		withClose,
		icon,
		contentProps,
		iconProps,
		...otherProps
	} = props;

	const { autoIdLabelledby } = React.useContext(ModalContext);

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: ["poodle-modal-header", styles.Root, className],
			},
			content: {
				classNames: ["poodle-modal-header__content", styles.Content, className],
			},
			close: {
				classNames: ["poodle-modal-header__close", styles.Close, className],
			},
			icon: {
				classNames: ["poodle-modal-header__icon", styles.Icon, className],
			},
		},
	});

	return (
		<Box
			textStyle="modalTitle"
			id={autoIdLabelledby}
			{...otherProps}
			className={classes.root}
			ref={ref}
		>
			<Box as="h2" {...contentProps} className={classes.content}>
				{icon && (
					<Box {...iconProps} className={classes.icon}>
						{icon}
					</Box>
				)}
				{children}
			</Box>
			{withClose && (
				<IconButton
					aria-label="Close"
					{...closeProps}
					className={classes.close}
				>
					<Clear />
				</IconButton>
			)}
		</Box>
	);
});

ModalHeader.displayName = "PoodleModalHeader";

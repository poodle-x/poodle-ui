import React from "react";
import Box, { BoxProps } from "../Box";
import { IconButton } from "../IconButton";
import Clear from "../icons/Clear";
import { ModalContext } from "../Modal";
import { getCSSSystemBoxProps } from "../styled/system";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import * as styles from "./styles";

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
	const { props, isLocalTheme } = useDefaultProps<ModalHeaderProps>(_props, {
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

	return (
		<Box
			textStyle="modalTitle"
			id={autoIdLabelledby}
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-modal-header"],
			})}
			ref={ref}
		>
			<Box
				as="h2"
				{...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: contentProps,
					fnCSSSystem: styles.Content,
					baseClassName: ["poodle-modal-header__content"],
				})}
			>
				{icon && (
					<Box
						{...getCSSSystemBoxProps({
							isLocalTheme,
							componentProps: props,
							partProps: iconProps,
							fnCSSSystem: styles.Icon,
							baseClassName: ["poodle-modal-header__icon"],
						})}
					>
						{icon}
					</Box>
				)}
				{children}
			</Box>
			{withClose && (
				<IconButton
					aria-label="Close"
					{...getCSSSystemBoxProps({
						isLocalTheme,
						componentProps: props,
						partProps: closeProps,
						fnCSSSystem: styles.Close,
						baseClassName: ["poodle-modal-header__close"],
					})}
				>
					<Clear />
				</IconButton>
			)}
		</Box>
	);
});

ModalHeader.displayName = "PoodleModalHeader";

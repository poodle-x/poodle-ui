import { Options as FocusTrapOptions } from "focus-trap";
import FocusTrap from "focus-trap-react";
import React from "react";
import { ModalContext } from ".";
import Box, { BoxProps } from "../Box";
import useAutoId from "../hooks/useAutoId";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import Portal, { PortalProps } from "../Portal";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { StandardComponentProps, ThemeConfig } from "../theme";
import * as styles from "./styles";

export interface LocalModalProps {
	children?: React.ReactNode;
	/**
	 * Open the modal when **`true`**.
	 */
	isOpen?: boolean;
	/**
	 * Callback called when the user tries to close the modal.
	 *
	 * It can be caused by click on outside the modal or press escape key.
	 */
	onRequestClose?: (cause: "outside" | "esc") => void;
	/**
	 * Custom props for inner element.
	 */
	innerProps?: BoxProps;
	/**
	 * Custom props for container element.
	 */
	containerProps?: BoxProps;
	/**
	 * Custom props for overlay element.
	 */
	overlayProps?: BoxProps;
	/**
	 * Custom props for root element.
	 */
	rootProps?: BoxProps;
	/**
	 * Custom props for modal element.
	 */
	modalProps?: BoxProps;
	/**
	 * Turn off focus trap.
	 */
	disableFocusTrap?: boolean;
	/**
	 * Custom props for **`<Portal />`**.
	 */
	portalProps?: Omit<PortalProps, "mount">;
	/**
	 * Add autoId
	 */
	withAutoId?: boolean;
	/**
	 * Pause or unpause focus trap
	 */
	pausedFocusTrap?: boolean;
	/**
	 * The elements will be used as the boundaries for the focus-trap,
	 * instead of the child.
	 */
	containerElementsFocusTrap?: Array<HTMLElement>;
	/**
	 * Pass any of the options available in focus-trap's createOptions.
	 */
	focusTrapOptions?: FocusTrapOptions;
}

export interface ModalProps
	extends BoxProps,
		StandardComponentProps,
		LocalModalProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Modal?.defaultProps;
}

export const Modal: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<ModalProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, ModalProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<ModalProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		children,
		className,
		onRequestClose,
		innerProps,
		containerProps,
		modalProps,
		overlayProps,
		portalProps,
		isOpen,
		disableFocusTrap,
		withAutoId,
		pausedFocusTrap,
		containerElementsFocusTrap,
		focusTrapOptions,
		...otherProps
	} = props;

	const autoIdLabelledby = useAutoId(undefined, {
		base: "poodle-modal-label",
	});
	const autoIdDescribedby = useAutoId(undefined, {
		base: "poodle-modal-describe",
	});

	const mouseDownTarget = React.useRef<HTMLElement | null>(null);

	function handlerOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
		if (e.target !== e.currentTarget) {
			return;
		}

		if (mouseDownTarget.current !== e.target) {
			return;
		}

		mouseDownTarget.current = null;

		if (onRequestClose) {
			onRequestClose("outside");
		}

		if (innerProps?.onClick) {
			innerProps.onClick(e);
		}
	}

	function handlerOverlayMouseDown(e: React.MouseEvent<HTMLElement>) {
		mouseDownTarget.current = e.target as HTMLElement;
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.key !== "Escape") {
			return;
		}

		e.stopPropagation();
		e.preventDefault();

		if (onRequestClose) {
			onRequestClose("esc");
		}

		if (innerProps?.onKeyDown) {
			innerProps.onKeyDown(e);
		}
	}

	const renderChild = (
		<Box
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-modal"],
			})}
			onKeyDown={handleKeyDown}
		>
			<Box
				aria-hidden={true}
				{...getCSSSystemBoxProps({
					componentProps: props,
					partProps: overlayProps,
					fnCSSSystem: styles.Overlay,
					baseClassName: ["poodle-modal__overlay"],
				})}
			/>
			<Box
				{...getCSSSystemBoxProps({
					componentProps: props,
					partProps: innerProps,
					fnCSSSystem: styles.Inner,
					baseClassName: ["poodle-modal__inner"],
				})}
				onMouseDown={handlerOverlayMouseDown}
				onClick={handlerOverlayClick}
			>
				<Box
					tabIndex={-1}
					{...getCSSSystemBoxProps({
						componentProps: props,
						partProps: containerProps,
						fnCSSSystem: styles.Container,
						baseClassName: ["poodle-modal__container"],
					})}
				>
					<Box
						role="dialog"
						aria-modal={true}
						aria-labelledby={withAutoId ? autoIdLabelledby : undefined}
						aria-describedby={withAutoId ? autoIdDescribedby : undefined}
						{...getCSSSystemBoxProps({
							componentProps: props,
							partProps: modalProps,
							fnCSSSystem: styles.Modal,
							baseClassName: ["poodle-modal__modal"],
						})}
					>
						{children}
					</Box>
				</Box>
			</Box>
		</Box>
	);

	return (
		<ModalContext.Provider
			value={{
				autoIdDescribedby: withAutoId ? autoIdDescribedby : undefined,
				autoIdLabelledby: withAutoId ? autoIdLabelledby : undefined,
			}}
		>
			<Portal {...portalProps} ref={ref} mount={isOpen}>
				<FocusTrap
					containerElements={containerElementsFocusTrap}
					paused={pausedFocusTrap}
					active={!disableFocusTrap}
					focusTrapOptions={{
						allowOutsideClick: true,
						...focusTrapOptions,
					}}
				>
					{renderChild}
				</FocusTrap>
			</Portal>
		</ModalContext.Provider>
	);
});

Modal.displayName = "PoodleModal";

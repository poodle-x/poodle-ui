import React from "react";
import FocusTrap from "focus-trap-react";
import { Options as FocusTrapOptions } from "focus-trap";
import Portal, { PortalProps } from "../Portal";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";
import useAutoId from "../hooks/useAutoId";
import { ModalContext } from ".";

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
	const props = useDefaultProps<ModalProps>(_props, {
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

	function handlerOverlayClick(e: React.MouseEvent<HTMLElement>) {
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
	}

	function handlerOverlayMouseDown(e: React.MouseEvent<HTMLElement>) {
		mouseDownTarget.current = e.target as HTMLElement;
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
		if (e.key !== "Escape") {
			return;
		}

		e.stopPropagation();

		if (onRequestClose) {
			onRequestClose("esc");
		}
	}

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: ["poodle-modal", styles.Root, className],
			},
			overlay: {
				classNames: [
					"poodle-modal__overlay",
					styles.Overlay,
					overlayProps?.className,
				],
			},
			inner: {
				classNames: [
					"poodle-modal__inner",
					styles.Inner,
					innerProps?.className,
				],
			},
			container: {
				classNames: [
					"poodle-modal__container",
					styles.Container,
					containerProps?.className,
				],
			},
			modal: {
				classNames: [
					"poodle-modal__modal",
					styles.Modal,
					modalProps?.className,
				],
			},
		},
	});

	const renderChild = (
		<Box onKeyDown={handleKeyDown} {...otherProps} className={classes.root}>
			<Box aria-hidden={true} {...overlayProps} className={classes.overlay} />
			<Box
				onMouseDown={handlerOverlayMouseDown}
				onClick={handlerOverlayClick}
				{...innerProps}
				className={classes.inner}
			>
				<Box tabIndex={-1} {...containerProps} className={classes.container}>
					<Box
						role="dialog"
						aria-modal={true}
						aria-labelledby={withAutoId ? autoIdLabelledby : undefined}
						aria-describedby={withAutoId ? autoIdDescribedby : undefined}
						{...modalProps}
						className={classes.modal}
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

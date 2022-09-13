import React from "react";
import Box, { BoxProps } from "../Box";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import { getCSSSystemBoxProps } from "../styled/CSSSystem";
import { ThemeConfig } from "../theme";
import * as styles from "./styles";

export interface LocalButtonProps {
	/**
	 * Class apply to root element.
	 */
	className?: string;
	/**
	 * Change button variant. Built-in options are **"default" | "outline" | "fill"**.
	 *
	 * Default is **"default"**.
	 */
	variant?: "default" | "outline" | "fill" | string;
	/**
	 * Change button size. Built-in options are **"s" | "m" | "l"**.
	 *
	 * Default is **"m"**.
	 */
	sizeStyle?: "s" | "m" | "l" | string;
	/**
	 * Change button color. Built-in options are **"default" | "primary" | "negative" | "positive" | "warn"**.
	 *
	 * Default is **"default"**.
	 */
	colorStyle?:
		| "default"
		| "primary"
		| "negative"
		| "positive"
		| "warn"
		| string;
	/**
	 * Add icon to start of the button.
	 */
	startIcon?: React.ReactNode;
	/**
	 * Add icon to end of the button.
	 */
	endIcon?: React.ReactNode;

	children?: React.ReactNode;
	/**
	 * Custom props for content element
	 */
	contentProps?: BoxProps;
	/**
	 * Custom props for icon element
	 */
	iconProps?: BoxProps;

	themeExtend?: ThemeConfig;

	theme?: ThemeConfig;
}

export interface ButtonProps
	extends Omit<
			React.AnchorHTMLAttributes<HTMLAnchorElement> &
				React.ButtonHTMLAttributes<HTMLButtonElement>,
			keyof BoxProps
		>,
		BoxProps,
		LocalButtonProps {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.Button?.defaultProps;
}

export const Button: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<ButtonProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, ButtonProps>((_props, ref) => {
	const { props, isLocalTheme } = useDefaultProps<ButtonProps>(_props, {
		themeDefaultProps: getDefaultProps,
	});

	const {
		theme,
		themeExtend,
		contentProps,
		iconProps,
		className,
		startIcon,
		endIcon,
		children,
		href,
		variant,
		colorStyle,
		sizeStyle,
		...otherProps
	} = props;

	return (
		<Box
			as={href ? "a" : "button"}
			ref={ref}
			{...otherProps}
			{...getCSSSystemBoxProps({
				isRoot: true,
				isLocalTheme,
				componentProps: props,
				fnCSSSystem: styles.Root,
				baseClassName: ["poodle-button"],
			})}
		>
			<Box
				{...getCSSSystemBoxProps({
					isLocalTheme,
					componentProps: props,
					partProps: contentProps,
					fnCSSSystem: styles.Content,
					baseClassName: ["poodle-button__content"],
				})}
			>
				{startIcon && (
					<Box
						{...getCSSSystemBoxProps({
							componentProps: props,
							partProps: iconProps,
							fnCSSSystem: [styles.Icon, styles.StartIcon],
							baseClassName: ["poodle-button__icon-start"],
						})}
					>
						{startIcon}
					</Box>
				)}
				{children}
				{endIcon && (
					<Box
						{...getCSSSystemBoxProps({
							componentProps: props,
							partProps: iconProps,
							fnCSSSystem: [styles.Icon, styles.EndIcon],
							baseClassName: ["poodle-button__icon-end"],
						})}
					>
						{endIcon}
					</Box>
				)}
			</Box>
		</Box>
	);
});

Button.displayName = "PoodleButton";

Button.defaultProps = {
	colorStyle: "default",
	variant: "default",
	sizeStyle: "m",
};

export default Button;

import React from "react";
import useDefaultProps from "../utils/useDefaultProps";
import { ThemeConfig } from "../theme";
import * as styles from "./styles";
import { Box, BoxProps } from "../Box";
import { useClassNames } from "../styled";

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
	const props = useDefaultProps<ButtonProps>(_props, {
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

	const classes = useClassNames({
		props,
		lists: {
			root: {
				classNames: ["poodle-button", styles.Root, className],
			},
			content: {
				classNames: [
					"poodle-button__content",
					styles.Content,
					contentProps?.className,
				],
			},
			iconStart: {
				classNames: [
					"poodle-button__icon-start",
					styles.Icon,
					styles.StartIcon,
					iconProps?.className,
				],
			},
			iconEnd: {
				classNames: [
					"poodle-button__icon-end",
					styles.Icon,
					styles.EndIcon,
					iconProps?.className,
				],
			},
		},
	});

	return (
		<Box
			theme={theme}
			as={href ? "a" : "button"}
			{...otherProps}
			ref={ref}
			className={classes.root}
		>
			<Box theme={theme} {...contentProps} className={classes.content}>
				{startIcon && (
					<Box theme={theme} {...iconProps} className={classes.iconStart}>
						{startIcon}
					</Box>
				)}
				{children}
				{endIcon && (
					<Box theme={theme} {...iconProps} className={classes.iconEnd}>
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

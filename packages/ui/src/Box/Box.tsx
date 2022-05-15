import { Theme } from "@emotion/react";
import emotionStyled, { StyledComponent } from "@emotion/styled";
import React from "react";
import useDefaultProps from "../hooks/useDefaultProps/useDefaultProps";
import { CSSObjectSystem, cssSystem, cx, DashSX } from "../styled";
import {
	removeSystemProps,
	StandardComponentProps,
	system,
	SystemProps,
} from "../theme";
import * as styles from "./styles";

export interface LocalBoxProps {
	/**
	 * Class apply to root element.
	 */
	className?: string;

	children?: React.ReactNode;
	/**
	 * Change the element will be rendered.
	 */
	as?: string | React.ComponentType<any>;

	sx?: CSSObjectSystem;
	/**
	 * Raw CSS properties. Won't be called with system
	 */
	_sx?: DashSX;
}

export interface BoxProps
	extends Omit<React.AllHTMLAttributes<HTMLElement>, keyof SystemProps | "as">,
		React.RefAttributes<HTMLElement>,
		SystemProps,
		StandardComponentProps,
		LocalBoxProps {
	[key: string]: any;
}

type As<P = any> = React.ElementType<P> | string;

type PropsWithAs<P, T extends As<P>> = P &
	Omit<
		React.ComponentProps<T extends string ? React.ElementType<T> : T>,
		"as" | keyof P
	> & {
		as?: T;
		children?: React.ReactNode;
	};

type Component<T extends As, O> = {
	<TT extends As>(props: PropsWithAs<O, TT> & { as: TT }): JSX.Element;
	(props: PropsWithAs<O, T>): JSX.Element;
	displayName?: string;
};

const excludeProps = ["css", "as"];

const BoxCore: StyledComponent<
	{ theme?: Theme; as?: React.ElementType },
	JSX.IntrinsicElements["div"],
	{ css?: any }
> = emotionStyled("div", {
	shouldForwardProp: (prop) => excludeProps.indexOf(prop.toString()) === -1,
})((props) => {
	const { css } = props as any;
	return css;
});

export const Box = React.forwardRef<HTMLElement, BoxProps>((_props, ref) => {
	const { props } = useDefaultProps<BoxProps>(_props, {
		themeDefaultProps: (t) => {
			return t?.Box?.defaultProps;
		},
	});

	const {
		themeExtend,
		theme: themeOverride,
		className,
		children,
		as = "div",
		sx,
		_sx,
		...otherProps
	} = props;

	const htmlProps = React.useMemo(() => {
		return removeSystemProps(otherProps);
	}, [otherProps]);

	return (
		<BoxCore
			{...htmlProps}
			as={as as any}
			css={[
				cssSystem({ props, ...styles.Root(props) }),
				_sx,
				...(sx ? system(sx, { sendProps: props }) : []),
				system(
					{ ...otherProps },
					{ sendProps: props, returnOnlySystemProps: true }
				),
			]}
			className={cx("poodle-box", className)}
			ref={ref as any}
		>
			{children}
		</BoxCore>
	);
}) as Component<As, BoxProps>;

Box.displayName = "PoodleBox";

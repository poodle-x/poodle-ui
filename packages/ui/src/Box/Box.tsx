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

type AsProp<C extends React.ElementType> = {
	as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
	C extends React.ElementType,
	Props = any
> = React.PropsWithChildren<Props & AsProp<C>> &
	Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicComponentPropWithRef<
	C extends React.ElementType,
	// eslint-disable-next-line @typescript-eslint/ban-types
	Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

type PolymorphicRef<
	C extends React.ElementType
> = React.ComponentPropsWithRef<C>["ref"];

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

export type BoxProps<
	C extends React.ElementType = "div"
> = PolymorphicComponentPropWithRef<
	C,
	SystemProps & StandardComponentProps & LocalBoxProps
>;

export type BoxComponent = <C extends React.ElementType = "div">(
	props: BoxProps<C>
) => React.ReactElement | null;

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

export const Box: BoxComponent = React.forwardRef(
	<C extends React.ElementType = "div">(
		_props: BoxProps<C>,
		ref?: PolymorphicRef<C>
	) => {
		const { props } = useDefaultProps<BoxProps<C>>(_props, {
			themeDefaultProps: (t) => {
				return t?.Box?.defaultProps;
			},
		});

		const {
			themeExtend,
			theme: themeOverride,
			className,
			children,
			sx,
			as,
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
	}
);

(Box as any).displayName = "PoodleBox";

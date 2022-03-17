import React from "react";
import useDefaultProps from "../utils/useDefaultProps";
import * as styles from "./styles";
import {
	removeSystemProps,
	StandardComponentProps,
	SystemProps,
} from "../theme";
import { useClassNames } from "../styled";
import { CSSObjectSystem } from "../styled";

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
}

export interface BoxProps
	extends Omit<React.AllHTMLAttributes<HTMLElement>, keyof SystemProps | "as">,
		React.RefAttributes<HTMLElement>,
		SystemProps,
		StandardComponentProps,
		LocalBoxProps {
	sx?: CSSObjectSystem;
	[key: string]: any;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>((_props, ref) => {
	const props = useDefaultProps<BoxProps>(_props, {
		themeDefaultProps: (t) => {
			return t?.Box?.defaultProps;
		},
	});

	const {
		themeExtend,
		theme: themeOverride,
		className = "",
		children,
		as = "div",
		...otherProps
	} = props;

	const htmlProps = removeSystemProps(otherProps);

	const classes = useClassNames({
		props,
		lists: React.useMemo(() => {
			return {
				root: {
					classNames: [
						"poodle-box",
						styles.Root,
						className,
						styles.SX,
						styles.Box,
					],
				},
			};
		}, [className]),
	});

	return React.createElement(
		as,
		{ ref, className: classes.root, ...htmlProps },
		children
	);
}) as Component<As, BoxProps>;

Box.displayName = "PoodleBox";

import React from "react";
import Box, { BoxProps } from "../Box";
import { StandardComponentProps, ThemeConfig } from "../theme";
import useDefaultProps from "../utils/useDefaultProps";
import { useClassNames } from "../styled";
import * as styles from "./styles";

export interface Local{{NameCamel}}Props {
	children?: React.ReactNode;
};

export interface {{NameCamel}}Props
	extends BoxProps,
		StandardComponentProps,
		Local{{NameCamel}}Props {}

function getDefaultProps(theme?: ThemeConfig) {
	return theme?.{{NameCamel}}?.defaultProps;
}

export const {{NameCamel}} = React.forwardRef<HTMLElement, {{NameCamel}}Props>(
	(_props, ref) => {
		const props = useDefaultProps<{{NameCamel}}Props>(_props, {
			themeDefaultProps: getDefaultProps,
		});

		const { children, className, ...otherProps } = props;

		const classes = useClassNames({
			props,
			lists: {
				root: {
					classNames: [styles.Root, className],
				},
			}
		});

		return (
			<Box {...otherProps} className={classes.root} ref={ref}>
				{children}
			</Box>
		);
	}
);

{{NameCamel}}.displayName = "Poodle{{NameCamel}}"

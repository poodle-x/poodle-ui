import React from "react";
import Box, { BoxProps } from "@poodle/ui/Box";
import { CSSObjectSystem } from "@poodle/ui/styled";

export type HeadingProps = BoxProps;

const styles: CSSObjectSystem = {
	marginLeft: "-0.75em",
	paddingLeft: "0.75em",
	"& .anchor": {
		position: "absolute",
		color: "primary",
		left: "-0.75em",
		top: 0,
		visibility: "hidden",
	},

	"&:hover .anchor": {
		visibility: "visible",
	},
};

export function Heading(props: HeadingProps) {
	return (
		<Box position="relative" sx={styles}>
			<Box {...props} />
		</Box>
	);
}

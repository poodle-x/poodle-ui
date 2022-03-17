import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { CSSObjectSystem } from "@poodle/ui/styled";
import Box from "@poodle/ui/Box";

export type MDLinkProps = React.HTMLProps<HTMLElement>;

const styles: CSSObjectSystem = {
	color: "primary",
	textDecoration: "underline",
};

export function MDLink(props: MDLinkProps) {
	const { href = "", children, ref, ...otherProps } = props;

	if (href.startsWith("/") || href.startsWith("#")) {
		return (
			<Box as={GatsbyLink} to={href} {...(otherProps as any)} sx={styles}>
				{children}
			</Box>
		);
	}

	return (
		<Box
			as="a"
			href={href}
			target="_blank"
			rel="noopener noreferrer nofollow"
			{...otherProps}
			sx={styles}
		>
			{children}
		</Box>
	);
}

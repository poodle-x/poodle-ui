import React from "react";
import { Link } from "gatsby";
import Box from "@poodle/ui/Box";
import VisuallyHidden from "@poodle/ui/VisuallyHidden";
import { CSSObjectSystem, CSSSystem } from "@poodle/ui/styled";
import { useThemeClassNames } from "../../utils/useThemeClassNames";
import { useLocation } from "@reach/router";

const boxStyles: CSSObjectSystem = {
	listStyleType: "none",
	pl: 0,
	my: 0,
};

const headStyles: CSSSystem = {
	base: [
		{
			pl: "scale-2",
			fontWeight: "bold",
		},
	],
};

const listStyles: CSSObjectSystem = {
	py: "scale-2",
};

const listLinkStyles: CSSSystem = {
	base: [{ mt: "scale-1" }],
};

const linkStyles: CSSSystem = {
	base: [
		{
			display: "block",
			color: "text",
			textDecoration: "none",
			py: "scale-2",
			px: "scale-4",
			fontWeight: 400,

			"&:hover": {
				bg: "primary.light",
				color: "primary.textOnLight",
			},

			"&._active": {
				bg: "primary.light",
				color: "primary.textOnLight",
				borderRight: "4px solid",
				borderColor: "primary",
			},
		},
	],
};

type ListLinkProps = {
	children?: React.ReactNode;
	href?: string;
};

function ListLink(props: ListLinkProps) {
	const { children, href } = props;

	const classes = useThemeClassNames({
		props,
		lists: {
			root: {
				classNames: [listLinkStyles],
			},
			link: {
				classNames: [linkStyles],
			},
		},
	});

	return (
		<Box as="li" className={classes.root}>
			<Box
				as={Link}
				activeClassName="_active"
				className={classes.link}
				to={href}
			>
				{children}
			</Box>
		</Box>
	);
}

function GroupHeading(props: { children?: React.ReactNode }) {
	const { children } = props;

	const classes = useThemeClassNames({
		props,
		lists: {
			root: {
				classNames: [headStyles],
			},
		},
	});

	return (
		<Box as="li" className={classes.root}>
			{children}
		</Box>
	);
}

type Group = {
	title: string;
	links: Array<{
		href: string;
		title: string;
	}>;
};

const groupsUI: Array<Group> = [
	{
		title: "Getting started",
		links: [
			{
				title: "Installation",
				href: "/ui/getting-started/installation",
			},
			{
				title: "Usage",
				href: "/ui/getting-started/usage",
			},
			{
				title: "Styling",
				href: "/ui/getting-started/styling",
			},
			{
				title: "Box",
				href: "/ui/getting-started/box",
			},
			{
				title: "Theming",
				href: "/ui/getting-started/theming",
			},
		],
	},

	{
		title: "Layout",
		links: [
			{
				title: "Container",
				href: "/ui/layout/container",
			},
			{
				title: "Columns",
				href: "/ui/layout/columns",
			},
			{
				title: "Column",
				href: "/ui/layout/column",
			},
			{
				title: "Portal",
				href: "/ui/layout/portal",
			},
		],
	},

	{
		title: "Components",
		links: [
			{
				title: "Button",
				href: "/ui/components/button",
			},
			{
				title: "Table",
				href: "/ui/components/table",
			},
			{
				title: "TableHead",
				href: "/ui/components/table-head",
			},
			{
				title: "TableRow",
				href: "/ui/components/table-row",
			},
			{
				title: "TableBody",
				href: "/ui/components/table-body",
			},
			{
				title: "TableCell",
				href: "/ui/components/table-cell",
			},
			{
				title: "Checkbox",
				href: "/ui/components/checkbox",
			},
			{
				title: "Radio",
				href: "/ui/components/radio",
			},
			{
				title: "Input",
				href: "/ui/components/input",
			},
			{
				title: "Select",
				href: "/ui/components/select",
			},
			{
				title: "Input Adornment",
				href: "/ui/components/input-adornment",
			},
			{
				title: "Icon Button",
				href: "/ui/components/icon-button",
			},
			{
				title: "Modal",
				href: "/ui/components/modal",
			},
			{
				title: "Modal Header",
				href: "/ui/components/modal-header",
			},
			{
				title: "Modal Body",
				href: "/ui/components/modal-body",
			},
			{
				title: "Modal Footer",
				href: "/ui/components/modal-footer",
			},
			{
				title: "Tabs",
				href: "/ui/components/tabs",
			},
			{
				title: "Tab",
				href: "/ui/components/tab",
			},
			{
				title: "Tab List",
				href: "/ui/components/tab-list",
			},
			{
				title: "Tab Panel",
				href: "/ui/components/tab-panel",
			},
		],
	},
];

const groupsSystem: Array<Group> = [
	{
		title: "Getting started",
		links: [
			{
				title: "Installation",
				href: "/system/getting-started/installation",
			},
			{
				title: "Usage",
				href: "/system/getting-started/usage",
			},
			{
				title: "Create system",
				href: "/system/getting-started/create-system",
			},
			{
				title: "Responsive styles",
				href: "/system/getting-started/responsive-styles",
			},
		],
	},
	{
		title: "Config",
		links: [
			{
				title: "Spacing",
				href: "/system/config/spacing",
			},
			{
				title: "Colors",
				href: "/system/config/colors",
			},
			{
				title: "Borders",
				href: "/system/config/borders",
			},
			{
				title: "Flex",
				href: "/system/config/flex",
			},
			{
				title: "Grid",
				href: "/system/config/grid",
			},
			{
				title: "Fonts",
				href: "/system/config/fonts",
			},
			{
				title: "Layouts",
				href: "/system/config/layout",
			},
			{
				title: "Shadow",
				href: "/system/config/shadow",
			},
			{
				title: "Pseudos",
				href: "/system/config/pseudos",
			},
		],
	},
];

export function SidebarNav() {
	const location = useLocation();

	const isSystemPath = location.pathname.indexOf("/system/") >= 0;

	let groups = groupsUI;

	if (isSystemPath) {
		groups = groupsSystem;
	}

	return (
		<Box as="ul" sx={boxStyles} pt="scale-2">
			<VisuallyHidden as="h2">Table of contents</VisuallyHidden>
			{groups.map((g, i) => {
				return (
					<Box as="li" sx={listStyles} key={i}>
						<GroupHeading>{g.title}</GroupHeading>
						<Box as="ul" sx={boxStyles}>
							{g.links.map(({ href, title }) => {
								return <ListLink href={href}>{title}</ListLink>;
							})}
						</Box>
					</Box>
				);
			})}
		</Box>
	);
}

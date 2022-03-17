import React from "react";
import { Helmet } from "react-helmet";
import Container from "@poodle/ui/Container";
import Box from "@poodle/ui/Box";
import Table from "@poodle/ui/Table";
import TableRow from "@poodle/ui/TableRow";
import TableCell from "@poodle/ui/TableCell";
import TableHead from "@poodle/ui/TableHead";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { Provider } from "./Provider";
import DocLiveCode from "../components/DocLiveCode";
import Heading from "../components/Heading";
import MDLink from "../components/MDLink";
import { SidebarNav } from "../components/SidebarNav";
import useWindowSize from "../utils/useWindowSize";
import Header from "../components/Header";

type Props = {
	children: React.ReactNode;
	pageContext: any;
	path: string;
};

const components = {
	a: (props: any) => {
		return <MDLink {...props} />;
	},
	pre: (props: any) => {
		return (
			<Box mt="scale-4">
				<DocLiveCode {...props.children.props} />
			</Box>
		);
	},
	h1: (props: any) => {
		return <Heading my="scale-12" textStyle="h1" as="h1" {...props} />;
	},
	h2: (props: any) => {
		return (
			<Box my="scale-8" borderBottom="1px solid" borderColor="border">
				<Heading my="0" textStyle="h2" as="h2" {...props} />
			</Box>
		);
	},
	h3: (props: any) => {
		return <Heading my="scale-8" textStyle="h3" as="h3" {...props} />;
	},
	p: (props: any) => {
		return (
			<Box
				sx={{
					"& code": {
						padding: "0.1em 0.2em",
						backgroundColor: "primary.light",
					},
				}}
				my="scale-4"
				as="p"
				{...props}
			/>
		);
	},
	table: (props: any) => {
		return (
			<Box overflow="auto">
				<Table
					sx={{
						"td > code": {
							padding: "0.1em 0.2em",
							backgroundColor: "primary.light",
							color: "primary.textOnLight",
						},
					}}
					withDivider={true}
					{...props}
				/>
			</Box>
		);
	},
	thead: (props: any) => {
		return <TableHead {...props} />;
	},
	tr: (props: any) => {
		return <TableRow {...props} />;
	},
	td: (props: any) => {
		return <TableCell {...props} />;
	},
	th: (props: any) => {
		return <TableCell {...props} />;
	},
	ul: (props: any) => {
		return <Box as="ul" pl="scale-4" listStyleType="disc" {...props} />;
	},
};

export default function Docs(props: Props) {
	const { pageContext } = props;

	const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

	const size = useWindowSize();

	const isMobile = size.width && size.width <= 1024;

	React.useEffect(() => {
		if (size.width && size.width <= 1024) {
			setIsOpenDrawer(false);
		} else {
			setIsOpenDrawer(true);
		}
	}, [size]);

	const title = pageContext.frontmatter?.title;
	return (
		<Provider>
			<Helmet>
				<meta charSet="utf-8" />
				<title>{title} | Poodle UI</title>
			</Helmet>
			<Header
				setMenu={() => {
					setIsOpenDrawer(true);
				}}
			/>
			<Box
				pl="scale-4"
				bg="#fff"
				height="calc(100% - 60px)"
				width="320px"
				as="nav"
				position="fixed"
				top="60px"
				left={isMobile && !isOpenDrawer ? "-320px" : "0"}
				borderRight="1px solid"
				borderColor="border"
				zIndex="sidebar"
				overflow="auto"
				transition="left 100ms ease-in"
			>
				<SidebarNav />
			</Box>
			<Box
				as="main"
				pt="60px"
				position="relative"
				zIndex="1"
				pl={!isMobile ? "320px" : ""}
			>
				<Container fixed="lg" gutter={["scale-6"]} pb="50px">
					<MDXProvider components={components}>
						<MDXRenderer>{pageContext.mdxBody}</MDXRenderer>
					</MDXProvider>
				</Container>
			</Box>
		</Provider>
	);
}

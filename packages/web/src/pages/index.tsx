import React from "react";
import { Provider } from "../layout/Provider";
import Header from "../components/Header";
import Box from "@poodle/ui/Box";
import Container from "@poodle/ui/Container";
import Button from "@poodle/ui/Button";
import { Link } from "gatsby";

const IndexPage = () => {
	return (
		<Provider>
			<Header />
			<Box as="main" pt={{ _: "80px", lg: "120px" }}>
				<Container fixed="xl">
					<Box
						textAlign="center"
						as="h1"
						fontSize={{ _: "32px", lg: "40px" }}
						lineHeight={{ _: "1.2", lg: "1.3" }}
						fontWeight={900}
					>
						Speed up the development of your{" "}
						<Box as="span" color="primary">
							React apps
						</Box>{" "}
						<br /> with highly customizable UI
					</Box>
					<Box mt={{ _: "scale-8", lg: "scale-12" }} textAlign="center">
						<Link to="/ui/getting-started/installation">
							<Button sizeStyle="l" colorStyle="primary" variant="fill">
								Getting started
							</Button>
						</Link>
						<Box
							ml="scale-4"
							as="a"
							target="_blank"
							href="https://github.com/poodle-x/poodle-ui"
						>
							<Button sizeStyle="l" variant="fill">
								Github
							</Button>
						</Box>
					</Box>
				</Container>
			</Box>
		</Provider>
	);
};

export default IndexPage;

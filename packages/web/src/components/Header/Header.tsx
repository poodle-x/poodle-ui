import MenuIcon from "@poodle/icons/react/Menu";
import Box, { BoxProps } from "@poodle/ui/Box";
import IconButton from "@poodle/ui/IconButton";
import { useLocation } from "@reach/router";
import { Link } from "gatsby";
import React from "react";
import logo from "../../assets/logo.svg";

function LinkSection(
	props: BoxProps & {
		active?: boolean;
		to: string;
		children?: React.ReactNode;
	}
) {
	const { active, to, children, ...others } = props;

	return (
		<Box
			px="scale-4"
			py="scale-2"
			border={active ? "1px solid" : undefined}
			borderColor={active ? "primary" : undefined}
			as={Link}
			fontWeight={700}
			color={active ? "primary" : "active"}
			to={to}
			{...others}
		>
			{children}
		</Box>
	);
}

interface HeaderProps {
	setMenu?: () => void;
}

function Header(props: HeaderProps) {
	const location = useLocation();
	const { setMenu } = props;
	const isUIPath = location.pathname.indexOf("/ui/") >= 0;
	const isSystemPath = location.pathname.indexOf("/system/") >= 0;

	return (
		<Box
			role="banner"
			as="header"
			zIndex="header"
			position="fixed"
			top={0}
			left={0}
			width="100%"
			height={60}
			borderBottom="1px solid"
			borderColor="border"
			bg="bg"
		>
			<Box
				px={{ _: "scale-2", lg: "scale-4" }}
				height="100%"
				display="flex"
				alignItems="center"
			>
				<Box
					mr="scale-2"
					display={{
						xl: "none",
					}}
				>
					<IconButton aria-label="Toggle menu" onClick={setMenu}>
						<MenuIcon />
					</IconButton>
				</Box>
				<Box
					as={Link}
					to="/"
					display="flex"
					alignItems="center"
					textDecoration="none"
				>
					<Box
						as="img"
						height={{ _: "50px", sm: "60px" }}
						src={logo}
						alt="Poodle UI logo"
					/>
					<Box
						color="#9D623B"
						my="0"
						as="p"
						ml="scale-1"
						fontWeight="700"
						fontSize={{
							base: "16px",
							xl: "24px",
						}}
					>
						Poodle UI
					</Box>
				</Box>
				<Box ml={{ _: "auto", lg: "scale-10" }}>
					<LinkSection active={isUIPath} to="/ui/getting-started/installation">
						UI
					</LinkSection>
					<LinkSection
						ml="scale-2"
						active={isSystemPath}
						to="/system/getting-started/installation/"
					>
						System
					</LinkSection>
				</Box>
			</Box>
		</Box>
	);
}

export default Header;

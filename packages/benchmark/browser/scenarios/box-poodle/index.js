import Box from "@poodle/ui/Box";

export default function SxPropBoxMaterialUI() {
	return (
		<div>
			{new Array(1000).fill().map(() => (
				<div>
					<Box
						width={200}
						height={200}
						borderWidth="3px"
						borderColor="white"
						backgroundColor={["primary", "text", "background"]}
						borderStyle={["dashed", "solid", "dotted"]}
						_hover={{
							backgroundColor: "text",
						}}
					>
						test case
					</Box>
				</div>
			))}
		</div>
	);
}

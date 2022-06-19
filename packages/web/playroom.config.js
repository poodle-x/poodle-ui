module.exports = {
	components: "../ui/playroom/entry.tsx",
	outputPath: "./public/playroom",
	frameComponent: "../ui/playroom/Frame.tsx",
	widths: [375, 768, 1024, 1280, 1440],
	exampleCode: `
	<Box color="red">Box</Box>
  `,
	webpackConfig: () => ({
		module: {
			rules: [
				{
					test: /\.(js|ts|tsx)$/,
					use: {
						loader: "babel-loader",
					},
				},
			],
		},
	}),
};

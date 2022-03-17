module.exports = {
	components: "./src/index.ts",
	outputPath: "./public/playroom",
	frameComponent: "./playroom/Frame.tsx",
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

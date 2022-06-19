module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				modules: process.env.NODE_ENV === "test" ? "commonjs" : false,
				targets: {
					browsers: "defaults",
				},
			},
		],
		"@babel/preset-react",
		"@babel/preset-typescript",
	],
	plugins: [
		[
			"@emotion",
			{
				sourceMap: true,
				autoLabel: "always",
				labelFormat: "[local]",
				cssPropOptimization: true,
			},
		],
		"@babel/plugin-proposal-class-properties",
		"@babel/plugin-proposal-object-rest-spread",
		"@babel/plugin-syntax-dynamic-import",
		"@babel/plugin-proposal-optional-chaining",
		"@babel/plugin-proposal-nullish-coalescing-operator",
	].filter(Boolean),
};

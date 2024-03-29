module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				modules: process.env.NODE_ENV === "test" ? "commonjs" : false,
				loose: true,
				targets: {
					browsers: "defaults",
				},
			},
		],
		"@babel/preset-react",
		"@babel/preset-typescript",
	],
	plugins: [
		"@babel/plugin-proposal-object-rest-spread",
		"@babel/plugin-syntax-dynamic-import",
		"@babel/plugin-proposal-optional-chaining",
		"@babel/plugin-proposal-nullish-coalescing-operator",
		["@babel/plugin-proposal-class-properties", { loose: true }],
		["@babel/plugin-proposal-private-methods", { loose: true }],
		["@babel/plugin-proposal-private-property-in-object", { loose: true }],
	].filter(Boolean),
};

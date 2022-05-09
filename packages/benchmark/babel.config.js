module.exports = function getBabelConfig(api) {
	const useESModules = api.env(["legacy", "modern", "stable", "rollup"]);

	const presets = [
		[
			"@babel/preset-env",
			{
				bugfixes: true,
				browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
				debug: process.env.MUI_BUILD_VERBOSE === "true",
				modules: useESModules ? false : "commonjs",
				shippedProposals: api.env("modern"),
			},
		],
		[
			"@babel/preset-react",
			{
				runtime: "automatic",
			},
		],
		"@babel/preset-typescript",
	];

	const plugins = [
		["babel-plugin-macros"],
		"babel-plugin-optimize-clsx",
		["@babel/plugin-proposal-class-properties", { loose: true }],
		["@babel/plugin-proposal-private-methods", { loose: true }],
		["@babel/plugin-proposal-private-property-in-object", { loose: true }],
		["@babel/plugin-proposal-object-rest-spread", { loose: true }],
		[
			"@babel/plugin-transform-runtime",
			{
				useESModules,
				// any package needs to declare 7.4.4 as a runtime dependency. default is ^7.0.0
				version: "^7.4.4",
			},
		],
		// [
		//   "babel-plugin-transform-react-remove-prop-types",
		//   {
		//     mode: "unsafe-wrap",
		//   },
		// ],
	];

	return {
		assumptions: {
			noDocumentAll: true,
		},
		presets,
		plugins,
		ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
	};
};

module.exports = {
	ignorePatterns: [
		"**/node_modules",
		"**/coverage",
		"**/storybook-static",
		"**/public",
		"**/lib",
		"**/dist",
	],
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "react-hooks"],
	extends: [
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	rules: {
		"no-console": "warn",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ ignoreRestSiblings: true },
		],
	},
};

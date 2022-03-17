// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	coverageDirectory: "coverage",
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(js|jsx|tsx|ts)$": "babel-jest",
	},
	testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).(ts|js)?(x)"],
	moduleFileExtensions: ["js", "ts", "tsx"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

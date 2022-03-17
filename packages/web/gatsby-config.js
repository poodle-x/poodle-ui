// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
	plugins: [
		"gatsby-plugin-typescript",
		"gatsby-plugin-react-helmet",
		// "gatsby-plugin-offline",
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `assets`,
				path: path.join(__dirname, `src`, `assets`),
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: `${__dirname}/src/pages`,
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "docs",
				path: `${__dirname}/src/docs`,
			},
		},
		{
			resolve: "gatsby-plugin-mdx",
			options: {
				gatsbyRemarkPlugins: [
					{
						resolve: "gatsby-remark-autolink-headers",
						options: {
							offsetY: 76,
							icon: "<span>#</span>",
							elements: ["h1", "h2", "h3", "h4"],
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-emotion`,
		},
	],
};

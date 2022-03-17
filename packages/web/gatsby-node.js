/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const webpack = require("webpack");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;
	if (node.internal.type === "Mdx") {
		const value = createFilePath({ node, getNode });
		createNodeField({
			name: "slug",
			node,
			value,
		});
	}
};

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions;
	const result = await graphql(`
		query {
			allMdx {
				edges {
					node {
						id
						fileAbsolutePath
						fields {
							slug
						}
						frontmatter {
							title
							path
						}
						body
						tableOfContents
					}
				}
			}
		}
	`);

	if (result.errors) {
		reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
	}

	const pages = result.data.allMdx.edges;
	pages.forEach(({ node }, index) => {
		createPage({
			path: node.fields.slug,
			component: path.resolve(`./src/layout/Docs.tsx`),
			context: {
				id: node.id,
				frontmatter: node.frontmatter,
				mdxBody: node.body,
				tableOfContents: node.tableOfContents,
			},
		});
	});
};

exports.onCreateBabelConfig = ({ actions }, pluginOptions) => {
	actions.setBabelPreset({
		name: require.resolve(`@emotion/babel-preset-css-prop`),
		options: {
			sourceMap: process.env.NODE_ENV !== `production`,
			autoLabel: process.env.NODE_ENV !== `production` ? "dev-only" : undefined,
			...(pluginOptions ? pluginOptions : {}),
		},
	});
};

exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		plugins: [
			new webpack.ProvidePlugin({
				Buffer: [require.resolve("buffer/"), "Buffer"],
			}),
		],
	});
};

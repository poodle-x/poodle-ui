/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import { renderToString } from "react-dom/server";
import { renderStylesToString } from "@emotion/server";

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
	const html = renderStylesToString(renderToString(bodyComponent));
	replaceBodyHTMLString(html);
};

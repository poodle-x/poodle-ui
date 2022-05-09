import React from "react";
import { render } from "../utils/test";
import GlobalStyles from "./GlobalStyles";

describe("<GlobalStyles />", () => {
	it("should render GlobalStyles correctly", () => {
		const { container } = render(<GlobalStyles />);
		expect(container.firstChild).toMatchSnapshot();
	});
});

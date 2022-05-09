import { render } from "@testing-library/react";
import React from "react";
import createSvgIcon from "./";

describe("createSvgIcon", () => {
	it("should return component", () => {
		const Component = createSvgIcon(
			<rect
				x="1"
				y="1"
				width="20"
				height="11"
				stroke="#282828"
				strokeWidth="2"
			/>,
			"Test",
			{
				defaultSvgProps: {
					clipPath: "1",
				},
			}
		);

		const { container } = render(<Component aria-busy="true" />);

		expect(container.firstChild).toMatchSnapshot();
	});
});

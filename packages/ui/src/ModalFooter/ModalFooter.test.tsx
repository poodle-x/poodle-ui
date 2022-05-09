import React from "react";
import { ThemeConfig } from "../theme";
import { render } from "../utils/test";
import ModalFooter from "./";

describe("<ModalFooter />", () => {
	it("should render ModalFooter correctly", () => {
		const { container } = render(<ModalFooter>ModalFooter</ModalFooter>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<ModalFooter ref={ref}>ModalFooter</ModalFooter>);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<ModalFooter id="id" mt="20px">
				ModalFooter
			</ModalFooter>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			ModalFooter: {
				styles: {
					root: {
						mt: 10,
						letterSpacing: 250,
					},
				},
				variants: {
					custom: {
						root: {
							top: 0,
							textIndent: 1,
						},
					},
				},
			},
		};

		it("should extend styles in global", () => {
			const { container } = render(
				<ModalFooter variant="custom">ModalFooter</ModalFooter>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<ModalFooter variant="custom" themeExtend={themeTest}>
					ModalFooter
				</ModalFooter>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(<ModalFooter>ModalFooter</ModalFooter>, {
				theme: {
					ModalFooter: {
						defaultProps: {
							id: "id",
							className: "hello",
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(<ModalFooter>ModalFooter</ModalFooter>, {
				theme: {
					ModalFooter: {
						overrides: {
							root: {
								mt: 50,
							},
						},
					},
				},
			});
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});

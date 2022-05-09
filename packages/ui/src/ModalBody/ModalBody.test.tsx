import React from "react";
import { ModalContext } from "../Modal";
import { ThemeConfig } from "../theme";
import { render } from "../utils/test";
import ModalBody from "./";

describe("<ModalBody />", () => {
	it("should render ModalBody correctly", () => {
		const { container } = render(<ModalBody>ModalBody</ModalBody>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render ModalBody with auto id", () => {
		const { container } = render(
			<ModalContext.Provider
				value={{
					autoIdDescribedby: "id",
				}}
			>
				<ModalBody>ModalBody</ModalBody>
			</ModalContext.Provider>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<ModalBody ref={ref}>ModalBody</ModalBody>);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<ModalBody id="id" mt="20px">
				ModalBody
			</ModalBody>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			ModalBody: {
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
				<ModalBody variant="custom">ModalBody</ModalBody>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<ModalBody variant="custom" themeExtend={themeTest}>
					ModalBody
				</ModalBody>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(<ModalBody>ModalBody</ModalBody>, {
				theme: {
					ModalBody: {
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
			const { container } = render(<ModalBody>ModalBody</ModalBody>, {
				theme: {
					ModalBody: {
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

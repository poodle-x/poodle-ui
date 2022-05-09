import React from "react";
import { ModalContext } from "../Modal";
import { ThemeConfig } from "../theme";
import { render } from "../utils/test";
import ModalHeader from "./";

describe("<ModalHeader />", () => {
	it("should render ModalHeader correctly", () => {
		const { container } = render(<ModalHeader>ModalHeader</ModalHeader>);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render ModalHeader with auto id correctly", () => {
		const { container } = render(
			<ModalContext.Provider
				value={{
					autoIdLabelledby: "id",
				}}
			>
				<ModalHeader>ModalHeader</ModalHeader>
			</ModalContext.Provider>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render ModalHeader with icon correctly", () => {
		const { container } = render(
			<ModalHeader icon={<i>Icon</i>}>ModalHeader</ModalHeader>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render ModalHeader with close correctly", () => {
		const { container } = render(
			<ModalHeader withClose={true}>ModalHeader</ModalHeader>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<ModalHeader ref={ref}>ModalHeader</ModalHeader>);
		expect(ref.current).toMatchSnapshot();
	});

	it("should render Box props correctly", () => {
		const { container } = render(
			<ModalHeader
				id="id"
				mt="20px"
				closeProps={{ pl: "20px" }}
				iconProps={{ pl: "20px" }}
				withClose={true}
				icon={<i>Icon</i>}
			>
				ModalHeader
			</ModalHeader>
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			ModalHeader: {
				styles: {
					root: {
						mt: 10,
						letterSpacing: 250,
					},
					icon: {
						mt: 11,
						letterSpacing: 251,
					},
					close: {
						mt: 12,
						letterSpacing: 252,
					},
					content: {
						mt: 13,
						letterSpacing: 253,
					},
				},
				variants: {
					custom: {
						root: {
							top: 0,
							textIndent: 1,
						},
						icon: {
							top: 1,
							textIndent: 2,
						},
						close: {
							top: 2,
							textIndent: 3,
						},
						content: {
							top: 3,
							textIndent: 4,
						},
					},
				},
			},
		};

		it("should extend styles in global", () => {
			const { container } = render(
				<ModalHeader variant="custom" withClose={true} icon={<i>Icon</i>}>
					ModalHeader
				</ModalHeader>,
				{
					theme: themeTest,
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { container } = render(
				<ModalHeader
					variant="custom"
					themeExtend={themeTest}
					withClose={true}
					icon={<i>Icon</i>}
				>
					ModalHeader
				</ModalHeader>
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { container } = render(
				<ModalHeader withClose={true} icon={<i>Icon</i>}>
					ModalHeader
				</ModalHeader>,
				{
					theme: {
						ModalHeader: {
							defaultProps: {
								id: "id",
								className: "hello",
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { container } = render(
				<ModalHeader withClose={true} icon={<i>Icon</i>}>
					ModalHeader
				</ModalHeader>,
				{
					theme: {
						ModalHeader: {
							overrides: {
								root: {
									mt: 50,
								},
								icon: {
									mt: 51,
								},
								close: {
									mt: 52,
								},
								content: {
									mt: 53,
								},
							},
						},
					},
				}
			);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});

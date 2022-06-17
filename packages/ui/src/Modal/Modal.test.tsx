import { axe } from "jest-axe";
import React from "react";
import Box from "../Box";
import { Button } from "../Button";
import { ModalBody } from "../ModalBody";
import { ModalFooter } from "../ModalFooter";
import { ModalHeader } from "../ModalHeader";
import { ThemeConfig } from "../theme";
import { fireEvent, render, userEvent } from "../utils/test";
import Modal from "./";

describe("<Modal />", () => {
	it("should render Modal correctly", () => {
		const { getByTestId } = render(
			<Modal data-testid="test" isOpen={true}>
				<button>Modal</button>
			</Modal>
		);
		expect(getByTestId("test")).toMatchSnapshot();
	});

	it("should render Modal withAutoId correctly", () => {
		const { getByTestId } = render(
			<Modal data-testid="test" isOpen={true} withAutoId={true}>
				<button>Modal</button>
			</Modal>
		);
		expect(getByTestId("test")).toMatchSnapshot();
	});

	it("should get callback request close with escape key", () => {
		const mockCallback = jest.fn();
		const mockInnerKeyDown = jest.fn();

		const { getByRole } = render(
			<Modal
				data-testid="test"
				onRequestClose={mockCallback}
				isOpen={true}
				withAutoId={true}
				innerProps={{
					onKeyDown: mockInnerKeyDown,
				}}
			>
				<button>Modal</button>
			</Modal>
		);
		const dialog = getByRole("dialog");

		fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });

		expect(mockCallback).toHaveBeenCalledWith("esc");
		expect(mockInnerKeyDown).toHaveBeenCalled();
	});

	it("should get call request close with click on modal backdrop", async () => {
		const mockCallback = jest.fn();
		const mockInnerClick = jest.fn();
		const user = userEvent.setup();
		const { getByTestId } = render(
			<Modal
				data-testid="1"
				innerProps={{
					"data-testid": "test",
					onClick: mockInnerClick,
				}}
				onRequestClose={mockCallback}
				isOpen={true}
				withAutoId={true}
			>
				<button>Modal</button>
			</Modal>
		);
		const inner = getByTestId("test");

		await user.click(inner);

		expect(mockCallback).toHaveBeenCalledWith("outside");
		expect(mockInnerClick).toHaveBeenCalled();
	});

	it("ref should work", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(
			<Modal isOpen={true} ref={ref}>
				<button>Modal</button>
			</Modal>
		);
		expect(ref.current).toMatchSnapshot();
	});

	it("should pass axe", async () => {
		const { getByRole } = render(
			<Modal isOpen={true} withAutoId={true}>
				<ModalHeader withClose={true}>Modal title</ModalHeader>
				<ModalBody>
					The selected document <Box as="strong">“price.docx”</Box> will be
					sent.
				</ModalBody>
				<ModalFooter>
					<Button variant="fill">Send</Button>
					<Button ml="scale-2">Cancel</Button>
				</ModalFooter>
			</Modal>
		);
		const results = await axe(getByRole("dialog"));
		expect(results).toHaveNoViolations();
	});

	it("should render Box props correctly", () => {
		const { getByTestId } = render(
			<Modal
				isOpen={true}
				data-testid="test"
				id="id"
				mt="20px"
				overlayProps={{ ml: 20 }}
				innerProps={{ pl: 20 }}
				containerProps={{ pl: 20 }}
				modalProps={{ fontSize: "20px" }}
			>
				<button>Modal</button>
			</Modal>
		);
		expect(getByTestId("test")).toMatchSnapshot();
	});

	describe("theming", () => {
		const themeTest: ThemeConfig = {
			mode: "mode",
			Modal: {
				styles: {
					root: {
						mt: 10,
						letterSpacing: 250,
					},
					modal: {
						mt: 11,
						letterSpacing: 251,
					},
					inner: {
						mt: 12,
						letterSpacing: 252,
					},
					container: {
						mt: 13,
						letterSpacing: 254,
					},
					overlay: {
						mt: 14,
						letterSpacing: 255,
					},
				},
				variants: {
					custom: {
						root: {
							top: 0,
							textIndent: 1,
						},
						modal: {
							top: 1,
							textIndent: 2,
						},
						overlay: {
							top: 2,
							textIndent: 3,
						},
						container: {
							top: 3,
							textIndent: 4,
						},
						inner: {
							top: 4,
							textIndent: 5,
						},
					},
				},
			},
		};

		it("should extend styles in global", () => {
			const { getByTestId } = render(
				<Modal data-testid="test" isOpen={true} variant="custom">
					<button>Modal</button>
				</Modal>,
				{
					theme: themeTest,
				}
			);
			expect(getByTestId("test")).toMatchSnapshot();
		});

		it("should extend styles in local", () => {
			const { getByTestId } = render(
				<Modal
					data-testid="test"
					isOpen={true}
					variant="custom"
					themeExtend={themeTest}
				>
					<button>Modal</button>
				</Modal>
			);
			expect(getByTestId("test")).toMatchSnapshot();
		});

		it("should render with default props correctly", () => {
			const { getByTestId } = render(
				<Modal data-testid="test" isOpen={true}>
					<button>Modal</button>
				</Modal>,
				{
					theme: {
						Modal: {
							defaultProps: {
								id: "id",
								className: "hello",
							},
						},
					},
				}
			);
			expect(getByTestId("test")).toMatchSnapshot();
		});

		it("should override styles", () => {
			const { getByTestId } = render(
				<Modal data-testid="test" isOpen={true}>
					<button>Modal</button>
				</Modal>,
				{
					theme: {
						Modal: {
							overrides: {
								root: {
									mt: 50,
								},
							},
						},
					},
				}
			);
			expect(getByTestId("test")).toMatchSnapshot();
		});
	});
});

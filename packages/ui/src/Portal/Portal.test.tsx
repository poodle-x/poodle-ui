import React from "react";
import Portal, { PortalContext } from "./Portal";
import { render } from "../utils/test";

describe("<Portal />", () => {
	it("Should not render anything", () => {
		const { queryByText } = render(
			<Portal>
				<h1>Hello</h1>
			</Portal>,
			{
				withProvider: false,
			}
		);
		expect(queryByText("Hello")).not.toBeInTheDocument();
	});

	it("Should render children and none when unmount", () => {
		const { queryByText, rerender } = render(
			<Portal mount={true}>
				<h1>Hello</h1>
			</Portal>,
			{
				withProvider: false,
			}
		);
		expect(queryByText("Hello")).toBeInTheDocument();
		expect(
			document.body.querySelector("*[data-portal='poodle-ui']")
		).toBeInTheDocument();

		rerender(
			<Portal mount={false}>
				<h1>Hello</h1>
			</Portal>,
			{
				withProvider: false,
			}
		);

		expect(queryByText("Hello")).not.toBeInTheDocument();
		expect(
			document.body.querySelector("*[data-portal='poodle-ui']")
		).not.toBeInTheDocument();
	});

	it("Ref should work", () => {
		const mockRef: React.MutableRefObject<HTMLElement | null> = {
			current: null,
		};

		const cb = (instance: HTMLElement | null) => {
			if (mockRef) {
				mockRef.current = instance;
			}
		};

		const { rerender } = render(
			<Portal mount={true} ref={cb}>
				<h1>Hello</h1>
			</Portal>,
			{
				withProvider: false,
			}
		);

		expect(mockRef.current).not.toBeNull();

		rerender(
			<Portal mount={false} ref={cb}>
				<h1>Hello</h1>
			</Portal>
		);

		expect(mockRef.current).toBeNull();
	});

	it("Should mount on default element", () => {
		const mockRef: React.MutableRefObject<HTMLElement | null> = {
			current: null,
		};
		const cb = (instance: HTMLElement | null) => {
			if (mockRef) {
				mockRef.current = instance;
			}
		};
		const ContainerTest = ({
			container,
			mount,
		}: {
			container?: HTMLElement;
			mount: boolean;
		}) => {
			return (
				<div>
					<main data-testid="main" ref={cb} />
					<Portal mount={mount} mountOn={container} portalElementTag="span">
						<h1>Hello</h1>
					</Portal>
				</div>
			);
		};
		const { getByTestId, queryByText, rerender } = render(
			<ContainerTest mount={true} />,
			{
				withProvider: false,
			}
		);

		expect(queryByText("Hello")?.parentNode?.nodeName).toEqual("SPAN");

		rerender(
			<ContainerTest mount={false} container={mockRef.current || undefined} />,
			{
				withProvider: false,
			}
		);
		expect(getByTestId("main")).toBeInTheDocument();
		expect(queryByText("Hello")).toEqual(null);
	});

	it("Should mount on custom container", () => {
		const mockRef: React.MutableRefObject<HTMLElement | null> = {
			current: null,
		};
		const cb = (instance: HTMLElement | null) => {
			if (mockRef) {
				mockRef.current = instance;
			}
		};
		const ContainerTest = ({
			container,
			mount,
		}: {
			container?: HTMLElement;
			mount: boolean;
		}) => {
			return (
				<div>
					<main data-testid="main" ref={cb} />
					<Portal mount={mount} mountOn={container} portalElementTag="span">
						<h1>Hello</h1>
					</Portal>
				</div>
			);
		};

		const { getByTestId, queryByText, rerender } = render(
			<ContainerTest mount={true} container={mockRef.current || undefined} />,
			{
				withProvider: false,
			}
		);

		expect(queryByText("Hello")?.parentNode?.nodeName).toEqual("SPAN");

		rerender(
			<ContainerTest mount={false} container={mockRef.current || undefined} />,
			{
				withProvider: false,
			}
		);

		expect(getByTestId("main")).toBeInTheDocument();

		expect(queryByText("Hello")).toEqual(null);
	});

	it("Should mount on context", () => {
		const ContainerTest = ({
			container,
			mount,
		}: {
			container?: HTMLElement;
			mount: boolean;
		}) => {
			const [p, setp] = React.useState<null | HTMLElement>(null);

			React.useLayoutEffect(() => {
				const newPortal = document.createElement("section");
				newPortal.setAttribute("data-portal", "poodle-ui");
				document.getElementById("container")?.appendChild(newPortal);
				setp(newPortal);
			}, []);

			return (
				<div id="container">
					<PortalContext.Provider
						value={{
							defaultMount: p,
						}}
					>
						<Portal mount={mount} mountOn={container}>
							<h1>Hello</h1>
						</Portal>
					</PortalContext.Provider>
				</div>
			);
		};

		const { queryByText } = render(<ContainerTest mount={true} />, {
			withProvider: false,
		});

		expect(queryByText("Hello")?.parentNode?.nodeName).toEqual("SECTION");
	});
});

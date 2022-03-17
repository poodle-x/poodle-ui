import React from "react";
import { ThemeConfig, useTheme, createTheme } from "../theme";
import { render } from "../utils/test";
import ThemeProvider from "./ThemeProvider";
import { PortalContext } from "../Portal";

const TestTheme: React.FC<any> = (props: { keys?: string[] }) => {
	const { keys } = props;
	const { theme } = useTheme();
	if (keys) {
		return JSON.stringify(
			keys.map((k) => {
				return JSON.stringify((theme as any)[k]);
			})
		);
	}

	return JSON.stringify(theme) as any;
};

describe("<ThemeProvider />", () => {
	it("should render children correctly", () => {
		const { container } = render(<ThemeProvider>Hello</ThemeProvider>, {
			withProvider: false,
		});
		expect(container.firstChild).toMatchSnapshot();
	});

	it("disablePortalContext prop should work ", () => {
		function Test() {
			const context = React.useContext(PortalContext);
			return <div>{context ? "With context" : "No context"}</div>;
		}

		const { queryByText, rerender } = render(
			<ThemeProvider>
				<Test />
			</ThemeProvider>,
			{
				withProvider: false,
			}
		);

		expect(queryByText("With context")).toBeInTheDocument();

		expect(
			document.body.querySelector('*[data-portal="poodle-ui"]')
		).toBeInTheDocument();

		rerender(
			<ThemeProvider disablePortalContext={true}>
				<Test />
			</ThemeProvider>,
			{
				withProvider: false,
			}
		);

		expect(queryByText("No context")).toBeInTheDocument();

		expect(
			document.body.querySelector('*[data-portal="poodle-ui"]')
		).not.toBeInTheDocument();
	});

	it("should render default theme correctly", () => {
		const { container } = render(
			<ThemeProvider>
				<TestTheme />
			</ThemeProvider>,
			{
				withProvider: false,
			}
		);
		expect(container.firstChild?.textContent).toEqual(
			JSON.stringify(createTheme())
		);
	});

	it("should extend theme correctly", () => {
		const { container } = render(
			<ThemeProvider
				theme={
					{
						direction: "rtl",
						spacing: {
							scale: 100,
						},
					} as ThemeConfig
				}
			>
				<TestTheme keys={["spacing", "direction"]} />
			</ThemeProvider>,
			{
				withProvider: false,
			}
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should render theme correctly with noDefaultTheme option", () => {
		const { container } = render(
			<ThemeProvider theme={{ test: "abc" } as any} noDefaultTheme={true}>
				<TestTheme />
			</ThemeProvider>,
			{
				withProvider: false,
			}
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it("should fallback default theme with noDefaultTheme option", () => {
		const resultDefault = render(
			<ThemeProvider>
				<TestTheme />
			</ThemeProvider>,
			{
				withProvider: false,
			}
		);

		const resultFallback = render(
			<ThemeProvider noDefaultTheme={true}>
				<TestTheme />
			</ThemeProvider>,
			{
				withProvider: false,
			}
		);

		expect(resultDefault.container.firstChild).toEqual(
			resultFallback.container.firstChild
		);
	});
});

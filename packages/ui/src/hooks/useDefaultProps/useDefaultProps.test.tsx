import React from "react";
import { ThemeConfig } from "../../theme";
import ThemeProvider from "../../ThemeProvider";
import { renderHook } from "../../utils/test";
import useDefaultProps from "./useDefaultProps";

type Props = {
	a?: number;
	b?: string;
	theme?: ThemeConfig;
	themeExtend?: ThemeConfig;
};

interface Result {
	props: Props;
	isLocalTheme?: boolean;
}

const Wrapper = ({ children }: any) => {
	return <ThemeProvider>{children}</ThemeProvider>;
};

describe("useDefaultProps", () => {
	it("should return props", () => {
		const { result, rerender } = renderHook<Props, Result>(
			(props) => {
				return useDefaultProps<Props>({ ...props });
			},
			{
				wrapper: Wrapper,
			}
		);

		rerender({
			a: 20,
		});

		expect(result.current.props.a).toEqual(20);
		expect(result.current.isLocalTheme).toEqual(false);
	});

	it("should return default props", async () => {
		const { result, rerender } = renderHook<Props, Result>(
			(props) => {
				return useDefaultProps<Props>(
					{ ...props },
					{
						themeDefaultProps: () => {
							return {
								a: 10,
							};
						},
					}
				);
			},
			{
				wrapper: Wrapper,
			}
		);

		expect(result.current.props.a).toEqual(10);
		expect(result.current.isLocalTheme).toEqual(false);

		rerender({
			a: 20,
		});

		expect(result.current.props.a).toEqual(20);
		expect(result.current.isLocalTheme).toEqual(false);
	});

	it("should extend theme", () => {
		const { result } = renderHook<Props, Result>(
			(props) => {
				return useDefaultProps<Props>(
					{
						themeExtend: {
							direction: "rtl",
						} as ThemeConfig,
						...props,
					},
					{
						themeDefaultProps: () => {
							return {};
						},
					}
				);
			},
			{
				wrapper: Wrapper,
			}
		);

		expect(result.current.props.theme?.direction).toEqual("rtl");
		expect(result.current.isLocalTheme).toEqual(true);
	});

	it("should override theme", () => {
		const { result } = renderHook<Props, Result>(
			(props) => {
				return useDefaultProps<Props>(
					{
						theme: {
							mode: "dark",
						} as ThemeConfig,
						...props,
					},
					{
						themeDefaultProps: () => {
							return {};
						},
					}
				);
			},
			{
				wrapper: Wrapper,
			}
		);

		expect(result.current.props.theme).toEqual({ mode: "dark" });
		expect(result.current.isLocalTheme).toEqual(true);
	});
});

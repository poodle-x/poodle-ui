import React from "react";
import { ThemeConfig } from "../theme";
import ThemeProvider from "../ThemeProvider";
import { renderHook } from "./test";
import useDefaultProps from "./useDefaultProps";

type Props = {
	a?: number;
	b?: string;
	theme?: ThemeConfig;
	themeExtend?: ThemeConfig;
};

const Wrapper = ({ children }: any) => {
	return <ThemeProvider>{children}</ThemeProvider>;
};

describe("useDefaultProps", () => {
	it("should return props", () => {
		const { result, rerender } = renderHook<Props, Props>(
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

		expect(result.current.a).toEqual(20);
	});

	it("should return default props", async () => {
		const { result, rerender } = renderHook<Props, Props>(
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

		expect(result.current.a).toEqual(10);

		rerender({
			a: 20,
		});

		expect(result.current.a).toEqual(20);
	});

	it("should extend theme", () => {
		const { result } = renderHook<Props, Props>(
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

		expect(result.current.theme?.direction).toEqual("rtl");
	});

	it("should override theme", () => {
		const { result } = renderHook<Props, Props>(
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

		expect(result.current.theme).toEqual({ mode: "dark" });
	});
});

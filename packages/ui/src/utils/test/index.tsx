import {
	act,
	fireEvent,
	render as testRender,
	RenderResult as RR,
	waitFor,
} from "@testing-library/react";
import { act as hookAct, renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import React from "react";
import { createTheme, ThemeConfig } from "../../theme";
import Provider from "../../ThemeProvider";

export type RenderResult = RR & {
	rerender: (
		ui: React.ReactElement,
		options?: {
			withProvider?: boolean;
			theme?: ThemeConfig;
		}
	) => void;
};

// function rerender(rr: RR) {
// 	return (
// 		ui: React.ReactElement,
// 		options?: {
// 			withProvider?: boolean;
// 			theme?: ThemeConfig;
// 		}
// 	) => {
// 		const { theme, withProvider } = options || {};
//
// 		if (!withProvider) {
// 			rr.rerender(ui);
// 		}
//
// 		rr.rerender(
// 			<Provider theme={createTheme(createTheme(theme))}>{ui}</Provider>
// 		);
// 	};
// }

function render(
	ui: React.ReactElement,
	options?: {
		withProvider?: boolean;
		theme?: ThemeConfig;
	}
) {
	let rr: RR;

	const { theme, withProvider = true } = {
		...options,
	};

	if (!withProvider) {
		rr = testRender(ui);
	} else {
		rr = testRender(<Provider theme={createTheme(theme)}>{ui}</Provider>);
	}

	const result: RenderResult = {
		...rr,
		rerender: (ui: React.ReactElement) => {
			if (!withProvider) {
				testRender(ui, { container: rr.container });
			} else {
				testRender(<Provider theme={createTheme(theme)}>{ui}</Provider>, {
					container: rr.container,
				});
			}
		},
	};

	return result;
}

export { render, act, fireEvent, waitFor, renderHook, userEvent, hookAct };

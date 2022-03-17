import { pseudosSystem } from "./pseudos";
import { systemPropTestCases, SystemTestCase } from "./utils/testHelper";
import { compose } from "./system";
import { colorsSystem } from "./colors";

describe("pseudos system", function () {
	describe("pseudos props", function () {
		const testCases: SystemTestCase[] = [
			{
				name: "_active props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_active: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_checked props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_checked: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_default props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_default: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_defined props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_defined: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_disabled props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_disabled: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_enabled props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_enabled: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_firstChild props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_firstChild: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_firstOfType props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_firstOfType: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_focus props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_focus: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_focusWithin props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_focusWithin: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_hover props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_hover: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_indeterminate props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_indeterminate: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_invalid props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_invalid: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_lang props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								en: {
									color: ["red", "blue"],
									fontFamily: "en",
								},
								zh: {
									color: ["cyan", "purple"],
									fontFamily: "cn",
								},
							},
						],
					],
				},
			},
			{
				name: "_lastChild props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_lastChild: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_lastOfType props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_lastOfType: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
			{
				name: "_lastOfType props",
				snapshot: true,
				data: {
					steps: [
						[
							{
								_lastOfType: {
									color: ["primary", "secondary"],
								},
							},
						],
					],
				},
			},
		];

		systemPropTestCases({
			testCases,
			systemConfigs: compose(pseudosSystem, colorsSystem),
			theme: {
				breakpoints: {
					scale: ["sm", "md", "lg", "xl"],
					sets: {
						sm: 768,
						md: 1024,
						lg: 1280,
						xl: 1600,
					},
				},
				colors: {
					sets: {
						primary: "red",
						secondary: "yellow",
					},
					modes: {
						dark: {
							primary: "cyan",
						},
					},
				},
			},
		});
	});
});

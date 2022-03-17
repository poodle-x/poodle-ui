import React from "react";
import {
	ThemeValue,
	SystemThemeConfig,
	BreakpointsThemeConfig,
	SpacingThemeConfig,
	ColorsThemeConfig,
	FontsThemeConfig,
	BordersThemeConfig,
	ShadowThemeConfig,
	LayoutsThemeConfig,
} from "@poodle/system";

import { CSSObjectSystem, Stylesheet } from "../styled";
import { BoxThemeConfig } from "../Box";
import { ButtonThemeConfig } from "../Button";
import { ColumnsThemeConfig } from "../Columns";
import { ColumnThemeConfig } from "../Column";
import { ContainerThemeConfig } from "../Container";
import { TableThemeConfig } from "../Table";
import { TableHeadThemeConfig } from "../TableHead";
import { TableBodyThemeConfig } from "../TableBody";
import { TableRowThemeConfig } from "../TableRow";
import { TableCellThemeConfig } from "../TableCell";
import { VisuallyHiddenThemeConfig } from "../VisuallyHidden";
import { CheckControlThemeConfig } from "../CheckControl";
import { CheckboxThemeConfig } from "../Checkbox";
import { RadioThemeConfig } from "../Radio";
import { InputThemeConfig } from "../Input";
import { InputAdornmentThemeConfig } from "../InputAdornment";
import { IconButtonThemeConfig } from "../IconButton";
import { ModalThemeConfig } from "../Modal";
import { ModalHeaderThemeConfig } from "../ModalHeader";
import { ModalBodyThemeConfig } from "../ModalBody";
import { ModalFooterThemeConfig } from "../ModalFooter";
import { SelectThemeConfig } from "../Select";
import { TabsThemeConfig } from "../Tabs";
import { TabThemeConfig } from "../Tab";
import { TabListThemeConfig } from "../TabList";
import { TabPanelThemeConfig } from "../TabPanel";

export { Stylesheet };

export { useTheme } from "./useTheme";

export type DirectionThemeConfig = "rtl" | "ltr";

export interface GlobalThemeConfig {
	styles?: ThemeValue<CSSObjectSystem>;
}

export type IconType = React.FC<
	React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
		React.RefAttributes<SVGSVGElement>
>;

export interface BaseIcons {
	RadioButton?: IconType;
	RadioCheckedButton?: IconType;
	CheckboxButton?: IconType;
	CheckboxCheckedButton?: IconType;
	CheckboxIndeterminateButton?: IconType;
	ArrowDown?: IconType;
}

export interface ThemeConfig extends SystemThemeConfig {
	global?: GlobalThemeConfig;
	direction?: ThemeValue<DirectionThemeConfig>;
	baseIcons?: BaseIcons;
	Box?: BoxThemeConfig;
	Button?: ButtonThemeConfig;
	Columns?: ColumnsThemeConfig;
	Column?: ColumnThemeConfig;
	Container?: ContainerThemeConfig;
	Table?: TableThemeConfig;
	TableHead?: TableHeadThemeConfig;
	TableBody?: TableBodyThemeConfig;
	TableRow?: TableRowThemeConfig;
	TableCell?: TableCellThemeConfig;
	VisuallyHidden?: VisuallyHiddenThemeConfig;
	CheckControl?: CheckControlThemeConfig;
	Checkbox?: CheckboxThemeConfig;
	Radio?: RadioThemeConfig;
	Input?: InputThemeConfig;
	InputAdornment?: InputAdornmentThemeConfig;
	IconButton?: IconButtonThemeConfig;
	Modal?: ModalThemeConfig;
	ModalHeader?: ModalHeaderThemeConfig;
	ModalBody?: ModalBodyThemeConfig;
	ModalFooter?: ModalFooterThemeConfig;
	Select?: SelectThemeConfig;
	Tabs?: TabsThemeConfig;
	Tab?: TabThemeConfig;
	TabList?: TabListThemeConfig;
	TabPanel?: TabPanelThemeConfig;
}

export const defaultGlobal = (
	overrideTheme: ThemeConfig
): GlobalThemeConfig => {
	return {
		styles: overrideTheme.global?.styles,
	};
};

export const defaultBreakpoints = (
	overrideTheme: ThemeConfig
): BreakpointsThemeConfig => {
	return {
		scale: ["sm", "md", "lg", "xl"],
		...overrideTheme.breakpoints,
		sets: {
			sm: 576,
			md: 768,
			lg: 992,
			xl: 1200,
			xxl: 1400,
			...overrideTheme.breakpoints?.sets,
		},
	};
};

export const defaultSpacing = (
	overrideTheme: ThemeConfig
): SpacingThemeConfig => {
	return {
		scale: 4,
		...overrideTheme.spacing,
		sets: {
			s: 4,
			m: 8,
			l: 16,
			...overrideTheme.spacing?.sets,
		},
	};
};

export const defaultFonts = (overrideTheme: ThemeConfig): FontsThemeConfig => {
	return {
		scale: "1rem",
		...overrideTheme.fonts,
		base: {
			fontFamily:
				'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
			fontStyle: "normal",
			fontWeight: "normal",
			lineHeight: "125%",
			fontSize: "1rem",
			...overrideTheme.fonts?.base,
		},
		weights: {
			normal: 400,
			semibold: 600,
			bold: 700,
			...overrideTheme.fonts?.weights,
		},
		sets: {
			input: {
				fontSize: "1rem",
				fontWeight: "normal",
				lineHeight: "125%",
			},
			button: {
				fontSize: "1rem",
				fontWeight: "bold",
				lineHeight: "150%",
			},
			label: {
				fontStyle: "normal",
				fontWeight: "bold",
				fontSize: "0.875rem",
				lineHeight: "110%",
			},
			helper: {
				fontStyle: "normal",
				fontWeight: "normal",
				fontSize: "0.875rem",
				lineHeight: "110%",
			},
			checkControlLabelMedium: {
				fontStyle: "normal",
				fontWeight: "normal",
				fontSize: "1rem",
				lineHeight: "110%",
			},
			checkControlLabelSmall: {
				fontStyle: "normal",
				fontWeight: "normal",
				fontSize: "0.875rem",
				lineHeight: "110%",
			},
			checkControlLabelLarge: {
				fontStyle: "normal",
				fontWeight: "normal",
				fontSize: "1.125rem",
				lineHeight: "110%",
			},
			modalTitle: {
				fontStyle: "normal",
				fontWeight: "bold",
				fontSize: "1.5rem",
				lineHeight: "133.33%",
			},
			...overrideTheme.fonts?.sets,
		},
	};
};

export const defaultColor = (overrideTheme: ThemeConfig): ColorsThemeConfig => {
	return {
		modes: {
			...overrideTheme.colors?.modes,
		},
		sets: {
			text: "#282828",
			disabledText: "#A6A6A6",

			primary: {
				light: "#D1EBFF",
				base: "#00478A",
				dark: "#003A70",
				textOnLight: "#00478A",
				textOnBase: "#fff",
				textOnDark: "#fff",
			},

			negative: {
				base: "#AF1308",
				dark: "#8D1007",
				light: "#FCF3F3",
				textOnLight: "#AF1308",
				textOnBase: "#fff",
				textOnDark: "#fff",
			},

			positive: {
				base: "#006122",
				dark: "#004D1B",
				light: "#E5FFEE",
				textOnLight: "#006122",
				textOnBase: "#fff",
				textOnDark: "#fff",
			},

			warn: {
				base: "#FFBB33",
				dark: "#FAAB00",
				light: "#FFF1DB",
				textOnLight: "#282828",
				textOnBase: "#282828",
				textOnDark: "#282828",
			},

			bg: {
				base: "#F8F8F8",
				100: "#E0E0E0",
				textOn100: "#282828",
				200: "#CCCCCC",
				textOn200: "#282828",
			},

			modal: {
				base: "#F8F8F8",
				footer: "#F0F0F0",
			},

			border: {
				base: "#CCCCCC",
			},

			...overrideTheme.colors?.sets,
		},
	};
};

export const defaultBorder = (
	overrideTheme: ThemeConfig
): BordersThemeConfig => {
	return {
		sets: {
			base: {
				style: "solid",
				width: "1px",
				color: "border",
			},
			...overrideTheme?.borders?.sets,
		},
		radius: {
			base: "4px",
			...overrideTheme?.borders?.radius,
		},
	};
};

export const defaultBoxShadow = (
	overrideTheme: ThemeConfig
): ShadowThemeConfig => {
	return {
		boxShadowSets: {
			lv1: "1px 2px 2px -1px rgba(0,0,0,0.4)",
			lv2: "2px 2px 5px 0px rgba(0,0,0,0.4)",
			lv3: "4px 4px 5px 0px rgba(0,0,0,0.4)",
			...overrideTheme?.shadows?.boxShadowSets,
		},
	};
};

export const defaultLayouts = (
	overrideTheme: ThemeConfig
): LayoutsThemeConfig => {
	return {
		zIndices: {
			modal: 2000,
			...overrideTheme?.layouts?.zIndices,
		},
	};
};

export function createTheme(overrideTheme: ThemeConfig = {}): ThemeConfig {
	return {
		direction: "ltr",
		...overrideTheme,
		global: defaultGlobal(overrideTheme),
		spacing: defaultSpacing(overrideTheme),
		breakpoints: defaultBreakpoints(overrideTheme),
		colors: defaultColor(overrideTheme),
		fonts: defaultFonts(overrideTheme),
		borders: defaultBorder(overrideTheme),
		shadows: defaultBoxShadow(overrideTheme),
		layouts: defaultLayouts(overrideTheme),
	};
}

export type StylesConfig<T extends string> = {
	[K in T]: ThemeValue<CSSObjectSystem>;
};

export interface StandardComponentProps {
	variant?: string;
	themeExtend?: ThemeConfig;
	theme?: ThemeConfig;
	sizeStyle?: string;
	colorStyle?: string;
}

export interface StandardThemeConfig<
	T extends string,
	Props extends { [key: string]: any }
> {
	defaultProps?: Partial<Props>;
	styles?: Partial<StylesConfig<T>>;
	variants?: {
		[key: string]: Partial<StylesConfig<T>>;
	};
	sizes?: {
		[key: string]: Partial<StylesConfig<T>>;
	};
	colorStyles?: {
		[key: string]: Partial<StylesConfig<T>>;
	};
	modes?: {
		[key: string]: {
			styles?: Partial<StylesConfig<T>>;
			variants?: {
				[key: string]: Partial<StylesConfig<T>>;
			};
			sizes?: {
				[key: string]: Partial<StylesConfig<T>>;
			};
			colorStyles?: {
				[key: string]: Partial<StylesConfig<T>>;
			};
		};
	};
	overrides?: Partial<StylesConfig<T>>;
	overrideClasses?: Partial<
		{
			[K in T]: boolean | string;
		}
	>;
}

export * from "./system";

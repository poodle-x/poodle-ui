import { createCSSSystemStandard } from "../theme";
import { CSSSystem } from "../styled";
import { TableProps } from "./Table";
import { CSSObjectSystem } from "../styled";
import { TableStyleKeys } from "./";

export function Root(props: TableProps): CSSSystem {
	const { theme, withBorder, withHover } = props;

	const borderStyles: CSSObjectSystem = withBorder
		? {
				borderRadius: "base",
				border: "1px solid",
				borderColor: "border",

				"tr:last-child > td": {
					borderBottom: "0",
				},
		  }
		: {};

	const bgStyles: CSSObjectSystem = withHover
		? {
				"tbody > tr:hover": {
					bg: "bg.100",
					color: "bg.textOn100",
				},

				"tbody > tr[data-selected='true']": {
					bg: "primary.light",
					color: "primary.textOnLight",
				},
		  }
		: {};

	return createCSSSystemStandard<TableStyleKeys>({
		key: "root",
		config: theme?.Table,
		props,
		base: [borderStyles, bgStyles],
	});
}

export function Table(props: TableProps): CSSSystem {
	const { theme } = props;

	return createCSSSystemStandard<TableStyleKeys>({
		key: "table",
		config: theme?.Table,
		props,
		base: [
			{
				width: "100%",
				borderSpacing: 0,
				borderCollapse: "collapse",
				textAlign: "left",
			},
		],
	});
}

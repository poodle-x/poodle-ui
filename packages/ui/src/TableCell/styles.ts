import { createCSSSystemStandard } from "../theme";
import { CSSSystem, CSSObjectSystem } from "../styled";
import { TableCellProps } from "./TableCell";
import { TableContextValue, TableLevelContextValue } from "../Table";
import { TableCellStyleKeys } from "./";

export function Root(
	props: TableCellProps & TableContextValue & TableLevelContextValue
): CSSSystem {
	const { theme, level, withDivider, sizeStyle = "" } = props;

	const levelTextStyles: CSSObjectSystem =
		level && level === "head"
			? {
					fontWeight: "bold",
			  }
			: {};

	const borderStyles: CSSObjectSystem =
		(level && level === "head") || withDivider
			? {
					borderBottom: "1px solid",
					borderBottomColor: "border",
			  }
			: {};

	let sizeStyles: CSSObjectSystem = {};

	switch (sizeStyle) {
		case "s": {
			sizeStyles = {
				py: "scale-2",
				px: "scale-4",
			};
			break;
		}
		case "l": {
			sizeStyles = {
				py: "scale-6",
				px: "scale-4",
			};
			break;
		}
		case "m":
		default: {
			sizeStyles = {
				py: "scale-4",
				px: "scale-4",
			};
		}
	}

	return createCSSSystemStandard<TableCellStyleKeys>({
		key: "root",
		config: theme?.TableCell,
		props,
		base: [borderStyles, levelTextStyles, sizeStyles],
	});
}

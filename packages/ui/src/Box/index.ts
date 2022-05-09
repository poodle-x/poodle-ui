import { StandardThemeConfig } from "../theme";
import { Box, BoxProps } from "./Box";
import * as styles from "./styles";

export { styles as boxStyles };

export * from "./Box";

export default Box;

export type BoxStyleKeys = "root";

export interface BoxThemeConfig
	extends StandardThemeConfig<BoxStyleKeys, BoxProps> {}

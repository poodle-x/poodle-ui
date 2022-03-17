import { Container, ContainerProps } from "./Container";
import { StandardThemeConfig } from "../theme";

export * from "./Container";

export default Container;

export type ContainerStyleKeys = "root";

export interface ContainerThemeConfig
	extends StandardThemeConfig<ContainerStyleKeys, ContainerProps> {}

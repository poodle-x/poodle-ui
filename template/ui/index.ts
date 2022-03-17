import { {{NameCamel}}, {{NameCamel}}Props } from "./{{NameCamel}}";
import { StandardThemeConfig } from "../theme";

export * from "./{{NameCamel}}";

export default {{NameCamel}};

export type {{NameCamel}}StyleKeys = "root";

export interface {{NameCamel}}ThemeConfig
	extends StandardThemeConfig<{{NameCamel}}StyleKeys, {{NameCamel}}Props> {}


import { SystemThemeConfig, createSystem, SystemConfigList } from "../";

export interface SystemTestCase {
	snapshot?: boolean;
	name: string;
	data: {
		theme?: SystemThemeConfig;
		steps: Array<Array<any>>;
	};
}

export function systemPropTestCases(data: {
	systemConfigs: SystemConfigList;
	testCases: SystemTestCase[];
	theme?: SystemThemeConfig;
}) {
	const { systemConfigs, testCases, theme } = data;
	testCases.forEach((tes) => {
		it(tes.name, () => {
			tes.data.steps.forEach((step) => {
				const result = createSystem(systemConfigs)({
					theme: {
						...theme,
						...tes.data.theme,
						...step[2],
					},
					...step[0],
				});
				if (tes.snapshot) {
					expect(result).toMatchSnapshot();
				} else {
					expect(result).toEqual(step[1]);
				}
			});
		});
	});
}

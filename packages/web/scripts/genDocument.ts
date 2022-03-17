import path from "path";
import fs from "fs";
import { Project } from "ts-morph";
import chalk from "chalk";
import * as genProps from "./genProps";
import * as genTheming from "./genTheming";
import * as genSystem from "./genSystem";

export type ResultFindFile = { filename: string; filePath: string };

export async function findListFiles(
	startPath: string,
	filter: RegExp
): Promise<ResultFindFile[]> {
	return new Promise<ResultFindFile[]>(async (resolve) => {
		let list: {
			filename: string;
			filePath: string;
		}[] = [];

		try {
			await fs.promises.access(startPath);
		} catch (e) {
			console.error(e.toString());
			return resolve(list);
		}

		const files = await fs.promises.readdir(startPath);

		Promise.all(
			files.map((file) => {
				return new Promise<void>(async (resolve) => {
					const filename = path.join(startPath, file);
					const stat = await fs.promises.lstat(filename);
					if (stat.isDirectory()) {
						const listDeep = await findListFiles(filename, filter);
						list = [...list, ...listDeep];
					} else if (filter.test(filename)) {
						list.push({
							filename,
							filePath: startPath,
						});
					}
					resolve();
				});
			})
		).then(() => {
			resolve(list);
		});
	});
}

const project = new Project({
	tsConfigFilePath: "../ui/tsconfig.json",
});

project.addSourceFilesAtPaths("../ui/src/**/*.(tsx|ts)");

const projectSystem = new Project({
	tsConfigFilePath: "../system/tsconfig.json",
});

projectSystem.addSourceFilesAtPaths("../system/src/**/*.(tsx|ts)");

findListFiles("src/docs", /\.mdx$/).then((result) => {
	result.forEach((r) => {
		fs.readFile(r.filename, (err, data) => {
			let edited = false;

			let str = data.toString("utf-8");

			let result = genProps.replace(str, project);
			str = result.str;
			edited = result.edited || edited;

			result = genTheming.replace(str, project);
			str = result.str;
			edited = result.edited || edited;

			result = genProps.replacePartialProps(str, project);
			str = result.str;
			edited = result.edited || edited;

			result = genSystem.replace(str, projectSystem);
			str = result.str;
			edited = result.edited || edited;

			if (edited) {
				fs.writeFile(
					r.filename,
					str,
					{
						encoding: "utf-8",
					},
					(err) => {
						if (err) {
							console.log(
								`🔍 ${chalk.underline(r.filename)}: ${chalk.red(
									err.toString()
								)}`
							);
						} else {
							console.log(
								`🔍 ${chalk.underline(r.filename)}: ${chalk.green("replaced!")}`
							);
						}
					}
				);
			} else {
				console.log(
					`🔍 ${chalk.underline(r.filename)}: ${chalk.yellow(
						"not found anything."
					)}`
				);
			}
		});
	});
});

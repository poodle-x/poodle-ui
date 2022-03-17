import { readFileSync } from "fs";
import { parse } from "parse-gitignore";
import rimraf from "rimraf";

async function bootstrap() {
	const list = parse(readFileSync(".gitignore"));

	const listBuildFiles = list.sections[0].patterns;

	await Promise.all(
		listBuildFiles.map((p) => {
			return new Promise<undefined>((resolve, reject) => {
				rimraf(`.${p}`, (e) => {
					if (e) {
						reject(e);
					} else {
						resolve(undefined);
					}
					// reject(e);
				});
			});
		})
	);
}

bootstrap().catch((e) => {
	// eslint-disable-next-line no-console
	console.error(e);
	process.exit(1);
});

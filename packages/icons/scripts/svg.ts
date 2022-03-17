import { rename, readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import * as svgo from "svgo";
import prettier from "prettier";

const basePath = path.join(".", "src", "svg");
const reactPath = path.join(".", "src", "react");

async function getSVGFiles() {
	const dir = await readdir(basePath);

	return dir.filter((file) => {
		return /.+\.svg/gm.test(file);
	});
}

function toReactComponent(svgPath: string, fileName: string) {
	const up = svgPath
		.replace(/"\/>/g, '" />')
		.replace(/fill-opacity=/g, "fillOpacity=")
		.replace(/xlink:href=/g, "xlinkHref=")
		.replace(/clip-rule=/g, "clipRule=")
		.replace(/fill-rule=/g, "fillRule=")
		.replace(/ clip-path=".+?"/g, "")
		.replace(/<clipPath.+?<\/clipPath>/g, "")
		.replace(/fill="(.+)"/gm, 'fill="currentColor"');

	const g = /(.+).svg/gm.exec(fileName);

	if (!g) {
		throw new Error("Invalid svg file: " + fileName);
	}

	const name = g[1]
		.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
			return g1.toUpperCase() + g2.toLowerCase();
		})
		.replaceAll("-", "");

	return {
		name,
		data: prettier.format(
			`
	// This file is generated from svg file.
	import React from "react";
	import createSvgIcon from "../utils/createSvgIcon";

const ${name} = createSvgIcon(
  <React.Fragment>
  	${up}
  </React.Fragment>,
"${name}"
);

export default ${name};
	`,
			{
				parser: "babel",
			}
		),
	};
}

async function createIndexFile(successComponents: string[]) {
	const result = prettier.format(
		`
	${successComponents
		.sort()
		.map((c) => `import ${c} from "./${c}"`)
		.toString()
		.replaceAll(",", "; ")}
	
	export {
		${successComponents
			.sort()
			.map((c) => c)
			.toString()
			.replaceAll(",", ", ")}
	}
	`,
		{
			parser: "babel",
		}
	);

	await writeFile(path.join(reactPath, `index.ts`), result, {
		encoding: "utf8",
	});
}

async function action() {
	let svgFiles = await getSVGFiles();

	await Promise.all(
		svgFiles.reduce<Promise<void>[]>((c, f) => {
			const regex = /(type=)(.+\.svg)/gm;
			const result = regex.exec(f);

			if (result) {
				c.push(rename(path.join(basePath, f), path.join(basePath, result[2])));
			}
			return c;
		}, [])
	);

	svgFiles = await getSVGFiles();

	const successComponents: string[] = [];

	await Promise.all(
		svgFiles.reduce<Promise<void>[]>((c, f) => {
			c.push(
				new Promise(async (resolve) => {
					const fullPath = path.join(basePath, f);

					const data = await readFile(fullPath, { encoding: "utf8" });

					const optimizedSVG = svgo.optimize(data);

					const replacedData = optimizedSVG.data.replaceAll(
						/fill=\"([^"]*)\"/gm,
						""
					);

					await writeFile(fullPath, replacedData, { encoding: "utf8" });

					const g = /<svg.*?>(.*)<\/svg>/gms.exec(replacedData);

					if (g) {
						const component = toReactComponent(g[1], f);

						await writeFile(
							path.join(reactPath, `${component.name}.tsx`),
							component.data,
							{ encoding: "utf8" }
						);
						successComponents.push(component.name);
					}
					resolve();
				})
			);

			return c;
		}, [])
	);

	await createIndexFile(successComponents);

	// eslint-disable-next-line no-console
	console.log(`Success with ${successComponents.length + 1} items!`);
}

action()
	.then()
	.catch((e) => {
		// eslint-disable-next-line no-console
		console.error("Failed generate svg");
		// eslint-disable-next-line no-console
		console.info(e);
	});

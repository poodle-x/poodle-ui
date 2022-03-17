import { Project } from "ts-morph";
import { getIdentifierDoc, IdentifierDocument } from "./genProps";
import markdownTable from "markdown-table";
import * as prettier from "prettier";

function getTableContent(doc: IdentifierDocument): string {
	const rows: string[][] = [];

	if (doc?.properties) {
		doc.properties
			.sort((a, b) => {
				const aName = a.name.toUpperCase();
				const bName = b.name.toUpperCase();

				// Make sure required props at top level
				if (a.required && !b.required) {
					return -1;
				}

				if (!a.required && b.required) {
					return 1;
				}

				let comparison = 0;

				if (aName > bName) {
					comparison = 1;
				} else if (aName < bName) {
					comparison = -1;
				}

				return comparison;
			})
			.forEach((p) => {
				let name = p.name;
				if (p.required) {
					name = `**${name} \\* **`;
				}

				let type = p.typeName;

				if (type) {
					// prettier broken when build with nexe
					type = prettier
						.format(`type A = ${type}`, {
							parser: "typescript",
							semi: false,
							printWidth: 80,
						})
						.replace("type A = ", "")
						.replace("type A =", "")
						// .replace(/[ ]+/gm, "&nbsp;")
						// .replace(/</gm, "`<`")
						// .replace(/>/gm, "`>`")
						.replace(/\|/gm, "\\|")
						//.replace(/[\n]/gm, "<br />");
						.replace(/[\n]/gm, "");
				}

				const document = p.document
					.replace(/\|/gm, "\\|")
					.replace(/([\n\r])/gm, "<br />");

				rows.push([name, `\`${type}\``, document]);
			});
	}

	if (doc?.document) {
		return `${doc?.document}\n\n${markdownTable([
			["Prop", "Type", "Description"],
			...rows,
		])}`;
	}

	return markdownTable([["Prop", "Type", "Description"], ...rows]);
}

export function replace(str: string, project: Project) {
	const regex = /\[\/\/\]: # \(GetSystemProps\[==(.+)==\]\)([^]*?)\[\/\/\]: # \(EndGetSystemProps\)/gm;
	let edited = false;
	let m;

	while ((m = regex.exec(str)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		const parts = m[1].split(",");

		const sourceFile = project.getSourceFileOrThrow(
			`../system/src/${parts[1]}`
		);

		const result = getIdentifierDoc(parts[0], sourceFile, project);

		if (result) {
			str = str.replace(
				m[0],
				m[0].replace(
					m[2],
					`
${getTableContent(result)}
				\n\n`
				)
			);
		}

		edited = true;
	}
	return {
		str,
		edited,
	};
}

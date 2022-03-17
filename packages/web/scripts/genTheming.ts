import { Project, SourceFile } from "ts-morph";
import * as prettier from "prettier";

export function getIdentifierDoc(
	name: string,
	src: SourceFile,
	project: Project
) {
	const typeAlias = src.getTypeAlias(name);

	const inter = src.getInterface(name);

	if (typeAlias) {
		return typeAlias.getText();
	} else if (inter) {
		return inter.getText();
	}

	return "";
}

export function replace(str: string, project: Project) {
	const regex = /\[\/\/\]: # \(GetTheming\[==(.+)==\]\)([^]*?)\[\/\/\]: # \(EndGetTheming\)/gm;
	let edited = false;
	let m;

	while ((m = regex.exec(str)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		const parts = m[1].split(",");

		const sourceFile = project.getSourceFileOrThrow(`../ui/src/${parts[2]}`);

		const result1 = getIdentifierDoc(parts[0], sourceFile, project);
		const result2 = getIdentifierDoc(parts[1], sourceFile, project);

		const result = prettier.format(`${result1}\n\n${result2}`, {
			parser: "typescript",
			semi: false,
			printWidth: 80,
		});

		str = str.replace(
			m[0],
			m[0].replace(
				m[2],
				`\n\n

Please check theming component document [here](/theming/component).
 		
\`\`\`ts
${result}
\`\`\` 
		
		\n\n`
			)
		);

		edited = true;
	}

	return {
		str,
		edited,
	};
}

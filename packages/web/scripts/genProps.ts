import {
	Project,
	TypeAliasDeclaration,
	SourceFile,
	InterfaceDeclaration,
} from "ts-morph";
import * as ts from "typescript";
import * as prettier from "prettier";
import markdownTable from "markdown-table";

export interface PropertyDocument {
	document: string;
	jsDocTags: ts.JSDocTagInfo[];
	name: string;
	typeName: string;
	required: boolean;
}

export interface IdentifierDocument {
	text: string;
	name: string;
	document: string;
	properties: PropertyDocument[];
}

function getTypeAliasDocument(
	typeAlias: TypeAliasDeclaration | InterfaceDeclaration,
	project: Project
): PropertyDocument[] {
	const somethingType = typeAlias.getType();
	const properties = somethingType.getProperties();

	const result: PropertyDocument[] = [];

	for (const prop of properties) {
		const checker: any = project.getTypeChecker().compilerObject;
		const node = prop.getValueDeclaration()?.compilerNode;
		if (node) {
			result.push({
				document: getDocument(prop.compilerSymbol as any, checker),
				jsDocTags: prop.compilerSymbol.getJsDocTags(),
				name: prop.getName(),
				typeName: (node as any).type?.getText() || "",
				required: !(node as any).questionToken,
			});
		}
	}
	return result;
}

function getDocument(symbol: ts.Symbol, checker: ts.TypeChecker): string {
	return ts.displayPartsToString(symbol.getDocumentationComment(checker));
}

export function getIdentifierDoc(
	name: string,
	src: SourceFile,
	project: Project
): IdentifierDocument | undefined {
	const checker: any = project.getTypeChecker().compilerObject;

	const typeAlias = src.getTypeAlias(name);

	const inter = src.getInterface(name);

	const result: IdentifierDocument = {
		text: "",
		name: "",
		document: "",
		properties: [],
	};

	if (typeAlias) {
		const symbol: any = checker.getSymbolAtLocation(
			typeAlias.compilerNode.name
		);
		result.name = typeAlias.getName();
		result.text = typeAlias.getText();
		result.document = symbol ? getDocument(symbol, checker) : "";
		result.properties = getTypeAliasDocument(typeAlias, project);
		return result;
	} else if (inter) {
		const symbol = checker.getSymbolAtLocation(inter.compilerNode.name);
		result.name = inter.getName();
		result.text = inter.getText();
		result.document = symbol ? getDocument(symbol, checker) : "";
		result.properties = getTypeAliasDocument(inter, project);
		return result;
	}
}

export function getTableContent(doc: IdentifierDocument): string {
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
			["Name", "Type", "Description"],
			...rows,
		])}`;
	}

	return markdownTable([["Name", "Type", "Description"], ...rows]);
}

export function replace(str: string, project: Project) {
	const regex = /\[\/\/\]: # \(GetProps\[==(.+)==\]\)([^]*?)\[\/\/\]: # \(EndGetProps\)/gm;
	let edited = false;
	let m;

	while ((m = regex.exec(str)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		const parts = m[1].split(",");

		const sourceFile = project.getSourceFileOrThrow(`../ui/src/${parts[1]}`);

		const result = getIdentifierDoc(parts[0], sourceFile, project);

		if (result) {
			str = str.replace(
				m[0],
				m[0].replace(
					m[2],
					`\n\n
### Local Props


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

export function replacePartialProps(str: string, project: Project) {
	const regex = /\[\/\/\]: # \(GetPartialProps\[==(.+)==\]\)([^]*?)\[\/\/\]: # \(GetPartialProps\)/gm;
	let edited = false;
	let m;

	while ((m = regex.exec(str)) !== null) {
		// This is necessary to avoid infinite loops with zero-width matches
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		const parts = m[1].split(",");

		const sourceFile = project.getSourceFileOrThrow(`../ui/src/${parts[1]}`);

		const result = getIdentifierDoc(parts[0], sourceFile, project);

		if (result) {
			str = str.replace(
				m[0],
				m[0].replace(
					m[2],
					`\n\n
### Full Props

\`\`\`ts
${result.text} 
\`\`\`
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

import { transform } from "@babel/standalone";

const transformCode = (code: string) => {
	try {
		return transform(`<Box padding="major-2">${code.trim() || ""}</Box>`, {
			presets: ["react"],
		}).code;
	} catch (err) {
		return "";
	}
};

export default transformCode;

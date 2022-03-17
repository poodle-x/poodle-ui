import "babel-polyfill";
import "@testing-library/jest-dom/extend-expect";
import { createSerializer } from "@emotion/jest";
import { toHaveNoViolations } from "jest-axe";
import fetchMock from "jest-fetch-mock";
import { __reset } from "./src/hooks/useAutoId";

expect.extend(toHaveNoViolations);

expect.addSnapshotSerializer(
	createSerializer({
		classNameReplacer(className, index) {
			return `c${index}`;
		},
	})
);

afterEach(() => {
	__reset();
});

fetchMock.enableMocks();

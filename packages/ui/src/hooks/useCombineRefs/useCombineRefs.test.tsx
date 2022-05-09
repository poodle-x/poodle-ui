import React from "react";
import { render } from "../../utils/test";
import useCombineRefs from "./useCombineRefs";

const Comp = React.forwardRef<any, any>((props, ref) => {
	const stallRef = React.useRef<HTMLElement>();
	const combineRef = useCombineRefs([stallRef, ref]);

	React.useEffect(() => {
		if (stallRef.current) {
			stallRef.current?.setAttribute("data-stall", "true");
		}
	}, [stallRef]);

	return (
		<div id="hello" ref={combineRef}>
			Hello
		</div>
	);
});

describe("useCombineRefs", () => {
	it("should combine refs", () => {
		const ref = React.createRef<HTMLTableElement>();

		render(<Comp ref={ref} />);

		expect(ref.current?.id).toEqual("hello");

		expect(ref.current?.getAttribute("data-stall")).toEqual("true");
	});

	it("should combine empty ref", () => {
		const ref = null as any;

		render(<Comp ref={ref} />);

		expect(ref).toEqual(null);
	});

	it("ref callback should work", () => {
		let result: any = null;

		const ref = (r: any) => {
			result = r;
		};

		render(<Comp ref={ref} />);

		expect(result.id).toEqual("hello");

		expect(result.getAttribute("data-stall")).toEqual("true");
	});
});

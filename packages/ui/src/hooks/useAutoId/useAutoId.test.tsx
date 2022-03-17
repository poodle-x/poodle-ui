import { fireEvent, render } from "../../utils/test";
import React from "react";
import useAutoId from "./useAutoId";

describe("useAutoId", () => {
	it("should render unique ids", () => {
		function Comp() {
			const justNull = null;
			const randId = useAutoId(justNull);
			const randId2 = useAutoId();
			return (
				<div>
					<div id={randId}>ID 1</div>
					<div id={randId2}>ID 2</div>
				</div>
			);
		}

		const { getByText } = render(<Comp />);
		const id1 = getByText("ID 1");
		const id2 = getByText("ID 2");

		expect(id1.id).not.toEqual(id2.id);
	});

	it("should render id from props", () => {
		function Comp(props: { id?: string }) {
			const randId = useAutoId(props.id);
			return (
				<div>
					<div id={randId}>ID 1</div>
				</div>
			);
		}

		const { getByText, rerender } = render(<Comp />);

		let id1 = getByText("ID 1");

		expect(id1.id).toEqual("1");

		rerender(<Comp id="new" />);

		id1 = getByText("ID 1");

		expect(id1.id).toEqual("new");
	});

	it("should render base id", () => {
		function Comp() {
			const randId = useAutoId("", {
				base: "my-base",
			});
			const randId2 = useAutoId("hello", {
				base: "my-base",
			});
			return (
				<div>
					<div id={randId}>ID 1</div>
					<div id={randId2}>ID 2</div>
				</div>
			);
		}

		const { getByText } = render(<Comp />);

		const id1 = getByText("ID 1");

		const id2 = getByText("ID 2");

		expect(id1.id).toEqual("my-base-1");

		expect(id2.id).toEqual("hello");
	});

	it("should change to auto id when id prop dropped", () => {
		function Comp() {
			const [forceId, setForceId] = React.useState("new");
			const randId = useAutoId(forceId);

			return (
				<div>
					<button
						onClick={() => {
							setForceId("");
						}}
					>
						change
					</button>
					<div id={randId}>ID 1</div>
				</div>
			);
		}

		const { getByText } = render(<Comp />);

		let id1 = getByText("ID 1");

		const button = getByText("change");

		expect(id1.id).toEqual("new");

		fireEvent.click(button);

		id1 = getByText("ID 1");

		expect(id1.id).not.toEqual("new");
	});
});

import * as React from "react";

export default function Noop() {
	return (
		<>
			{new Array(1000).fill().map(() => (
				<div>
					<div>noop</div>
				</div>
			))}
		</>
	);
}

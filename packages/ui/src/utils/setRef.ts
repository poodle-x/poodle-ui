import React from "react";

export default function setRef(
	ref:
		| ((instance: HTMLElement | null) => void)
		| React.MutableRefObject<HTMLElement | null>
		| null,
	value: HTMLElement | null
) {
	if (typeof ref === "function") {
		ref(value);
	} else if (ref) {
		ref.current = value;
	}
}

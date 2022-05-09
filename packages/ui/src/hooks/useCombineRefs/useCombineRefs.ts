import React from "react";

export default function useCombineRefs<T = any>(
	refs: (
		| React.MutableRefObject<any>
		| ((instance: any) => void)
		| undefined
		| null
	)[]
): React.MutableRefObject<T | undefined> {
	const combineRef = React.useRef<T>();

	React.useEffect(() => {
		refs.forEach((ref) => {
			if (!ref) return;

			if (typeof ref === "function") {
				ref(combineRef.current);
			} else {
				ref.current = combineRef.current;
			}
		});
	}, [refs]);

	return combineRef;
}

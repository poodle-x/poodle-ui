// original fork from https://github.com/reach/reach-ui/blob/develop/packages/auto-id/src/index.tsx

import React from "react";
import useSafeLayoutEffect from "../../utils/useSafeLayoutEffect";
import usePrev from "../usePrev";

let serverHandoffComplete = false;

let idStore = 0;

const genId = () => ++idStore;

// reset id. Ideally we use for testing, reset after each test.
const __reset = () => {
	idStore = 0;
};

export interface UseAutoIdOptions {
	base?: string;
}

/**
 *
 * Autogenerate IDs to facilitate WAI-ARIA and server rendering.
 *
 * Note: The returned ID will initially be `null` and will update after a
 * component mounts. Users may need to supply their own ID if they need
 * consistent values for SSR.
 */
function useAutoId(
	idFromProps?: string | null,
	options?: UseAutoIdOptions
): string | undefined {
	const { base } = options || {};

	const [id, setId] = React.useState(serverHandoffComplete ? genId() : null);

	const prevIdFromProps = usePrev(idFromProps);

	useSafeLayoutEffect(() => {
		if (id === null && !idFromProps) {
			/*
			 * Patch the ID after render. We do this in `useLayoutEffect` to avoid any
			 * rendering flicker, though it'll make the first render slower (unlikely
			 * to matter, but you're welcome to measure your app and let us know if
			 * it's a problem).
			 */
			setId(genId());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (!serverHandoffComplete) {
			/*
			 * Flag all future uses of `useId` to skip the update dance. This is in
			 * `useEffect` because it goes after `useLayoutEffect`, ensuring we don't
			 * accidentally bail out of the patch-up dance prematurely.
			 */
			serverHandoffComplete = true;
		}
	}, []);

	/**
	 * Should enable auto id again if change idFromProp to null, empty, undefined value
	 */
	React.useEffect(() => {
		if (prevIdFromProps && !idFromProps && serverHandoffComplete) {
			setId(genId());
		}
	}, [prevIdFromProps, idFromProps]);

	if (idFromProps) {
		return idFromProps;
	}

	return id != null ? `${base ? `${base}-` : ""}${String(id)}` : undefined;
}

export default useAutoId;

export { __reset };

import React from "react";
import { isBrowser } from "../utils/browser";

const useSafeLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;
export default useSafeLayoutEffect;

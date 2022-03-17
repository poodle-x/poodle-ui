import React from "react";
import { isBrowser } from "./browser";

const useSafeLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;
export default useSafeLayoutEffect;

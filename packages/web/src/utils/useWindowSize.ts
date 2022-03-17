import React from "react";

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window || {};
	return {
		width,
		height,
	};
}

export default function useWindowSize(): {
	width: number | undefined;
	height: number | undefined;
} {
	const [windowSize, setWindowSize] = React.useState<{
		width: number | undefined;
		height: number | undefined;
	}>({ width: undefined, height: undefined });

	React.useEffect(() => {
		function handleResize() {
			setWindowSize(getWindowDimensions());
		}
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
}

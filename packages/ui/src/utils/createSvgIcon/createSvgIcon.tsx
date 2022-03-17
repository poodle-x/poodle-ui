import React from "react";

export default function createSvgIcon(
	path: React.ReactNode,
	iconName: string,
	config: {
		defaultSvgProps?: React.SVGProps<SVGSVGElement>;
	} = {}
): React.NamedExoticComponent<
	React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
		React.RefAttributes<SVGSVGElement>
> {
	const Icon: React.ForwardRefRenderFunction<
		SVGSVGElement,
		React.SVGProps<SVGSVGElement>
	> = (props, ref) => (
		<svg
			ref={ref}
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="currentColor"
			{...config.defaultSvgProps}
			{...props}
		>
			{path}
		</svg>
	);

	Icon.displayName = `${iconName}Icon`;

	return React.memo(
		React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(Icon)
	);
}

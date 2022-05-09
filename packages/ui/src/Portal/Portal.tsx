import React from "react";
import ReactDOM from "react-dom";
import useSafeLayoutEffect from "../hooks/useSafeLayoutEffect";
import setRef from "../utils/setRef";

export interface PortalProps {
	/**
	 * Mount the children to the custom target rather than append to the body.
	 */
	mountOn?: HTMLElement;
	children: React.ReactNode;
	/**
	 * Chang container tag
	 */
	portalElementTag?: string;
	/**
	 * Change portal name in container **data-portal** attribute
	 */
	portalDataName?: string;
	/**
	 * Mount the children to the target when equal true
	 */
	mount?: boolean;
}

export interface PortalContextValue {
	defaultMount?: HTMLElement | null;
}

export const PortalContext = React.createContext<
	PortalContextValue | undefined
>(undefined);

export const Portal: React.ForwardRefExoticComponent<
	React.PropsWithoutRef<PortalProps> & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, PortalProps>(
	(
		{
			portalDataName = "poodle-ui",
			portalElementTag = "div",
			mount,
			mountOn,
			children,
		},
		ref
	) => {
		const portalContext = React.useContext(PortalContext);

		const [portal, setPortal] = React.useState<{
			element: HTMLElement | null;
		}>({
			element: null,
		});

		useSafeLayoutEffect(() => {
			if (mount) {
				if (!mountOn && !portalContext?.defaultMount && !portal.element) {
					const newPortal = document.createElement(portalElementTag);
					newPortal.setAttribute("data-portal", portalDataName);
					document.body.appendChild(newPortal);
					setPortal({
						element: newPortal,
					});
					setRef(ref, newPortal);
				} else {
					if (mountOn || (portalContext && portalContext?.defaultMount)) {
						setRef(ref, mountOn || portalContext?.defaultMount || null);
					}
				}
			}
		}, [
			mount,
			mountOn,
			portal.element,
			portalContext,
			portalContext?.defaultMount,
			portalDataName,
			portalElementTag,
			ref,
		]);

		useSafeLayoutEffect(() => {
			if (!mount) {
				if (portal.element) {
					portal.element.parentNode?.removeChild(portal.element);
					setPortal({
						element: null,
					});
				}
				setRef(ref, null);
			}
		}, [mount, portal.element, ref]);

		return mount
			? ReactDOM.createPortal(
					children,
					mountOn ||
						portalContext?.defaultMount ||
						portal.element ||
						document.body
			  )
			: null;
	}
);

Portal.displayName = "Portal";

export default Portal;

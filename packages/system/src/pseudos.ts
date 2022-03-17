import { SystemConfig } from "./system";
import {
	transformMultipleValue,
	transformPropertyMultipleValue,
} from "./utils/transform";

export const pseudosSystem: { [key: string]: SystemConfig } = {
	["_active"]: {
		properties: ["&:active"],
		isMultipleValue: true,
	},
	["_checked"]: {
		properties: ["&:checked"],
		isMultipleValue: true,
	},
	["_default"]: {
		properties: ["&:default"],
		isMultipleValue: true,
	},
	["_defined"]: {
		properties: ["&:defined"],
		isMultipleValue: true,
	},
	["_disabled"]: {
		properties: ["&:disabled"],
		isMultipleValue: true,
	},
	["_enabled"]: {
		properties: ["&:enabled"],
		isMultipleValue: true,
	},
	["_firstChild"]: {
		properties: ["&:first-child"],
		isMultipleValue: true,
	},
	["_firstOfType"]: {
		properties: ["&:first-of-type"],
		isMultipleValue: true,
	},
	["_focus"]: {
		properties: ["&:focus"],
		isMultipleValue: true,
	},
	["_focusWithin"]: {
		properties: ["&:focus-within"],
		isMultipleValue: true,
	},
	["_hover"]: {
		properties: ["&:hover"],
		isMultipleValue: true,
	},
	["_indeterminate"]: {
		properties: ["&:indeterminate"],
		isMultipleValue: true,
	},
	["_invalid"]: {
		properties: ["&:invalid"],
		isMultipleValue: true,
	},
	["_lang"]: {
		properties: transformPropertyMultipleValue("lang"),
		isMultipleValue: true,
		transform: transformMultipleValue,
	},
	["_lastChild"]: {
		properties: ["&:last-child"],
		isMultipleValue: true,
	},
	["_lastOfType"]: {
		properties: ["&:last-of-type"],
		isMultipleValue: true,
	},
	["_link"]: {
		properties: ["&:link"],
		isMultipleValue: true,
	},
	["_not"]: {
		properties: transformPropertyMultipleValue("not"),
		isMultipleValue: true,
		transform: transformMultipleValue,
	},
	["_nthChild"]: {
		properties: transformPropertyMultipleValue("nth-child"),
		isMultipleValue: true,
		transform: transformMultipleValue,
	},
	["_nthLastChild"]: {
		properties: transformPropertyMultipleValue("nth-last-child"),
		isMultipleValue: true,
		transform: transformMultipleValue,
	},
	["_nthLastOfType"]: {
		properties: transformPropertyMultipleValue("nth-last-of-type"),
		isMultipleValue: true,
		transform: transformMultipleValue,
	},
	["_nthOfType"]: {
		properties: transformPropertyMultipleValue("nth-of-type"),
		isMultipleValue: true,
		transform: transformMultipleValue,
	},
	["_onlyChild"]: {
		properties: ["&:only-child"],
		isMultipleValue: true,
	},
	["_onlyOfType"]: {
		properties: ["&:only-of-type"],
		isMultipleValue: true,
	},
	["_optional"]: {
		properties: ["&:optional"],
		isMultipleValue: true,
	},
	["_placeholderShown"]: {
		properties: ["&:placeholder-shown"],
		isMultipleValue: true,
	},
	["_readonly"]: {
		properties: ["&:read-only"],
		isMultipleValue: true,
	},
	["_readwrite"]: {
		properties: ["&:read-write"],
		isMultipleValue: true,
	},
	["_required"]: {
		properties: ["&:required"],
		isMultipleValue: true,
	},
	["_target"]: {
		properties: ["&:target"],
		isMultipleValue: true,
	},
	["_valid "]: {
		properties: ["&:valid"],
		isMultipleValue: true,
	},
	["_visited "]: {
		properties: ["&:visited"],
		isMultipleValue: true,
	},
	["_after"]: {
		properties: ["&::after"],
		isMultipleValue: true,
	},
	["_before"]: {
		properties: ["&::before"],
		isMultipleValue: true,
	},
	["_backdrop"]: {
		properties: ["&::backdrop"],
		isMultipleValue: true,
	},
	["_firstLetter"]: {
		properties: ["&::first-letter"],
		isMultipleValue: true,
	},
	["_firstLine"]: {
		properties: ["&::first-line"],
		isMultipleValue: true,
	},
	["_placeholder"]: {
		properties: ["&::placeholder"],
		isMultipleValue: true,
	},
	["_selection"]: {
		properties: ["&::selection"],
		isMultipleValue: true,
	},
};

export interface PseudosProps<T> {
	/**
	 * CSS pseudo-class :active
	 */
	_active?: T;
	/**
	 * CSS pseudo-class :checked
	 */
	_checked?: T;
	/**
	 * CSS pseudo-class :default
	 */
	_default?: T;
	/**
	 * CSS pseudo-class :defined
	 */
	_defined?: T;
	/**
	 * CSS pseudo-class :disabled
	 */
	_disabled?: T;
	/**
	 * CSS pseudo-class :enabled
	 */
	_enabled?: T;
	/**
	 * CSS pseudo-class :first-child
	 */
	_firstChild?: T;
	/**
	 * CSS pseudo-class :first-of-type
	 */
	_firstOfType?: T;
	/**
	 * CSS pseudo-class :focus
	 */
	_focus?: T;
	/**
	 * CSS pseudo-class :focus-within
	 */
	_focusWithin?: T;
	/**
	 * CSS pseudo-class :hover
	 */
	_hover?: T;
	/**
	 * CSS pseudo-class :indeterminate
	 */
	_indeterminate?: T;
	/**
	 * CSS pseudo-class :invalid
	 */
	_invalid?: T;
	/**
	 * CSS pseudo-class :lang()
	 */
	_lang?: T;
	/**
	 * CSS pseudo-class :last-child
	 */
	_lastChild?: T;
	/**
	 * CSS pseudo-class :last-of-type
	 */
	_lastOfType?: T;
	/**
	 * CSS pseudo-class :link
	 */
	_link?: T;
	/**
	 * CSS pseudo-class :not()
	 */
	_not?: T;
	/**
	 * CSS pseudo-class :nth-child()
	 */
	_nthChild?: T;
	/**
	 * CSS pseudo-class :nth-last-child()
	 */
	_nthLastChild?: T;
	/**
	 * CSS pseudo-class :nth-last-of-type()
	 */
	_nthLastOfType?: T;
	/**
	 * CSS pseudo-class :nth-of-type()
	 */
	_nthOfType?: T;
	/**
	 * CSS pseudo-class :only-child
	 */
	_onlyChild?: T;
	/**
	 * CSS pseudo-class :only-of-type
	 */
	_onlyOfType?: T;
	/**
	 * CSS pseudo-class :optional
	 */
	_optional?: T;
	/**
	 * CSS pseudo-class :placeholder-shown
	 */
	_placeholderShown?: T;
	/**
	 * CSS pseudo-class :readonly
	 */
	_readonly?: T;
	/**
	 * CSS pseudo-class :read-write
	 */
	_readwrite?: T;
	/**
	 * CSS pseudo-class :required
	 */
	_required?: T;
	/**
	 * CSS pseudo-class :target
	 */
	_target?: T;
	/**
	 * CSS pseudo-class :valid
	 */
	_valid?: T;
	/**
	 * CSS pseudo-class :visited
	 */
	_visited?: T;
	/**
	 * CSS pseudo-element :after
	 */
	_after?: T;
	/**
	 * CSS pseudo-element ::before
	 */
	_before?: T;
	/**
	 * CSS pseudo-element ::backdrop
	 */
	_backdrop?: T;
	/**
	 * CSS pseudo-element ::first-letter
	 */
	_firstLetter?: T;
	/**
	 * CSS pseudo-element ::placeholder
	 */
	_placeholder?: T;
	/**
	 * CSS pseudo-element ::selection
	 */
	_selection?: T;
}

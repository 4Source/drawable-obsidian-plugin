import { CSS_PLUGIN_CLASS } from "src/constants";

export class SVGSurface {
	element: SVGElement;

	/**
	 * 
	 * @param parant 
	 */
	constructor(parant: Element) {
		this.element = parant.createSvg('svg');
		this.element.addClass(CSS_PLUGIN_CLASS);
	}
}

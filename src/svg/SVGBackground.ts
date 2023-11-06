import { SVGSurface } from "./SVGSurface";

export class SVGBackground extends SVGSurface {
	pattern_dot: SVGPatternElement;
	pattern_plus: SVGPatternElement;

	/**
	 * 
	 * @param parant 
	 */
	constructor(parant: Element) {
		super(parant);
		// Create Dot Pattern
		this.pattern_dot = this.element.createSvg('pattern', { attr: { 'id': 'drawenable-dot', 'patternUnits': 'userSpaceOnUse', 'x': 100, 'y': 100, 'width': 20, 'height': 20 } });
		this.pattern_dot.createSvg('circle', { attr: { 'cx': 10.7, 'cy': 10.7, 'r': 0.7, 'fill': 'var(--canvas-dot-pattern)' } });
		// Create Plus Pattern
		this.pattern_plus = this.element.createSvg('pattern', { attr: { 'id': 'drawenable-plus', 'patternUnits': 'userSpaceOnUse', 'x': 100, 'y': 100, 'width': 20, 'height': 20 } });
		this.pattern_plus.createSvg('path', { attr: { 'd': 'M3.25 10h13.5M10 3.25v13.5', 'stroke-width': 0.3, 'stroke': 'var(--canvas-dot-pattern)' } });

		this.element.addClasses(['background', 'dot']);
		this.element.createSvg('rect', { attr: { 'x': 0, 'y': 0 } });
	}
}

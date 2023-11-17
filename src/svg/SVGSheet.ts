import { SVGSurface } from "./SVGSurface";

export class SVGSheet extends SVGSurface {
	active: SVGPathElement;

	/**
	 * 
	 * @param parent 
	 * @param onPointerdownCallback 
	 * @param onPointerupCallback 
	 * @param onPointermoveCallback 
	 */
	constructor(parent: Element, onPointerdownCallback: (ev: PointerEvent) => any, onPointerupCallback: (ev: PointerEvent) => any, onPointermoveCallback: (ev: PointerEvent) => any,) {
		super(parent);
		this.element.addClass('sheet');
		this.element.addEventListener('pointerdown', (ev) => {
			this.element.addEventListener('pointermove', onPointermoveCallback);
			onPointerdownCallback(ev);
		});
		this.element.addEventListener('pointerup', (ev) => {
			this.element.removeEventListener('pointermove', onPointermoveCallback);
			onPointerupCallback(ev);
		});

	}

	/**
	 * Create new Path and add first coordinates.
	 * @param x X-Coordinate
	 * @param y Y-Coordinate
	 * @param strokeWidth The Width of the Stroke
	 * @param strokeColor The Color of the Stroke
	 */
	addPath(x: number, y: number, strokeWidth: number, strokeColor: string) {
		this.active = this.element.createSvg('path', {attr: {'d': `M ${x} ${y}`, 'fill': 'none', 'stroke': strokeColor, 'stroke-width': strokeWidth }});
	}

	/**
	 * Add Points to the Path
	 * @param x X-Coordinate
	 * @param y Y-Coordinate
	 */
	appendPath(x: number, y: number) {
		if(this.active) {
			let points = this.active.getAttr('d');
			points = points + ` ${x} ${y}`;
			this.active.setAttr('d', points);
		}
	}
}

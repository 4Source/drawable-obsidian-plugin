import { SVGSurface } from "./SVGSurface";

export class SVGSheet extends SVGSurface {
	active: SVGPolygonElement;

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
	 * Create new Polylne and add first coordinates.
	 * @param x X-Coordinate
	 * @param y Y-Coordinate
	 */
	addPolyline(x: number, y: number) {
		this.active = this.element.createSvg('polyline', { attr: { 'points': `${x}, ${y}`, 'fill': 'none', 'stroke': 'black', 'stroke-width': '3' } });
	}

	/**
	 * Add Points to the Polyline
	 * @param x X-Coordinate
	 * @param y Y-Coordinate
	 */
	appendPolyline(x: number, y: number) {
		if (this.active) {
			let points = this.active.getAttr('points');
			points = points + ` ${x},${y}`;
			this.active.setAttr('points', points);
		}
	}
}

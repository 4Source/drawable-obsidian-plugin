import { ItemView, setIcon } from "obsidian";
import { CSS_PLUGIN_CLASS, ICON_EDIT_MODE_ERASER, ICON_EDIT_MODE_MARKER, ICON_EDIT_MODE_MOVE, ICON_EDIT_MODE_PENCIL, ICON_EDIT_MODE_POINTER, ICON_EDIT_MODE_SELECT, ICON_HELP, ICON_MORE_HORIZONTAL, ICON_PLUGIN, ICON_REDO, ICON_SETTING, ICON_UNDO, PLUGIN_DISPLAY_NAME, VIEW_TYPE_DRAWENABLE } from "../constants";

export default class DrawEnableView extends ItemView {
	controls: HTMLElement;
	background: SVGBackground;
	sheet: SVGSheet;
	toolGroup: SelectControlGroup;
	unredoGroup: ControlGroup;
	settingsGroup: ControlGroup;
	helpGroup: ControlGroup;

	getViewType(): string {
		return VIEW_TYPE_DRAWENABLE;
	}

	getDisplayText(): string {
		return PLUGIN_DISPLAY_NAME;
	}


	async onOpen() {
		// Set Icon of the Window
		this.icon = ICON_PLUGIN;

		const container = this.containerEl.children[1];
		container.addClass(CSS_PLUGIN_CLASS);
		container.empty();
		container.createEl('div', { cls: ['wrapper', CSS_PLUGIN_CLASS] });

		// Background
		this.background = new SVGBackground(container.children[0]);
		// Controls
		this.controls = Control.createControl(container.children[0]);
		// SVG Sheet
		this.sheet = new SVGSheet(container.children[0], (ev) => {
			this.sheet.addPolyline(ev.offsetX, ev.offsetY);
		}, (ev) => {
			this.sheet.appendPolyline(ev.offsetX, ev.offsetY);
		}, (ev) => {
			this.sheet.endPolyline(ev.offsetX, ev.offsetY);
		});


		// Tools Group
		this.toolGroup = new SelectControlGroup(this.controls);
		// Pencil
		let pencil = new SelectControlItem(this.toolGroup, 'pencil', 'Pencil', ICON_EDIT_MODE_PENCIL, () => {});
		new ChildControlItem(pencil, 'options', 'Options', ICON_MORE_HORIZONTAL, ()=>{});
		// Marker
		let marker = new SelectControlItem(this.toolGroup, 'marker', 'Marker', ICON_EDIT_MODE_MARKER, () => { });
		new ChildControlItem(marker, 'options', 'Options', ICON_MORE_HORIZONTAL, ()=>{});
		// Eraser
		let eraser = new SelectControlItem(this.toolGroup, 'eraser', 'Eraser', ICON_EDIT_MODE_ERASER, () => { });
		new ChildControlItem(eraser, 'options', 'Options', ICON_MORE_HORIZONTAL, ()=>{})
		// Select
		let select = new SelectControlItem(this.toolGroup, 'select', 'Select', ICON_EDIT_MODE_SELECT, () => { });
		new ChildControlItem(select, 'options', 'Options', ICON_MORE_HORIZONTAL, ()=>{})
		// Pointer
		let pointer = new SelectControlItem(this.toolGroup, 'pointer', 'Pointer', ICON_EDIT_MODE_POINTER, () => { });
		new ChildControlItem(pointer, 'options', 'Options', ICON_MORE_HORIZONTAL, ()=>{})
		// Pan
		new SelectControlItem(this.toolGroup, 'move', 'Move', ICON_EDIT_MODE_MOVE, () => { }, true);

		// Undo Redo Group
		this.unredoGroup = new ControlGroup(this.controls);
		// Undo
		new ControlItem(this.unredoGroup, 'undo', 'Undo', ICON_UNDO, () => { });
		// Redo
		new ControlItem(this.unredoGroup, 'redo', 'Redo', ICON_REDO, () => { });

		// Settings Group
		this.settingsGroup = new ControlGroup(this.controls);
		// Settings
		new MenuControlItem(this.settingsGroup, 'settings', 'Settings', ICON_SETTING, () => { });

		// Help Group
		this.helpGroup = new ControlGroup(this.controls);
		// Help
		new PopupControlItem(this.helpGroup, 'help', 'Help', ICON_HELP, () => { });


	}

	async onClose() {
		// Nothing to clean up.
	}
}


class ControlItem {
	group: ControlGroup;
	element: HTMLElement;
	name: string;

	/**
	 * 
	 * @param group 
	 * @param name 
	 * @param label 
	 * @param icon 
	 * @param onClickCallback 
	 */
	constructor(group: ControlGroup, name: string, label: string, icon: string, onClickCallback: () => any) {
		this.group = group;
		this.element = group.element.createEl('div', { cls: ["control-item", CSS_PLUGIN_CLASS] });
		setIcon(this.element, icon);
		this.element.setAttr("aria-label", label);
		this.element.setAttr("data-tooltip-position", "left");
		this.name = name;

		this.group.addControlItem(this);
		this.element.addEventListener('click', onClickCallback);
	}
}

class SelectControlItem extends ControlItem {
	group: SelectControlGroup;

	/**
	 * 
	 * @param group 
	 * @param name 
	 * @param label 
	 * @param icon 
	 * @param onClickCallback 
	 * @param selected 
	 */
	constructor(group: ControlGroup, name: string, label: string, icon: string, onClickCallback: () => any, selected?: boolean) {
		super(group, name, label, icon, () => { this.select(); onClickCallback; });

		this.group.addControlItem(this);
		if (selected) {
			this.select();
		}
	}

	select() {
		this.group.changeSelected(this.name);
	}
}

class MenuControlItem extends ControlItem {

	/**
	 * 
	 * @param group 
	 * @param name 
	 * @param label 
	 * @param icon 
	 * @param onClickCallback 
	 */
	constructor(group: ControlGroup, name: string, label: string, icon: string, onClickCallback: () => any) {
		super(group, name, label, icon, onClickCallback);
	}

}

class ChildControlItem extends MenuControlItem {
	parent: ControlItem;

	/**
	 * 
	 * @param parent 
	 * @param name 
	 * @param label 
	 * @param icon 
	 * @param onClickCallback 
	 */
	constructor(parent: ControlItem, name: string, label: string, icon: string, onClickCallback: () => any) {
		super(parent.group, name, label, icon, onClickCallback);

		this.element.addClass('invisible');
		this.element.addClass('child-control-item');

		parent.element.addEventListener('itemselectionchange', (ev)=>{
			this.changeVisibility(parent.element.hasClass('selected'))
		});
	}

	/**
	 * 
	 * @param visible 
	 */
	changeVisibility(visible: boolean) {
		if(visible) {
			this.element.removeClass('invisible');
		}
		else {
			this.element.addClass('invisible');
		}
	}


}

class PopupControlItem extends ControlItem {

	/**
	 * 
	 * @param group 
	 * @param name 
	 * @param label 
	 * @param icon 
	 * @param onClickCallback 
	 */
	constructor(group: ControlGroup, name: string, label: string, icon: string, onClickCallback: () => any) {
		super(group, name, label, icon, onClickCallback);
	}
}

class ControlGroup {
	element: Element;
	controlItems: ControlItem[];

	/**
	 * 
	 * @param parant 
	 */
	constructor(parant: Element) {
		this.element = parant.createEl('div', { cls: ['control-group', CSS_PLUGIN_CLASS] });
		this.controlItems = [];
	}

	addControlItem(item: ControlItem) {
		this.controlItems.push(item);
	}
}

class SelectControlGroup extends ControlGroup {
	controlItems: SelectControlItem[];

	/**
	 * 
	 * @param parant 
	 */
	constructor(parant: Element) {
		super(parant);
		this.element.addClass('selectable-group');
	}

	/**
	 * 
	 * @param item 
	 */
	addControlItem(item: SelectControlItem) {
		this.controlItems.push(item);
	}

	/**
	 * 
	 * @param name 
	 */
	changeSelected(name: string) {
		this.controlItems.forEach(controlItem => {
			if (controlItem.name === name) {
				controlItem.element.addClass('selected');
				controlItem.element.dispatchEvent(new CustomEvent('itemselectionchange'));
			}
			else if (controlItem.element.hasClass('selected')) {
				controlItem.element.removeClass('selected');
				controlItem.element.dispatchEvent(new CustomEvent('itemselectionchange'));
			}
		});
	}
}

class Control {
	/**
	 * 
	 * @param parent 
	 * @returns 
	 */
	static createControl(parent: Element) {
		return parent.createEl('div', { cls: ['controls', CSS_PLUGIN_CLASS] });
	}
}

class SVGSurface {
	element: SVGElement;

	constructor(parant: Element) {
		this.element = parant.createSvg('svg');
		this.element.addClass(CSS_PLUGIN_CLASS);
	}
}

class SVGBackground extends SVGSurface {
	pattern_dot: SVGPatternElement;
	pattern_plus: SVGPatternElement;

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

class SVGSheet extends SVGSurface {
	active: SVGPolygonElement;

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

	addPolyline(x: number, y: number) {
		this.active = this.element.createSvg('polyline', { attr: { 'points': `${x}, ${y}`, 'fill': 'none', 'stroke': 'black', 'stroke-width': '3' } });
	}
	appendPolyline(x: number, y: number) {
		if (this.active) {
			let points = this.active.getAttr('points');
			points = points + ` ${x},${y}`;
			this.active.setAttr('points', points);
		}
	}
	endPolyline(x: number, y: number) {
		this.appendPolyline(x, y);
	}
}

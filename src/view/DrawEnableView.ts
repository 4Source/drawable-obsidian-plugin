import { ItemView, setIcon } from "obsidian";
import { CSS_PLUGIN_CLASS, ICON_EDIT_MODE_ERASER, ICON_EDIT_MODE_MARKER, ICON_EDIT_MODE_MOVE, ICON_EDIT_MODE_PENCIL, ICON_EDIT_MODE_POINTER, ICON_EDIT_MODE_SELECT, ICON_HELP, ICON_PLUGIN, ICON_REDO, ICON_SETTING, ICON_UNDO, PLUGIN_DISPLAY_NAME, VIEW_TYPE_DRAWENABLE } from "../constants";

export default class DrawEnableView extends ItemView {
	controls: HTMLElement;
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
		this.controls = Control.createControl(container.children[0]);

		// Tools Group
		this.toolGroup = new SelectControlGroup(this.controls);
		// Pencil
		new SelectControlItem(this.toolGroup, 'pencil', 'Pencil', ICON_EDIT_MODE_PENCIL, () => { });
		// Marker
		new SelectControlItem(this.toolGroup, 'marker', 'Marker', ICON_EDIT_MODE_MARKER, () => { });
		// Eraser
		new SelectControlItem(this.toolGroup, 'eraser', 'Eraser', ICON_EDIT_MODE_ERASER, () => { });
		// Select
		new SelectControlItem(this.toolGroup, 'select', 'Select', ICON_EDIT_MODE_SELECT, () => { });
		// Pointer
		new SelectControlItem(this.toolGroup, 'pointer', 'Pointer', ICON_EDIT_MODE_POINTER, () => { });
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
			}
			else if (controlItem.element.hasClass('selected')) {
				controlItem.element.removeClass('selected');
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

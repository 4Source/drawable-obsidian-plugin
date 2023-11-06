import { ItemView } from "obsidian";
import { CSS_PLUGIN_CLASS, ICON_EDIT_MODE_ERASER, ICON_EDIT_MODE_MARKER, ICON_EDIT_MODE_MOVE, ICON_EDIT_MODE_PENCIL, ICON_EDIT_MODE_POINTER, ICON_EDIT_MODE_SELECT, ICON_HELP, ICON_MORE_HORIZONTAL, ICON_PLUGIN, ICON_REDO, ICON_SETTING, ICON_UNDO, PLUGIN_DISPLAY_NAME, VIEW_TYPE_DRAWENABLE } from "../constants";
import { Control } from "src/controls/Control";
import { ControlGroup } from "src/controls/ControlGroup";
import { SVGBackground } from "src/svg/SVGBackground";
import { SVGSheet } from "src/svg/SVGSheet";

export default class DrawEnableView extends ItemView {
	controls: Control;
	background: SVGBackground;
	sheet: SVGSheet;
	toolGroup: ControlGroup;
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
		this.controls = new Control(container.children[0]);
		// SVG Sheet
		this.sheet = new SVGSheet(container.children[0], (ev) => {
			this.sheet.addPolyline(ev.offsetX, ev.offsetY);
		}, (ev) => {
			this.sheet.appendPolyline(ev.offsetX, ev.offsetY);
		}, (ev) => {
			this.sheet.appendPolyline(ev.offsetX, ev.offsetY);
		});

		// Tools Group
		this.toolGroup = this.controls.createControlGroup();
		// Pencil
		let pencilSubGroup = this.toolGroup.createControlSubGroup({});
		let pencil = pencilSubGroup.createControlItem({ id: 'pencil', label: 'Pencil', icon: ICON_EDIT_MODE_PENCIL, selectgroup: this.toolGroup });
		pencilSubGroup.createControlItem({ id: 'pencil_o', label: 'Pencil Options', icon: ICON_MORE_HORIZONTAL, invisible: true, parantitem: pencil });
		// Marker
		let markerSubGroup = this.toolGroup.createControlSubGroup({});
		let marker = markerSubGroup.createControlItem({ id: 'marker', label: 'Marker', icon: ICON_EDIT_MODE_MARKER, selectgroup: this.toolGroup });
		markerSubGroup.createControlItem({ id: 'marker_o', label: 'Marker Options', icon: ICON_MORE_HORIZONTAL, invisible: true, parantitem: marker });
		// Eraser
		let eraserSubGroup = this.toolGroup.createControlSubGroup({});
		let eraser = eraserSubGroup.createControlItem({ id: 'eraser', label: 'Eraser', icon: ICON_EDIT_MODE_ERASER, selectgroup: this.toolGroup });
		eraserSubGroup.createControlItem({ id: 'eraser_o', label: 'Eraser Options', icon: ICON_MORE_HORIZONTAL, invisible: true, parantitem: eraser });
		// Select
		let selectSubGroup = this.toolGroup.createControlSubGroup({});
		let select = selectSubGroup.createControlItem({ id: 'select', label: 'Select', icon: ICON_EDIT_MODE_SELECT, selectgroup: this.toolGroup });
		selectSubGroup.createControlItem({ id: 'select_o', label: 'Select Options', icon: ICON_MORE_HORIZONTAL, invisible: true, parantitem: select });
		// Pointer
		let pointerSubGroup = this.toolGroup.createControlSubGroup({});
		let pointer = pointerSubGroup.createControlItem({ id: 'pointer', label: 'Pointer', icon: ICON_EDIT_MODE_POINTER, selectgroup: this.toolGroup });
		pointerSubGroup.createControlItem({ id: 'pointer_o', label: 'Pointer Options', icon: ICON_MORE_HORIZONTAL, invisible: true, parantitem: pointer });
		// Move
		this.toolGroup.createControlItem({ id: 'move', label: 'Move', icon: ICON_EDIT_MODE_MOVE, selectgroup: this.toolGroup });

		// Undo Redo Group
		this.unredoGroup = this.controls.createControlGroup();
		// Undo
		this.unredoGroup.createControlItem({ id: 'undo', label: 'Undo', icon: ICON_UNDO });
		// Redo
		this.unredoGroup.createControlItem({ id: 'redo', label: 'Redo', icon: ICON_REDO });

		// Settings Group
		this.settingsGroup = this.controls.createControlGroup();
		// Settings
		this.settingsGroup.createControlItem({ id: 'settings', label: 'Settings', icon: ICON_SETTING });

		// Help Group
		this.helpGroup = this.controls.createControlGroup();
		// Help
		this.helpGroup.createControlItem({ id: 'help', label: 'Help', icon: ICON_HELP });
	}

	async onClose() {
		// Nothing to clean up.
	}
}


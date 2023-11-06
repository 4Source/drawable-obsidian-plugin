import { CSS_PLUGIN_CLASS } from "src/constants";
import { ControlGroup, GroupInfo } from "./ControlGroup";

export class Control {
	element: Element;
	controlgroups: ControlGroup[];

	/**
	 * 
	 * @param parent 
	 */
	constructor(parent: Element) {
		this.element = parent.createEl('div', { cls: ['controls', CSS_PLUGIN_CLASS] });
		this.controlgroups = [];
	}

	/**
	 * Create Control Group in Control 
	 * @param o Parameters for Control Group
	 * @returns The Control Group
	 */
	createControlGroup(o?: GroupInfo): ControlGroup {
		let group = new ControlGroup(this.element, { ...o, subgroup: false });
		this.controlgroups.push(group);
		return group;
	}
}

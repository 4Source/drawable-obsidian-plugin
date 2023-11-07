import { CSS_PLUGIN_CLASS } from "src/constants";
import { ControlItem, ItemInfo } from "./ControlItem";

export class ControlGroup {
	element: Element;
	controlgroups: ControlGroup[];
	controlitems: ControlItem[];

	/**
	 * 
	 * @param parant 
	 * @param o 
	 */
	constructor(parant: Element, o: GroupInfo) {
		// Create Element
		this.element = parant.createEl('div', { cls: CSS_PLUGIN_CLASS });
		// Setup grouptype
		if (o.subgroup) {
			this.element.addClass('control-subgroup');
		} else {
			this.element.addClass('control-group');
		}
		// Setup Arrays
		this.controlgroups = [];
		this.controlitems = [];
	}

	/**
	 * Create Control Item in Control Group
	 * @param o Parameters for Control Item
	 * @returns The Control Item
	 */
	createControlItem(o: ItemInfo): ControlItem {
		let item = new ControlItem(this, o);
		this.controlitems.push(item);
		return item;
	}

	/**
	 * Create Control Subgroup in Control Group
	 * @param o Parameters for Control Subgroup
	 * @returns The Control Subgroup
	 */
	createControlSubGroup(o: GroupInfo): ControlGroup {
		let group = new ControlGroup(this.element, { ...o, subgroup: true });
		this.controlgroups.push(group);
		return group;
	}

	/**
	 * Change the Selected Control Item.
	 * @param id ID of Control Item whitch should be selected
	 */
	changeSelected(id: string) {
		this.loopThroughGroups((obj) => {
			let cur = obj as ControlItem;
			if (id === cur.id) {
				cur.element.addClass('selected');
				cur.element.dispatchEvent(new CustomEvent('itemselectionchange'));
			}
			else {
				cur.element.removeClass('selected');
				cur.element.dispatchEvent(new CustomEvent('itemselectionchange'));
			}
		},
			this);
	}

	/**
	 * Loop through all subgroups
	 * @param funcCallback 
	 * @param controlgroup 
	 */
	private loopThroughGroups(funcCallback: ({ }) => any, controlgroup: ControlGroup) {
		if (controlgroup.controlgroups.length > 0) {
			controlgroup.controlgroups.forEach((group) => {
				this.loopThroughGroups(funcCallback, group);
			})
		}
		if (controlgroup.controlitems.length > 0) {
			controlgroup.controlitems.forEach(funcCallback);
		}


	}
}

export interface GroupInfo {
	subgroup?: boolean;
}

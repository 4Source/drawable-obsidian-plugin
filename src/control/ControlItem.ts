import { CSS_PLUGIN_CLASS } from "src/constants";
import { ControlGroup } from "./ControlGroup";
import { setIcon } from "obsidian";

export class ControlItem {
	id: string;
	element: HTMLElement;
	selectgroup?: ControlGroup;
	parantitem?: ControlItem;


	constructor(group: ControlGroup, o: ItemInfo) {
		// Create Element
		this.element = group.element.createEl('div', { cls: ["control-item", CSS_PLUGIN_CLASS] });

		// Save Values if passed
		this.id = o.id;
		this.selectgroup = o.selectgroup;
		this.parantitem = o.parantitem;

		// Setup Icon
		setIcon(this.element, o.icon);
		// Setup Label
		this.element.setAttr("aria-label", o.label);
		this.element.setAttr("data-tooltip-position", "left");

		// Setup Visibility
		this.changeVisibility(o.invisible ? o.invisible : false);

		// Event Listeners
		if (o.onClickCallback) {
			if (o.selectgroup) {
				this.element.addEventListener('click', () => {
					this.select(this.id);
					o.onClickCallback;
				});
			}
			else {
				this.element.addEventListener('click', o.onClickCallback);
			}
		}
		if (o.selectgroup) {
			this.element.addEventListener('click', () => {
				this.select(this.id);
			});
		}
		if (this.parantitem) {
			this.element.addEventListener('itemselectionchange', (ev) => {
				let invisible = this.parantitem ? this.parantitem.element.hasClass('selected') : false
				this.changeVisibility(!invisible);
			});
		}
	}

	/**
	 * 
	 * @param invisible 
	 */
	changeVisibility(invisible: boolean) {
		if (invisible) {
			this.element.addClass('invisible');
		}
		else {
			this.element.removeClass('invisible');
		}
	}

	/**
	 * 
	 * @param id 
	 */
	select(id: string) {
		this.selectgroup?.changeSelected(id);
	}
}

export interface ItemInfo {
	label: string;
	icon: string;
	id: string;
	onClickCallback?: () => any;
	invisible?: boolean;
	selectgroup?: ControlGroup;
	parantitem?: ControlItem;
	menu?: null;
	popup?: null;
}

import { ItemView } from "obsidian";
import { PLUGIN_DISPLAY_NAME, VIEW_TYPE_DRAWENABLE } from "../constants";

export default class DrawEnableView extends ItemView {

	getViewType(): string {
		return VIEW_TYPE_DRAWENABLE;
	}

	getDisplayText(): string {
		return PLUGIN_DISPLAY_NAME;
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h4", { text: PLUGIN_DISPLAY_NAME });
		
		this.icon = 'pencil';
	}

	async onClose() {
		// Nothing to clean up.
	}
}

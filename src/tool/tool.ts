import { ICON_EDIT_MODE_ERASER, ICON_EDIT_MODE_MARKER, ICON_EDIT_MODE_MOVE, ICON_EDIT_MODE_PENCIL, ICON_EDIT_MODE_POINTER, ICON_EDIT_MODE_SELECT } from "src/constants";

export class Tool {
	type: EToolType;
	icon: string;

	constructor(type: EToolType) {
		this.setType(type);
	}

	setType(type: EToolType) {
		this.type = type;
		this.setDefaultIcon(type);
	}

	setDefaultIcon(type: EToolType) {
		if(type == EToolType.pencil) {
			this.icon = ICON_EDIT_MODE_PENCIL;
		}
		else if(type == EToolType.marker) {
			this.icon = ICON_EDIT_MODE_MARKER;
		}
		else if(type == EToolType.eraser) {
			this.icon = ICON_EDIT_MODE_ERASER;
		}
		else if(type == EToolType.pointer) {
			this.icon = ICON_EDIT_MODE_POINTER;
		}
		else if(type == EToolType.move) {
			this.icon = ICON_EDIT_MODE_MOVE;
		}
		else if(type == EToolType.select) {
			this.icon = ICON_EDIT_MODE_SELECT;
		}
	}
	getIcon() {
		return this.icon;
	}
}

export enum EToolType {
	pencil = 'pencil',
	marker = 'marker',
	eraser = 'eraser',
	pointer = 'pointer',
	move = 'move',
	select = 'select'
}

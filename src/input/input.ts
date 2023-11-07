import { ICON_INPUT_TYPE_KEYBOARD, ICON_INPUT_TYPE_MOUSE, ICON_INPUT_TYPE_PEN, ICON_INPUT_TYPE_TOUCH } from "src/constants";

export class Input {
	type: EInputType;
	icon: string;

	constructor(type: EInputType) {
		this.setType(type);
	}

	isTypeSetType(type: string) {
		if(type == EInputType.keyboard.toString()) {
			this.setType(EInputType.keyboard);
		}
		else if(type == EInputType.mouse.toString()) {
			this.setType(EInputType.mouse);
		}
		else if(type == EInputType.pen.toString()) {
			this.setType(EInputType.pen);
		}
		else if(type == EInputType.touch.toString()) {
			this.setType(EInputType.touch);
		}
	}

	isKeyboard() {
		return this.type == EInputType.keyboard;
	}
	isMouse() {
		return this.type == EInputType.mouse;
	}
	isPen() {
		return this.type == EInputType.pen;
	}
	isTouch() {
		return this.type == EInputType.touch;
	}

	setType(type: EInputType) {
		this.type = type;
		this.setDefaultIcon(type);
	}

	getType() {
		return this.type;
	}

	setDefaultIcon(type: EInputType) {
		if(type == EInputType.keyboard) {
			this.icon = ICON_INPUT_TYPE_KEYBOARD;
		}
		else if(type == EInputType.mouse) {
			this.icon = ICON_INPUT_TYPE_MOUSE;
		}
		else if(type == EInputType.pen) {
			this.icon = ICON_INPUT_TYPE_PEN;
		}
		else if(type == EInputType.touch) {
			this.icon = ICON_INPUT_TYPE_TOUCH;
		}
	}

	getIcon() {
		return this.icon;
	}
}

export enum EInputType {
	keyboard = 'keyboard',
	mouse = 'mouse',
	pen = 'pen',
	touch = 'touch'
}

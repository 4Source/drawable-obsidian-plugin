import { ICON_HELP, ICON_INPUT_TYPE_KEYBOARD, ICON_INPUT_TYPE_MOUSE, ICON_INPUT_TYPE_PEN, ICON_INPUT_TYPE_TOUCH } from "src/constants";

export class Input {
	private type: EInputType;
	private icon: string;

	constructor(type: EInputType) {
		this.setType(type);
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
	setStringType(type: String) {
		this.setType(Input.StringToType(type));
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
		else {
			this.icon = ICON_HELP;
		}
	}

	getIcon() {
		return this.icon;
	}

	static StringToType(type: String): EInputType {
		if(type == EInputType.keyboard.toString()) {
			return EInputType.keyboard;
		}
		else if(type == EInputType.mouse.toString()) {
			return EInputType.mouse;
		}
		else if(type == EInputType.pen.toString()) {
			return EInputType.pen;
		}
		else if(type == EInputType.touch.toString()) {
			return EInputType.touch;
		}
		else {
			return EInputType.none;
		}
	}
}

export enum EInputType {
	keyboard = 'keyboard',
	mouse = 'mouse',
	none = "none",
	pen = 'pen',
	touch = 'touch'
}

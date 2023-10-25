import { App, Plugin, PluginSettingTab, Setting, setIcon } from 'obsidian';

interface DrawEnablePluginSettings {
	settingsNumb1: string;
}

const DEFAULT_SETTINGS: DrawEnablePluginSettings = {
	settingsNumb1: 'default'
}

export default class DrawEnable extends Plugin {
	settings: DrawEnablePluginSettings;
	inputType: string;
	editMode: string;
	statusBarInputMode: HTMLSpanElement;
	statusBarEditMode: HTMLSpanElement;
	uiIntervalId: number;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingTab(this.app, this));

		// Status bar item to Display the Input type 
		this.statusBarInputMode = this.addStatusBarItem().createEl("span", {cls: "status-bar-item-icon"});
		this.statusBarInputMode.parentElement?.setAttr("aria-label", "Input type");
		this.statusBarInputMode.parentElement?.setAttr("data-tooltip-position", "top");
		this.inputType = 'mouse'
		//Status bar item to Display the Edit Mode
		this.statusBarEditMode = this.addStatusBarItem().createEl("span", {cls: "status-bar-item-icon"});
		this.statusBarEditMode.parentElement?.setAttr("aria-label", "Edit Mode");
		this.statusBarEditMode.parentElement?.setAttr("data-tooltip-position", "top");
		this.editMode = 'pencil';

		// console.log(this.app.workspace.getActiveViewOfType());

		// Update Non time critical UI at Intervall 
		this.uiIntervalId = window.setInterval(() => {
			this.updateUI();
		}, 500);

		// Mouse, Pen, Touch Input
		this.registerDomEvent(document, 'pointermove', (evt: PointerEvent) => {
			this.inputType = evt.pointerType;
		});

		// Keyboard Input
		this.registerDomEvent(document, 'keydown', (evt: KeyboardEvent) => {
			this.inputType = 'keyboard';
		});

	}

	// Update UI
	updateUI() {
		console.debug("UI Update");
		// Keyboard Input
		if(this.inputType == 'keyboard') {
			setIcon(this.statusBarInputMode, 'keyboard')
		}
		// Mouse Input
		else if(this.inputType == 'mouse') {
			setIcon(this.statusBarInputMode, 'mouse');
		} 
		// Pen Input
		else if(this.inputType == 'pen') {
			setIcon(this.statusBarInputMode, 'edit-2');
		}
		// Touch Input
		else if(this.inputType == 'touch') {
			setIcon(this.statusBarInputMode, 'pointer')
		}
		else {
			console.warn("Input-Type not found!");
			setIcon(this.statusBarInputMode, 'help-circle');
		}

		// Penil Mode
		if(this.editMode == 'pencil') {
			setIcon(this.statusBarEditMode, 'edit-2');
		}
		// Marker Mode
		else if(this.editMode == 'marker') {
			setIcon(this.statusBarEditMode, 'highlighter');
		}
		// Eraser Mode
		else if(this.editMode == 'eraser') {
			setIcon(this.statusBarEditMode, 'eraser');
		}
		// Color Picker Mode
		else if(this.editMode == 'pipette') {
			setIcon(this.statusBarEditMode, 'pipette');
		}
		// Brush Mode
		else if(this.editMode == 'brush') {
			setIcon(this.statusBarEditMode, 'brush');
		}
		// Ink Mode
		else if(this.editMode == 'ink') {
			setIcon(this.statusBarEditMode, 'pen-tool');
		}
		// Fill Mode
		else if(this.editMode == 'fill') {
			setIcon(this.statusBarEditMode, 'paint-bucket');
		}
		// Pointer Mode
		else if(this.editMode == 'pointer') {
			setIcon(this.statusBarEditMode, 'help-circle');
		}
		// Text Mode 
		else if(this.editMode == 'text') {
			setIcon(this.statusBarEditMode, 'type');
		}
		// Connector Mode
		else if(this.editMode == 'connector') {
			setIcon(this.statusBarEditMode, 'spline');
		}
		// Move Mode
		else if(this.editMode == 'move') {
			setIcon(this.statusBarEditMode, 'move');
		}
		// Select Mode
		else if(this.editMode == 'select') {
			setIcon(this.statusBarEditMode, 'box-select');
		}
		// Split Vertical Mode
		else if(this.editMode == 'split-vertical') {
			setIcon(this.statusBarEditMode, 'flip-vertical');
		}
		// Split Horizontal Mode
		else if(this.editMode == 'split-horizontal') {
			setIcon(this.statusBarEditMode, 'flip-horizontal');
		}
		else {
			console.warn("Edit-Mode not found!");
			setIcon(this.statusBarEditMode, 'help-circle');
		}
	}

	onunload() {
		// Clear Interval
		window.clearInterval(this.uiIntervalId);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SettingTab extends PluginSettingTab {
	plugin: DrawEnable;

	constructor(app: App, plugin: DrawEnable) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.settingsNumb1)
				.onChange(async (value) => {
					this.plugin.settings.settingsNumb1 = value;
					await this.plugin.saveSettings();
				}));
	}
}

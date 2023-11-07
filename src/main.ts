import { App, Plugin, PluginSettingTab, Setting, WorkspaceLeaf, setIcon } from 'obsidian';
import DrawEnableView from 'src/view/DrawEnableView';
import { CSS_PLUGIN_CLASS, ICON_ALERT, ICON_EDIT_MODE_ERASER, ICON_EDIT_MODE_MARKER, ICON_EDIT_MODE_MOVE, ICON_EDIT_MODE_PENCIL, ICON_EDIT_MODE_POINTER, ICON_EDIT_MODE_SELECT, ICON_INPUT_TYPE_KEYBOARD, ICON_INPUT_TYPE_MOUSE, ICON_INPUT_TYPE_PEN, ICON_INPUT_TYPE_TOUCH, ICON_PLUGIN, PLUGIN_DISPLAY_NAME, VIEW_TYPE_DRAWENABLE } from 'src/constants';
import { EInputType, Input } from './input/input';
import { EToolType, Tool } from './tool/tool';

export interface DrawEnablePluginSettings {
	settingsNumb1: string;
}

export const DEFAULT_SETTINGS: DrawEnablePluginSettings = {
	settingsNumb1: 'default'
}

export default class DrawEnablePlugin extends Plugin {
	settings: DrawEnablePluginSettings;
	inputType: Input;
	editMode: Tool;
	statusBarInputMode: HTMLSpanElement;
	statusBarEditMode: HTMLSpanElement;

	async onload() {
		await this.setupSettingsTab();

		// Status bar item to Display the Input type 
		this.statusBarInputMode = this.addStatusBarItem().createEl("span", { cls: ["status-bar-item-icon", CSS_PLUGIN_CLASS] });
		this.statusBarInputMode.parentElement?.setAttr("aria-label", "Input type");
		this.statusBarInputMode.parentElement?.setAttr("data-tooltip-position", "top");
		this.inputType = new Input(EInputType.mouse);
		//Status bar item to Display the Edit Mode
		this.statusBarEditMode = this.addStatusBarItem().createEl("span", { cls: ["status-bar-item-icon", CSS_PLUGIN_CLASS] });
		this.statusBarEditMode.parentElement?.setAttr("aria-label", "Edit Mode");
		this.statusBarEditMode.parentElement?.setAttr("data-tooltip-position", "top");
		this.editMode = new Tool(EToolType.move);

		// Register DrawEnableView
		this.registerView(VIEW_TYPE_DRAWENABLE, (leaf) => new DrawEnableView(leaf));

		// Add an Icon for Activating DrawEnableView
		this.addRibbonIcon(ICON_PLUGIN, "Open "+ PLUGIN_DISPLAY_NAME, () => {
			this.activateView();
		});

		// Update Non time critical UI at Intervall 
		this.registerInterval(window.setInterval(() => {
			this.updateUI();
		}, 500));

		// Mouse, Pen, Touch Input
		this.registerDomEvent(document, 'pointermove', (evt: PointerEvent) => {
			this.inputType.isTypeSetType(evt.pointerType);
		});
		this.registerDomEvent(document, 'pointerdown', (evt: PointerEvent) => {
			this.inputType.isTypeSetType(evt.pointerType);
		});


		// Keyboard Input
		this.registerDomEvent(document, 'keydown', (evt: KeyboardEvent) => {
			this.inputType.isTypeSetType('keyboard');
		});

	}

	// Update UI
	updateUI() {
		console.debug("UI Update");
		// Input Type
		setIcon(this.statusBarInputMode, this.inputType.getIcon());
		
		// Edit Mode
		setIcon(this.statusBarEditMode, this.editMode.getIcon());
	}

	onunload() {

	}

	async setupSettingsTab() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	// TEST
	async activateView() {
		let { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		let leaves = workspace.getLeavesOfType(VIEW_TYPE_DRAWENABLE);

		if (leaves.length > 0) {
			// A leaf with our view already exists, use that
			leaf = leaves[0];
		} else {
			// Our view could not be found in the workspace, create a new leaf
			// in the right sidebar for it
			let leaf = workspace.getRightLeaf(false);
			await leaf.setViewState({ type: VIEW_TYPE_DRAWENABLE, active: true });
		}

		// "Reveal" the leaf in case it is in a collapsed sidebar
		if (leaf) {
			workspace.revealLeaf(leaf);
		}
	}
	// TEST END
}

export class SettingTab extends PluginSettingTab {
	plugin: DrawEnablePlugin;

	constructor(app: App, plugin: DrawEnablePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

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

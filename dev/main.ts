import { App, Setting, setIcon } from "obsidian";
import DrawEnablePlugin, {DrawEnablePluginSettings, SettingTab, DEFAULT_SETTINGS} from "../src/main";
import { EInputType, Input } from "src/input/input";
import { EToolType, Tool } from "src/tool/tool";
import { CSS_PLUGIN_CLASS } from "src/constants";

interface DevPluginSettings extends DrawEnablePluginSettings {
	devMode: boolean;
}

const DEV_DEFULT_SETTINGS: DevPluginSettings = Object.assign(DEFAULT_SETTINGS , {
	devMode: true
});

export default class DevPlugin extends DrawEnablePlugin {
	settings: DevPluginSettings;
	statusBarInputMode: HTMLSpanElement;
	statusBarEditMode: HTMLSpanElement;

	async onload(): Promise<void> {
		super.onload();

		// Status bar item to Display the Input type 
		this.statusBarInputMode = this.addStatusBarItem().createEl("span", { cls: ["status-bar-item-icon", CSS_PLUGIN_CLASS] });
		this.statusBarInputMode.parentElement?.setAttr("aria-label", "Input type");
		this.statusBarInputMode.parentElement?.setAttr("data-tooltip-position", "top");
		this.input = new Input(EInputType.none);
		//Status bar item to Display the Edit Mode
		this.statusBarEditMode = this.addStatusBarItem().createEl("span", { cls: ["status-bar-item-icon", CSS_PLUGIN_CLASS] });
		this.statusBarEditMode.parentElement?.setAttr("aria-label", "Edit Mode");
		this.statusBarEditMode.parentElement?.setAttr("data-tooltip-position", "top");
		this.tool = new Tool(EToolType.none);
	}

	updateUI(): void {
		super.updateUI();
		// Input Type
		setIcon(this.statusBarInputMode, this.input.getIcon());
		
		// Edit Mode
		setIcon(this.statusBarEditMode, this.tool.getIcon());
	}

	async setupSettingsTab() {
		await this.loadSettings();		

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new DevSettingTab(this.app, this));

		// Display to Consolse if is Development Mode
		if(this.settings.devMode) {
			console.clear();
			console.log("Develompment Mode!");
		}
	}

	async loadSettings() {
		super.loadSettings();

		this.settings = Object.assign({}, DEV_DEFULT_SETTINGS, await this.loadData());
	}
}


class DevSettingTab extends SettingTab {
	plugin: DevPlugin;

	constructor(app: App, plugin: DevPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		super.display();
		const { containerEl } = this;

		new Setting(containerEl)
			.setName('Development Mode')
			.addToggle(component => component
				.setValue(this.plugin.settings.devMode)
				.onChange(async (value) => {
					this.plugin.settings.devMode = value;
					await this.plugin.saveSettings();
				}));
	}
}

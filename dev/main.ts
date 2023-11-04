import { App, Setting } from "obsidian";
import DrawEnablePlugin, {DrawEnablePluginSettings, SettingTab, DEFAULT_SETTINGS} from "../src/main";

interface DevPluginSettings extends DrawEnablePluginSettings {
	devMode: boolean;
}

const DEV_DEFULT_SETTINGS: DevPluginSettings = Object.assign(DEFAULT_SETTINGS , {
	devMode: true
});

export default class DevPlugin extends DrawEnablePlugin {
	settings: DevPluginSettings;

	// async onload(): Promise<void> {
	// 	super.onload();
	// }

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

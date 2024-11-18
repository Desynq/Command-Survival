import { $IOriginContainer, $OriginsAPI, $ResourceKey } from "../../libraries/JavaClasses";
import { OriginsHelper } from "../../libraries/OriginsHelper";
import { removeSculkerAttributes, removeHumanAttributes, applyAttributes } from "../managers/ApplyAttributes";


const advancementIds: string[] = [
	"command_survival:internal/chose_human",
	"command_survival:internal/chose_dryad",
	"command_survival:internal/chose_zephyr",
	"command_survival:internal/chose_cogwork",
	"command_survival:internal/chose_sculker"
];
for (let advancementId of advancementIds) {
	PlayerEvents.advancement(advancementId, event => new SwitchedOriginEvent(event));
}





class SwitchedOriginEvent {
	private player: Player;
	private originId: string;
	private originNamespace: string;

	public constructor(event: Internal.PlayerAdvancementEventJS) {
		this.player = event.player as Player;
		this.originId = OriginsHelper.entity(this.player as any).getOriginId()!;
		this.originNamespace = OriginsHelper.getOriginNamespace(this.originId)!;

		Utils.server.runCommandSilent(`advancement revoke ${this.player.username} only ${event.advancement.id()}`);
		this.skills();
		this.attributeModifiers();
	}

	private skills(): void {
		$OriginsAPI.getOriginsRegistry().registryKeySet().forEach(resourceKey => {
			Utils.server.runCommandSilent(`puffish_skills category lock ${this.player.username} puffish_skills:origins/${resourceKey.path}`);
		});

		Utils.server.runCommandSilent(`puffish_skills category unlock ${this.player.username} puffish_skills:origins/${this.originNamespace}`);
	}

	private attributeModifiers(): void {
		if (this.originId !== "command_survival:sculker") {
			removeSculkerAttributes(this.player);
		}
		if (this.originId !== "command_survival:human") {
			removeHumanAttributes(this.player);
		}
		applyAttributes(this.player);
	}
}
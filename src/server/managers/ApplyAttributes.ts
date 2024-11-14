import { AttributeModifier as Modifier } from "../../libraries/attributes/AttributeModifier";
import { OriginsHelper } from "../../libraries/OriginsHelper";

export class ApplyAttributesManager {

	public constructor(private player: Player) {

		const origin = OriginsHelper.entity(player as any).getOriginId();
		switch (origin) {
			case "command_survival:sculker":
				this.applySculkerAttributes();
				break;
		}
	}


	private applySculkerAttributes(): void {
		const resourceId = "command_survival:origins/sculker/absorb_level"
		const absorbLevel = Utils.server.runCommandSilent(`resource get ${this.player.username} ${resourceId}`);

		let multiplier = [-0.4, -0.2, 0, 0.2, 0.4, 0.6][absorbLevel];
		Modifier.SCULKER.MAX_HEALTH.add(this.player, multiplier, "multiply_total", true);
		Modifier.SCULKER.ATTACK_DAMAGE.add(this.player, multiplier, "multiply_total");
		Modifier.SCULKER.ATTACK_SPEED.add(this.player, multiplier, "multiply_total");
		Modifier.SCULKER.ARMOR_TOUGHNESS.add(this.player, multiplier, "multiply_total");
		Modifier.SCULKER.MOVEMENT_SPEED.add(this.player, multiplier, "multiply_total");
	}
}
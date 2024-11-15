import { AttributeModifier as Modifier } from "../../libraries/attributes/AttributeModifier";
import { OriginsHelper } from "../../libraries/OriginsHelper";
import { SculkOrigin } from "../origins/Sculk";

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
		const absorbLevel = SculkOrigin.getAbsorbLevel(this.player);

		let multiplier = [-0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5][absorbLevel];
		Modifier.SCULKER.MAX_HEALTH.add(this.player, multiplier, "multiply_total", true);
		Modifier.SCULKER.ATTACK_DAMAGE.add(this.player, multiplier, "multiply_total");
		Modifier.SCULKER.ATTACK_SPEED.add(this.player, multiplier, "multiply_total");
		Modifier.SCULKER.ARMOR_TOUGHNESS.add(this.player, multiplier, "multiply_total");
		Modifier.SCULKER.MOVEMENT_SPEED.add(this.player, multiplier, "multiply_total");
	}
}
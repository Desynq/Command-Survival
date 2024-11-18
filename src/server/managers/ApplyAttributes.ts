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
			case "command_survival:human":
				this.applyHumanAttributes();
				break;
		}
	}


	private applySculkerAttributes(): void {
		const absorbLevel = SculkOrigin.getAbsorbLevel(this.player);

		let multiplier = [-0.5, -0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5][absorbLevel];
		for (let modifier of Modifier.SCULKER) {
			const updateHealth = modifier.attributeId === "minecraft:generic.max_health";
			modifier.add(this.player, multiplier, "multiply_total", updateHealth);
		}
	}

	private applyHumanAttributes(): void {
		for (let modifier of Modifier.HUMAN_JACK_OF_ALL_TRADES) {
			const updateHealth = modifier.attributeId === "minecraft:generic.max_health";
			modifier.add(this.player, 0.1, "multiply_total", updateHealth);
		}
	}
}

export function applyAttributes(player: Player): void {
	new ApplyAttributesManager(player);
}




export function removeSculkerAttributes(player: Player): void {
	for (let modifier of Modifier.SCULKER) {
		modifier.remove(player);
	}
}

export function removeHumanAttributes(player: Player): void {
	for (let modifier of Modifier.HUMAN_JACK_OF_ALL_TRADES) {
		modifier.remove(player);
	}
}
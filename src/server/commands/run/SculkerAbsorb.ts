import { ApplyAttributesManager } from "../../managers/ApplyAttributes";
import { SculkOrigin } from "../../origins/Sculk";



export class SculkerAbsorb {
	private absorbLevel: number;
	private readonly COST: number = 2000;

	private constructor(private player: Player) {
		this.absorbLevel = SculkOrigin.getAbsorbLevel(player);

		player.crouching ? this.attemptRemove() : this.attemptAdd();
	}



	private attemptAdd(): void {
		if (this.absorbLevel >= 10) {
			this.player.statusMessage = "You're at maximum experience absorption. Cannot upgrade any further." as any;
			return;
		}
		if (this.player.xp < this.COST) {
			this.player.statusMessage = `Cannot afford to upgrade. Missing ${this.COST - this.player.xp} xp.` as any;
			return;
		}
		this.endResult(true);
	}

	private attemptRemove(): void {
		if (this.absorbLevel <= 0) {
			this.player.statusMessage = Component.red("Cannot unabsorb experience. No experience stored as absorption levels.") as any;
			return;
		}
		this.endResult(false);
	}

	private endResult(adding: boolean): void {
		const modifier = adding ? 1 : -1;
		SculkOrigin.addAbsorbLevel(this.player, modifier);
		this.player.xp += this.COST * -modifier;

		const soundEvent = adding ? "minecraft:block.sculk_shrieker.shriek" : "minecraft:block.sculk_sensor.clicking";
		this.player.level.playSound(null as any, this.player.blockX, this.player.blockY, this.player.blockZ, soundEvent, "master", 1, 1);

		const particle = adding ? "minecraft:sculk_soul" : "minecraft:ash";
		Utils.server.runCommandSilent(`execute at ${this.player.username} run particle ${particle} ~ ~1 ~ 0.5 0.7 0.5 0.1 50 force @a`);

		new ApplyAttributesManager(this.player);
	}



	public static run(player: Player) {
		new this(player);
	}
}
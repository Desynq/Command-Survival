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
		if (this.absorbLevel >= 5) {
			this.player.tell(Component.red("You're at maximum experience absorption-- cannot upgrade any further.") as any);
			return;
		}
		if (this.player.xp < this.COST) {
			this.player.tell(Component.red(`Cannot afford to upgrade-- missing ${this.COST - this.player.xp} xp.`) as any);
			return;
		}

		SculkOrigin.addAbsorbLevel(this.player, 1);
		this.player.xp -= this.COST;
		this.player.playSound("minecraft:block.sculk_shrieker.shriek", 1, 1);
		Utils.server.runCommandSilent(`execute at ${this.player.username} run particle "minecraft:sculk_soul" ~ ~1 ~ 0.5 0.7 0.5 0.1 50 force @a`);
		new ApplyAttributesManager(this.player);
	}

	private attemptRemove(): void {
		if (this.absorbLevel < 0) {
			this.player.tell(Component.red("Cannot unabsorb experience-- no experience stored as absorption levels.") as any);
			return;
		}

		SculkOrigin.addAbsorbLevel(this.player, -1);
		this.player.xp += this.COST;
		this.player.playSound("minecraft:block.sculk_sensor.clicking", 1, 1);
		Utils.server.runCommandSilent(`execute at ${this.player.username} run particle "minecraft:ash" ~ ~1 ~ 0.5 0.7 0.5 0.1 50 force @a`);
		new ApplyAttributesManager(this.player);
	}



	public static run(player: Player) {
		new this(player);
	}
}
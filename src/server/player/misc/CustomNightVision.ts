import { $MobEffectInstance } from "../../../libraries/JavaClasses";



export class CustomNightVisionManager {
	private player: Internal.Player;
	private nightVisionEffect: Internal.MobEffectInstance;

	private constructor(player: Internal.Player) {
		this.player = player;
		this.nightVisionEffect = this.player.getEffect("minecraft:night_vision");
		this.tick();
	}

	public static tick(player: Internal.Player): void {
		new this(player);
	}



	private tick(): void {
		if (this.player.level.dimension.toString() === "command_survival:myst/facility" && (this.player.spectator || this.isOutside())) {
			if (!this.nightVisionEffect) {
				this.addNightVision();
			}
		}
		else if (this.nightVisionEffect && this.nightVisionEffect.amplifier === 1) {
			this.removeNightVision();
		}
	}


	private isOutside(): boolean {
		let blockPos: BlockPos = BlockPos.containing(this.player.pos);
		return this.player.level.canSeeSky(blockPos) || !this.blockBelow();
	}

	private blockBelow(): boolean {
		for (let y = Math.floor(this.player.y) - 1; y > this.player.level.minBuildHeight; y--) {
			if (this.player.level.getBlock(Math.floor(this.player.x), y, Math.floor(this.player.z)).id !== "minecraft:air") {
				return true;
			}
		}
		return false;
	}



	private addNightVision(): void {
		this.player.addEffect(new $MobEffectInstance("minecraft:night_vision", -1, 1, false, false, true));
	}

	private removeNightVision(): void {
		this.player.removeEffect("minecraft:night_vision");
	};
}
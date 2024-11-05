import { $MobEffectInstance } from "../../../libraries/JavaClasses";



export class AbyssalChasmTick {
	private static readonly DARKNESS_MAX = 2**31 - 1;
	private static readonly DARKNESS_MIN = this.DARKNESS_MAX - 5; // 5 tick delay when entering water

	public static main(player: Internal.Player) {
		this.reducedVision(player);
	}

	private static reducedVision(player: Internal.Player) {
		if (player.spectator) {
			return;
		}

		const darknessEffect = player.getEffect("minecraft:darkness");

		if (!player.underWater || player.y >= 50) {
			if (darknessEffect) {
				return;
			}
			player.addEffect(new $MobEffectInstance("minecraft:darkness", -1, 1, false, false, true));
			return;
		}
		if (darknessEffect && darknessEffect.amplifier === 1) {
			player.removeEffect("minecraft:darkness");
		}
	}
}
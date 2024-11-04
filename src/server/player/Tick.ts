import { $MobEffectInstance } from "../../libraries/JavaClasses";
import { MathHelper } from "../../libraries/MathHelper";



export class PlayerTick {

	public static main(player: Internal.Player): void {
		DimensionHandler.main(player);
	}
}



class DimensionHandler {

	public static main(player: Internal.Player) {
		switch (player.level.dimension.toString()) {
			case "minecraft:overworld":
				this.overworld(player);
				break;
			case "dimdoors:limbo":
				this.limbo(player);
				break;
		}
	}

	private static overworld(player: Internal.Player) {
		if (player.y <= -128) {
			UndergroundCheck.main(player);
		}
	}

	private static limbo(player: Internal.Player) {
		player.addEffect(new $MobEffectInstance("minecraft:darkness", 40, 0, false, false, true));
	}
}



class UndergroundCheck {

	private static readonly CAVE_NAMESPACES: string[] = [
		"magnetic_caves",
		"primordial_caves",
		"toxic_caves",
		"abyssal_chasm",
		"forlorn_hollows",
		"candy_cavity"
	];
	public static main(player: Internal.Player) {
		const heldItem: Internal.ItemStack = player.getHeldItem("main_hand");
		const caveBiome: string = heldItem.nbt.getString("CaveBiome");

		const caveBiomes: string[] = this.CAVE_NAMESPACES.map(namespace => `alexscaves:${namespace}`)
		const index: number = caveBiomes.indexOf(caveBiome);

		if (index === -1) {
			return;
		}

		const caveNamespace: string = this.CAVE_NAMESPACES[index];
		player.teleportTo(`command_survival:underground/${caveNamespace}`, 0, 320, 0, player.yaw, player.pitch);
		player.addEffect(new $MobEffectInstance("minecraft:blindness", 200, 0, false, false, true));
		player.addEffect(new $MobEffectInstance("minecraft:resistance", 200, 255, false, false, true));

		heldItem.count -= 1;
	}
}
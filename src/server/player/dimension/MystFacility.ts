import { Debug } from "../../../libraries/Debug";
import { $MobEffectInstance } from "../../../libraries/JavaClasses";
import { MathHelper } from "../../../libraries/MathHelper";



export class MystFacility {

	public static tick(player: Internal.Player): void {
		if (player.onGround()) {
			const block = player.level.getBlock(player.getOnPos());
			if (block && block.id === "minecraft:crying_obsidian") {
				this.cryingObsidianTeleport(player);
			}
		}
	}

	private static cryingObsidianTeleport(player: Internal.Player): void {
		const worldBorder = Utils.server.getLevel("minecraft:overworld").worldBorder;
		const x = MathHelper.randomInRange(worldBorder.minX, worldBorder.maxX);
		const z = MathHelper.randomInRange(worldBorder.minZ, worldBorder.maxZ);
		player.teleportTo("minecraft:overworld", x, 1024, z, player.yaw, 90);
		player.playSound("minecraft:block.portal.travel");
	}
}
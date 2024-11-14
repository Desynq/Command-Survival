import { DimensionHandler } from "./dimension/DimensionHandler";
import { CustomNightVisionManager } from "./misc/CustomNightVision";



export class PlayerTick {

	public static main(player: Internal.Player): void {
		CustomNightVisionManager.tick(player);
		DimensionHandler.main(player);
	}
}



ItemEvents.canPickUp(event => {
	const { player } = event;
	if (player && player.creative && !player.crouching && !player.onGround()) {
		event.cancel();
	}
});



// ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingEntityUseItemEvent$Finish", event => {
// 	if (event.entity.type !== "minecraft:player") {
// 		return;
// 	}
// 	const player: Internal.Player = event.entity as any;

// 	if (!event.item.item.foodProperties.meat) {
// 		return;
// 	}
// });
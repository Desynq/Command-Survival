import { DimensionHandler } from "./dimension/DimensionHandler";
import { CustomNightVisionManager } from "./misc/CustomNightVision";



export class PlayerTick {

	public static main(player: Internal.Player): void {
		CustomNightVisionManager.tick(player);
		DimensionHandler.main(player);
	}
}
import { MathHelper } from "../../libraries/MathHelper";
import { DimensionHandler } from "./dimension/DimensionHandler";



export class PlayerTick {

	public static main(player: Internal.Player): void {
		DimensionHandler.main(player);
	}
}
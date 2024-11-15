import { OriginsHelper } from "../../../libraries/OriginsHelper";




export class OriginsManager {
	private player: Internal.Player;
	private origin: string;

	private constructor(player: Internal.Player) {
		this.player = player;
		this.origin = OriginsHelper.entity(player as Player).getOriginId() as string;
	}

	public static tick(player: Internal.Player): void {
		new this(player);
	}



	private tick(): void {
	}
}
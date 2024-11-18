import { PowerResource } from "../../../libraries/origins/Resource";
import { OriginsEntityHelper, OriginsHelper } from "../../../libraries/OriginsHelper";




export class OriginsManager {
	private originsEntityHelper: OriginsEntityHelper;
	private originId: string;

	public static tick(player: Internal.Player): void {
		new this(player as Player);
	}

	private constructor(private player: Player) {
		this.originsEntityHelper = OriginsHelper.entity(this.player);
		this.originId = OriginsHelper.entity(this.player).getOriginId() as string;

		this.grantDefaultPowers();

		switch (this.originId) {
			case "command_survival:cogwork":
				this.cogworkOrigin();
				break;
		}
	}

	private grantDefaultPowers(): void {
		Utils.server.runCommandSilent(`power grant ${this.player.username} command_survival:global/key/primary_active`);
	}

	private cogworkOrigin(): void {
		PowerResource.COGWORK_FLAMETHROWER_COOLDOWN.decrementByTick(this.player, 15 * 20);
	}
}
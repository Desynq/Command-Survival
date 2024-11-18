import { PowerResource } from "../../../libraries/origins/Resource";
import { OriginsHelper } from "../../../libraries/OriginsHelper";
import { RunCommand } from "../../commands/Run";




/**
 * @see {RunCommand}
 */
export namespace KeyPressEvent {

	export class PrimaryActiveKey {

		public static press(player: Player) {
			new this(player);
		}

		private originId: string;

		private constructor(private player: Player) {
			this.originId = OriginsHelper.entity(this.player).getOriginId()!;

			switch (this.originId) {
				case "command_survival:cogwork":
					this.cogwork();
					break;
			}
		}

		private cogwork(): void {
			if (!this.player.crouching) {
				new CogworkFlamethrowerBlast(this.player);
			}
		}
	}
}



class CogworkFlamethrowerBlast {

	public constructor(private player: Player) {
		let cooldown = PowerResource.COGWORK_FLAMETHROWER_COOLDOWN.get(this.player);

		if (cooldown > 0) {
			this.player.statusMessage = Component.red("Cannot shoot a flamethrower blast--still on cooldown.") as any;
			return;
		}

		PowerResource.COGWORK_FLAMETHROWER_COOLDOWN.setMax(this.player);
	}
}
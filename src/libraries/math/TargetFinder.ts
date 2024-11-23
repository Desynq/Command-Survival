import { TickHelper } from "../helpers/TickHelper";
import { OrientedBoundingBox } from "./OBB";


// basically just copied https://github.com/ZsoltMolnarrr/BetterCombat/blob/1.21.1/common/src/main/java/net/bettercombat/client/collision/TargetFinder.java#L25
export namespace TargetFinder {

	export class TargetResult {
		public constructor(
			public entities: Internal.List<Internal.Entity>,
			public obb: OrientedBoundingBox
		) { }
	}

	export function getShoulderTracingPoint(player: Internal.Player): Internal.Vec3d {
		const shoulderToEyeHeight: number = player.getBbHeight() * 0.15 * player.getScale();
		return player.getEyePosition().subtract(0, shoulderToEyeHeight, 0);
	}
}




PlayerEvents.tick(event => {
	const { player, server } = event;
	TickHelper.every(20, () => {
		const vec3d: Internal.Vec3d = TargetFinder.getShoulderTracingPoint(player);
		// player.tell(vec3d.toString());
	});
});
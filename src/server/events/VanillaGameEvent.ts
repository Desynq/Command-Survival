import { $LivingEntity, $MobEffectInstance } from "../../libraries/JavaClasses";
import { OriginsHelper } from "../../libraries/OriginsHelper";


function createAABB(x: number, y: number, z: number, distance: number): Internal.AABB {
	return AABB.of(
		x - distance,
		y - distance,
		z - distance,
		x + distance,
		y + distance,
		z + distance
	);
}



global.events.VanillaGameEvent = function (event: Internal.VanillaGameEvent) {
	const { cause: sourceEntity, level } = event;
	if (!(sourceEntity instanceof $LivingEntity)) {
		return;
	}

	const players: Internal.Entity[] = level.getPlayers().toArray();
	for (let player of players) {
		if (OriginsHelper.entity(player).getOriginId() !== "command_survival:sculker") {
			continue;
		}
		if (player.distanceToEntity(sourceEntity as any) > 64) {
			continue;
		}
		
		sourceEntity.addEffect(new $MobEffectInstance("kubejs:pinged", 20, 0, false, false, true));
		break;
	}
}
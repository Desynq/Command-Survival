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
	const { cause: sourceEntity, level, vanillaEvent: gameEvent } = event;
	if (!(sourceEntity instanceof $LivingEntity)) {
		return;
	}
	if (sourceEntity.crouching && ["step", "hit_ground"].indexOf(gameEvent.name) !== -1) {
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
		if (gameEvent.name === "projectile_shoot") {
			const distance = projectileShootGameEvent(sourceEntity, level, gameEvent);
			if (player.distanceToEntity(sourceEntity as any) > distance) continue;
		}
		
		// sourceEntity.statusMessage = `${gameEvent.name}` as any;
		sourceEntity.addEffect(new $MobEffectInstance("kubejs:pinged", 20, 0, false, false, true));
		break;
	}
}

function projectileShootGameEvent(sourceEntity: Internal.LivingEntity, level: Internal.Level, gameEvent: Internal.GameEvent): number {
	const DEFAULT_DISTANCE = 64;
	const itemStack = sourceEntity.mainHandItem;
	if (itemStack == null) return DEFAULT_DISTANCE;
	if (itemStack.id !== "tacz:modern_kinetic_gun") return DEFAULT_DISTANCE;
	
	const muzzleAttachment = itemStack?.nbt?.getCompound("AttachmentMUZZLE")?.getCompound("tag")?.getString("AttachmentId");
	if (muzzleAttachment == null) return DEFAULT_DISTANCE;

	switch (muzzleAttachment) {
		case "tacz:muzzle_silence_mirage":
			return 8;
	}
	return DEFAULT_DISTANCE;
}
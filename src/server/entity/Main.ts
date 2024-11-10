import { $ListTag, $Tag } from "../../libraries/JavaClasses";
import { OriginsHelper } from "../../libraries/OriginsHelper";




export namespace Entity {

	function getCommandName(entity: Internal.Entity): string {
		return entity.type === "minecraft:player" ? entity.username : entity.uuid.toString();
	}

	export function tick(entity: Internal.Entity): void {
		if (entity.living) {
			Living.tick(entity as any);
		}
	}



	namespace Living {
		export function tick(entity: Internal.LivingEntity): void {
			const resourceId = "command_survival:global/resource/time-since-last-movement";
			const username = getCommandName(entity as any);

			if (!OriginsHelper.entity(entity as any).hasPower(resourceId)) {
				Utils.server.runCommandSilent(`power grant ${username} ${resourceId}`);
			}

			let timeSinceLastMovement = Utils.server.runCommandSilent(`resource get ${username} ${resourceId}`);

			if (hasMoved(entity)) {
				timeSinceLastMovement = 0;
				updateMovementData(entity);
			}
			else {
				timeSinceLastMovement++;
			}
			Utils.server.runCommandSilent(`resource set ${username} ${resourceId} ${timeSinceLastMovement}`);
		}
		
		export function hasMoved(entity: Internal.LivingEntity): boolean {
			if (entity.persistentData.getDouble("pos_x") !== entity.x) return true;
			if (entity.persistentData.getDouble("pos_y") !== entity.y) return true;
			if (entity.persistentData.getDouble("pos_z") !== entity.z) return true;
			if (entity.persistentData.getDouble("yaw") !== entity.yaw) return true;
			if (entity.persistentData.getDouble("pitch") !== entity.pitch) return true;

			return false;
		}

		export function updateMovementData(entity: Internal.LivingEntity): void {
			entity.persistentData.putDouble("pos_x", entity.x);
			entity.persistentData.putDouble("pos_y", entity.y);
			entity.persistentData.putDouble("pos_z", entity.z);
			entity.persistentData.putDouble("yaw", entity.yaw);
			entity.persistentData.putDouble("pitch", entity.pitch);
		}
	}
}



ServerEvents.tick(event => {
	Utils.server.entities.forEach(entity => Entity.tick(entity));
});
import { Debug } from "../../libraries/Debug";
import { $DoubleTag, $ListTag, $Tag } from "../../libraries/JavaClasses";
import { OriginsHelper } from "../../libraries/OriginsHelper";




export namespace Entity {

	export function tick(entity: Internal.Entity) {
		if (entity.living) {
			LivingEntity.tick(entity as any);
		}
	}
}

export namespace LivingEntity {

	const RESOURCE_ID = "command_survival:global/resource/time-since-last-movement";
	let entity: Internal.LivingEntity;
	let commandName: string;
	let timeSinceLastMovement: number;

	export function tick(newEntity: Internal.LivingEntity) {
		entity = newEntity;

		commandName = entity.type === "minecraft:player" ? entity.username : entity.uuid.toString();

		if (!OriginsHelper.entity(entity as any).hasPower(RESOURCE_ID)) {
			Utils.server.runCommandSilent(`power grant ${commandName} ${RESOURCE_ID}`);
		}

		timeSinceLastMovement = Utils.server.runCommandSilent(`resource get ${commandName} ${RESOURCE_ID}`);

		if (hasMoved()) {
			timeSinceLastMovement = 0;
			updateMovementData();
		} else {
			timeSinceLastMovement++;
		}

		Utils.server.runCommandSilent(`resource set ${commandName} ${RESOURCE_ID} ${timeSinceLastMovement}`);
	}

	let pos_and_rot: Internal.ListTag;

	function hasMoved(): boolean {
		pos_and_rot = entity.persistentData.getList("posrot", $Tag.TAG_DOUBLE);
		return (
			pos_and_rot.getDouble(0) !== entity.x ||
			pos_and_rot.getDouble(1) !== entity.y ||
			pos_and_rot.getDouble(2) !== entity.z ||
			pos_and_rot.getDouble(3) !== entity.yaw ||
			pos_and_rot.getDouble(4) !== entity.pitch
		);
	}

	function updateMovementData(): void {
		pos_and_rot = new $ListTag();
		pos_and_rot.add(0, entity.x);
		pos_and_rot.add(1, entity.y);
		pos_and_rot.add(2, entity.z);
		pos_and_rot.add(3, $DoubleTag.valueOf(entity.yaw));
		pos_and_rot.add(4, $DoubleTag.valueOf(entity.pitch));
		entity.persistentData.put("posrot", pos_and_rot as any);
	};
}



ServerEvents.tick(event => {
	Utils.server.entities.forEach(entity => Entity.tick(entity));
});
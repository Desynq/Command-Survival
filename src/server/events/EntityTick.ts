import { $LivingEntity } from "../../libraries/JavaClasses";
import { OriginsHelper } from "../../libraries/OriginsHelper";
import { PINGED_RESOURCE_ID } from "./MobEffectTick";




ServerEvents.tick(event => {
	const entities: Internal.Entity[] = Utils.server.getEntities().toArray();

	for (let entity of entities) {
		if (entity instanceof $LivingEntity) {
			grantDefaultPowers(entity);
		}
	}
});


function grantDefaultPowers(entity: Internal.LivingEntity) {
	if (!OriginsHelper.entity(entity as any).hasPower(PINGED_RESOURCE_ID)) {
		Utils.server.runCommandSilent(`power grant ${entity.username} ${PINGED_RESOURCE_ID}`);
	}
}
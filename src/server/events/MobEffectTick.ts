


export const PINGED_RESOURCE_ID = "command_survival:global/resource/pinged-duration";

global.effectTick.Pinged = function (entity: Internal.LivingEntity, amplifier: number) {
	const commandName = entity.type === "minecraft:player" ? entity.username : entity.uuid.toString();
	const duration = entity.getEffect("kubejs:pinged").duration;

	Utils.server.runCommandSilent(`resource set ${commandName} ${PINGED_RESOURCE_ID} ${duration}`);
}
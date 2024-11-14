

global.events.LivingEntityUseItemEvent$Finish = function (event: Internal.LivingEntityUseItemEvent$Finish) {
	if (event.entity.type !== "minecraft:player") {
		return;
	}
	event.entity.tell("Wow! You finished using an item, congratulations!" as any);
}
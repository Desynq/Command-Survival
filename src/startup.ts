global.events = {
	LivingEntityUseItemEvent$Finish(event: Internal.LivingEntityUseItemEvent$Finish): void {},
	VanillaGameEvent(event: Internal.VanillaGameEvent): void {}
};

global.effectTick = {
	Pinged(entity: Internal.LivingEntity, effectLvl: number): void {}
}



BlockEvents.modification(event => {
	event.modify("dimdoors:block_ag_dim_dimdoors_quartz_door" as any, block => {
		block.destroySpeed = -1;
		block.explosionResistance = 3600000;
	});
});



StartupEvents.registry("minecraft:mob_effect", event => {

	event.create("pinged")
		.color(Color.DARK_AQUA)
		.harmful()
		.effectTick((entity, effectLvl) => global.effectTick.Pinged(entity, effectLvl))
		.displayName(Component.darkAqua("Pinged") as any)
});




ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingEntityUseItemEvent$Finish", event => global.events.LivingEntityUseItemEvent$Finish(event));
ForgeEvents.onEvent("net.minecraftforge.event.VanillaGameEvent", event => global.events.VanillaGameEvent(event));
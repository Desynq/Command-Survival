global.events = {
	LivingEntityUseItemEvent$Finish(event: Internal.LivingEntityUseItemEvent$Finish): void {}
};



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
		.effectTick((entity, effectLvl) => {
			// global.PingedMobEffect.tick()
		})
		.displayName(Component.darkAqua("Pinged") as any)
});




ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingEntityUseItemEvent$Finish", event => global.events.LivingEntityUseItemEvent$Finish(event));
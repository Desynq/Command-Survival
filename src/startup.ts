BlockEvents.modification(event => {
	event.modify("dimdoors:item_ag_dim_dimdoors_quartz_door" as any, block => {
		block.destroySpeed = -1;
		block.explosionResistance = 3600000;
	});
});
import { AttributeHelper } from "./libraries/AttributeHelper";
import { EntityHelper } from "./libraries/EntityHelper";
import { IOHelper } from "./libraries/IOHelper";
import * as AlexsMobsRecipes from "./server/datagen/recipes/AlexsMobs"
import { DimensionalDoorsRecipes } from "./server/datagen/recipes/DimensionalDoors";

const desynq = Utils.server.players.toArray()?.find(player => player.username == "Desynq");



ServerEvents.recipes(event => {
	AlexsMobsRecipes.register(event);
	DimensionalDoorsRecipes.register(event);
});



PlayerEvents.tick(event => {
	const player = event.player;
	if (player.username != "Desynq") {
		return;
	}
});



EntityEvents.hurt(event => {
	const entity = event.entity;
	if (entity.invulnerable) {
		event.cancel();
	}
});




ServerEvents.tick(event => {
	EntityHelper.ofType("minecraft:item").forEach((entity) => {
		const itemEntity = entity as Internal.ItemEntity;
		if (itemEntity.item.id == "minecraft:cobbled_deepslate" && itemEntity.lifespan == 6000) {
			itemEntity.lifespan = 200;
		}
	});
});
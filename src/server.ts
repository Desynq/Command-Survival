import { AttributeHelper } from "./libraries/AttributeHelper";
import { IOHelper } from "./libraries/IOHelper";
import * as AlexsMobsRecipes from "./server/datagen/recipes/AlexsMobs"
import { DimensionalDoorsRecipes } from "./server/datagen/recipes/DimensionalDoors";




ServerEvents.recipes(event => {
	AlexsMobsRecipes.register(event);
	DimensionalDoorsRecipes.register(event);
});



PlayerEvents.tick(event => {
	const { server, player } = event;
	if (player.username != "Desynq") {
		return;
	}

	const attribute = AttributeHelper.getAttributeFromId(server, "minecraft:generic.max_health");
	const maxHealth = player.attributes.getInstance(attribute).getValue();
});



EntityEvents.hurt(event => {
	const entity = event.entity;
	if (entity.invulnerable) {
		event.cancel();
	}
});
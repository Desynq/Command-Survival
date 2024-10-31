import { AttributeModifierHelper } from "./libraries/AttributeModifierHelper";
import * as AlexsMobsRecipes from "./server/recipes/AlexsMobs"




ServerEvents.recipes(event => {
	AlexsMobsRecipes.register(event);
});



PlayerEvents.tick(event => {
	const { server, player } = event;
	const attribute = AttributeModifierHelper.getAttributeFromId(server, "minecraft:generic.max_health");
	const maxHealth = player.attributes.getInstance(attribute).getValue();
});
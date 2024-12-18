import { EntityHelper } from "./server/entity/Helper";
import { DieCommand } from "./server/commands/Die";
import * as AlexsMobsRecipes from "./server/datagen/recipes/AlexsMobs";
import { DimensionalDoorsRecipes } from "./server/datagen/recipes/DimensionalDoors";
import { PlayerTick } from "./server/player/Tick";
import { OnServerLoad } from "./server/world/OnLoad";
import { RecipesHandler } from "./server/datagen/recipes/_RecipesHandler";
import { LootTableHandler } from "./server/datagen/loot_tables/_Handler";

import "./server/datagen/datagen";
import "./server/datagen/powers/_main";

import "./server/entity/Main";

import "./server/player/Respawned";

import "./server/world/dimension/MystFacility";

import "./server/commands/Run";
import "./server/commands/Update";
import "./server/commands/Admin";

import "./server/events/LivingEntityUseItemEvent$Finish";
import "./server/events/SwitchedOrigin";
import "./server/events/InventoryChanged";
import "./server/events/VanillaGameEvent";
import "./server/events/MobEffectTick";
import "./server/events/EntityTick";
import "./server/events/RightClickBlock";



ServerEvents.recipes(event => {
	AlexsMobsRecipes.register(event);
	DimensionalDoorsRecipes.register(event);
	RecipesHandler.register(event);
});

ServerEvents.commandRegistry(event => {
	DieCommand.register(event);
});

ServerEvents.tick(event => {
	OnServerLoad.main();
});



PlayerEvents.tick(event => PlayerTick.main(event.player));



EntityEvents.hurt(event => {
	const entity = event.entity;
	if (entity.invulnerable || entity.getEffect("minecraft:resistance")?.amplifier === 255) {
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


PlayerEvents.decorateChat(event => {
	let message = event.message.replace(":skull:", "☠");
	event.setMessage(message as any);
});

ServerEvents.command(event => {
	if (["w", "tell", "msg"].indexOf(event.commandName) === -1) {
		return;
	}
	const admins: Array<Internal.Player> = event.server.players.toArray().filter((player: Internal.Player) => player.hasPermissions(4));
	let input = event.input;
	input.replace(":skull:", "☠");
	if (input !== event.input) {
		event.server.runCommandSilent(input);
		event.cancel();
	}
});

LootJS.modifiers(event => LootTableHandler.register(event));
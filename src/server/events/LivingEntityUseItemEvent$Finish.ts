import { OriginsHelper } from "../../libraries/OriginsHelper";


global.events.LivingEntityUseItemEvent$Finish = function (event: Internal.LivingEntityUseItemEvent$Finish) {
	if (event.entity.type !== "minecraft:player") {
		return;
	}
	event.entity.tell("Wow! You finished using an item, congratulations!" as any);

	const origin = OriginsHelper.entity(event.entity).getOriginId();

	switch (origin) {
		case "command_survival:sculker":
			SculkXPEat.eaten(event.entity as Player, event.item);
			break;
	}
}



class SculkXPEat {

	public static eaten(player: Player, itemStack: Internal.ItemStack) {
		const foodProperties = itemStack.item.foodProperties;

		if (!foodProperties.isMeat) {
			return;
		}

		const tags = player.tags.toArray();
		const tagModifiers = new Map([
			["origin.sculker.carnivore_3", 1/2],
			["origin.sculker.carnivore_2", 1/3],
			["origin.sculker.carnivore_1", 1/6]
		]);

		let modifier;
		for (const [tag, value] of tagModifiers) {
			if (tags.includes(tag)) {
				modifier = value;
				break;
			}
		}
		if (modifier === undefined) {
			return;
		}

		const saturation = foodProperties.nutrition * foodProperties.saturationModifier;
		player.xp += Math.floor((foodProperties.nutrition + saturation) * modifier);
	}
}
import { $CompoundTag } from "../../../libraries/JavaClasses";
import { ShapedRecipeTemplate } from "./Main";



export abstract class RecipesHandler {
	public static handlers: RecipesHandler[] = [];

	protected constructor() { }

	protected abstract handleEvent(event: Internal.RecipesEventJS): void;

	public static register(event: Internal.RecipesEventJS): void {
		this.handlers.forEach(handler => {
			handler.handleEvent(event);
		});
	}
}

class LesRaisinsArmorRecipes extends RecipesHandler {
	public static instance = new this();

	protected constructor() {
		super();
		RecipesHandler.handlers.push(this);
	}

	protected handleEvent(event: Internal.RecipesEventJS): void {
		event.remove({ mod: "lrarmor" });
	}
}

class AlexsCavesRecipes extends RecipesHandler {
	public static instance = new this();

	protected constructor() {
		super();
		RecipesHandler.handlers.push(this);
	}

	protected handleEvent(event: Internal.RecipesEventJS): void {
		//@ts-ignore
		event.shaped(
			//@ts-ignore
			Item.of("alexscaves:cave_tablet", 1, {CaveBiome: "alexscaves:magnetic_caves", display: { Lore: ['{"italic": false, "color": "blue", "text": "Magnetic Caves"}']}}),
			[
				"012",
				"343",
				"012"
			],
			{
				"0": "minecraft:copper_ingot",
				"1": "minecraft:iron_ingot",
				"2": "minecraft:gold_ingot",
				"3": "dimdoors:world_thread",
				"4": "minecraft:lodestone"
			}
		);
		//@ts-ignore
		event.shaped(
			//@ts-ignore
			Item.of("alexscaves:cave_tablet", 1, { CaveBiome: "alexscaves:toxic_caves", display: { Lore: ['{"italic": false, "color": "blue", "text": "Toxic Caves"}'] } }),
			[
				"010",
				"232",
				"414"
			],
			{
				"0": "minecraft:gunpowder",
				"1": "minecraft:spider_eye",
				"2": "dimdoors:world_thread",
				"3": "minecraft:lodestone",
				"4": "minecraft:slime_ball"
			}
		);
	}
}
import { $CompoundTag } from "../../../libraries/JavaClasses";
import { ShapedRecipeTemplate } from "./Main";



export abstract class RecipesHandler {
	public static handlers: RecipesHandler[] = [];
	protected event: Internal.RecipesEventJS | undefined;

	protected abstract handleEvent(event: Internal.RecipesEventJS): void;

	protected newShaped(item: Internal.ItemStack, pattern: string[], key: Record<string, string>): void {
		//@ts-ignore
		this.event.shaped(item, pattern, key);
	}

	protected newShapeless(item: Internal.ItemStack, pattern: string[]): void {
		//@ts-ignore
		this.event.shapeless(item, pattern);
	}

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



enum Color {
	GREEN = "green",
	YELLOW = "yellow",
	BLUE = "blue",
	RED = "red",
	PURPLE = "purple",
	BROWN = "brown",
	ORANGE = "orange",
}
class DyeRecipes extends RecipesHandler {
	public static instance = new this();

	private constructor() {
		super();
		RecipesHandler.handlers.push(this);
	}

	protected handleEvent(event: Internal.RecipesEventJS): void {
		this.event = event;

		this.newDyeRecipe(Color.GREEN, 2, Color.BLUE, Color.YELLOW);

		this.newDyeRecipe(Color.BROWN, 3, Color.BLUE, Color.RED, Color.YELLOW);
		this.newDyeRecipe(Color.BROWN, 2, Color.GREEN, Color.RED);
		this.newDyeRecipe(Color.BROWN, 2, Color.PURPLE, Color.YELLOW);
		this.newDyeRecipe(Color.BROWN, 2, Color.ORANGE, Color.BLUE);
	}



	private newDyeRecipe(color: Color, amount: number, ...colors: Color[]): this;

	private newDyeRecipe(color: Color, amount: number): this {
		const colors: Color[] = Array.from(arguments).slice(2);
		if (!colors) {
			console.warn(`Recipe for minecraft:${color}_dye was not able to created due to missing at least one ingredient`);
			return this;
		}
		const ids = colors.map(color => `minecraft:${color}_dye`);

		this.newShapeless(Item.of(`minecraft:${color}_dye`, amount), ids);
		return this;
	}
}





class Cave {
	public static readonly ABYSSAL_CHASM = new this("alexscaves:abyssal_chasm", "Abyssal Chasm");
	public static readonly CANDY_CAVITY = new this("alexscaves:candy_cavity", "Candy Cavity");
	public static readonly FORLORN_HOLLOWS = new this("alexscaves:forlorn_hollows", "Forlorn Hollows");
	public static readonly MAGNETIC_CAVES = new this("alexscaves:magnetic_caves", "Magnetic Caves");
	public static readonly PRIMORDIAL_CAVES = new this("alexscaves:primordial_caves", "Primordial Caves");
	public static readonly TOXIC_CAVES = new this("alexscaves:toxic_caves", "Toxic Caves");

	public id: string;
	public displayName: string

	private constructor(id: string, displayName: string) {
		this.id = id;
		this.displayName = displayName;
	}
}

class AlexsCavesRecipes extends RecipesHandler {
	public static instance = new this();

	private constructor() {
		super();
		RecipesHandler.handlers.push(this);
	}

	protected handleEvent(event: Internal.RecipesEventJS): void {
		this.event = event;

		this.newCaveTabletRecipe(
			Cave.MAGNETIC_CAVES,
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
		)
		.newCaveTabletRecipe(
			Cave.TOXIC_CAVES,
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
		)
		.newCaveTabletRecipe(
			Cave.PRIMORDIAL_CAVES,
			[
				"010",
				"232",
				"414"
			],
			{
				"0": "minecraft:bone",
				"1": "minecraft:bone_block",
				"2": "dimdoors:world_thread",
				"3": "minecraft:lodestone",
				"4": "alexsmobs:bone_serpent_tooth"
			}
		)
		.newCaveTabletRecipe(
			Cave.CANDY_CAVITY,
			[
				"010",
				"232",
				"010"
			],
			{
				"0": "alexscaves:spelunkie",
				"1": "minecraft:cake",
				"2": "dimdoors:world_thread",
				"3": "minecraft:lodestone"
			}
		);
	}

	private newCaveTabletRecipe(cave: Cave, pattern: string[], key: Record<string, string>): this {
		this.newShaped(this.getCaveTabletItem(cave), pattern, key);
		return this;
	}

	private getCaveTabletItem(cave: Cave): Internal.ItemStack {
		const nbt = NBT.toTagCompound({
			CaveBiome: cave.id,
			display: {
				Lore: [
					JSON.stringify({
						italic: false,
						color: "blue",
						text: cave.displayName
					})
				]
			}
		});
		return Item.of("alexscaves:cave_tablet", 1, nbt);
	}
}
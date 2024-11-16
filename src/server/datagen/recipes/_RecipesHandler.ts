import { $CompoundTag } from "../../../libraries/JavaClasses";
import { ShapedRecipeTemplate } from "./Main";



export abstract class RecipesHandler {
	protected static handlers: RecipesHandler[] = [];
	protected event!: Internal.RecipesEventJS;

	protected abstract handleEvent(): void



	protected newShapedOld(item: Internal.ItemStack, pattern: string[], key: Record<string, string>): void {
		//@ts-ignore
		this.event.shaped(item, pattern, key);
	}

	protected newShapedRecipe(item: Internal.ItemStack, table: Special.Item[][]): void {
		const [pattern, key] = RecipeHelper.convertTable(table);
		//@ts-ignore
		this.event.shaped(item, pattern, key);
	}

	protected newShapelessRecipe(item: Internal.ItemStack, pattern: string[]): void {
		//@ts-ignore
		this.event.shapeless(item, pattern);
	}



	public static register(event: Internal.RecipesEventJS): void {
		this.handlers.forEach(handler => {
			handler.event = event;
			handler.handleEvent();
		});
	}
}

export class RecipeHelper {

	public static convertTable(table: Special.Item[][]): [string[], Record<string, Special.Item>] {
		const pattern: string[] = [];
		const key: Record<string, Special.Item> = {};
		let index = 0;
		for (let row of table) {
			let rowPattern: string = "";
			for (let itemId of row) {
				rowPattern += index.toString();
				key[index.toString()] = itemId;
				index++;
			}
			pattern.push(rowPattern);
		}
		return [pattern, key];
	}
}

class LesRaisinsArmorRecipes extends RecipesHandler {
	public static instance = new this();

	protected constructor() {
		super();
		RecipesHandler.handlers.push(this);
	}

	protected handleEvent(): void {
		this.event.remove({ mod: "lrarmor" });
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

	protected handleEvent(): void {
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

		this.newShapelessRecipe(Item.of(`minecraft:${color}_dye`, amount), ids);
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
	public displayName: string;

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

	protected handleEvent(): void {
		this
			.newCaveTabletRecipe(
				Cave.MAGNETIC_CAVES,
				[
					["minecraft:black_dye", "minecraft:redstone", "minecraft:black_dye"],
					["minecraft:copper_ingot", "minecraft:lodestone", "minecraft:iron_ingot"],
					["minecraft:black_dye", "minecraft:gold_ingot", "minecraft:black_dye"]
				]
			)
			.newCaveTabletRecipe(
				Cave.PRIMORDIAL_CAVES,
				[
					["minecraft:yellow_dye", "minecraft:bone", "minecraft:yellow_dye"],
					["minecraft:bone", "minecraft:lodestone", "minecraft:bone"],
					["minecraft:yellow_dye", "minecraft:bone", "minecraft:yellow_dye"]
				]
			)
			.newCaveTabletRecipe(
				Cave.FORLORN_HOLLOWS,
				[
					["minecraft:brown_dye", "alexscaves:guano", "minecraft:brown_dye"],
					["alexscaves:guano", "minecraft:lodestone", "alexscaves:guano"],
					["minecraft:brown_dye", "alexscaves:guano", "minecraft:brown_dye"]
				]
			)
			.newCaveTabletRecipe(
				Cave.TOXIC_CAVES,
				[
					["minecraft:lime_dye", "alexscaves:cinder_brick", "minecraft:lime_dye"],
					["alexscaves:cinder_brick", "minecraft:lodestone", "alexscaves:cinder_brick"],
					["minecraft:lime_dye", "alexscaves:cinder_brick", "minecraft:lime_dye"]
				]
			)
			.newCaveTabletRecipe(
				Cave.ABYSSAL_CHASM,
				[
					["minecraft:blue_dye", "minecraft:prismarine_crystals", "minecraft:blue_dye"],
					["minecraft:prismarine_crystals", "minecraft:lodestone", "minecraft:prismarine_crystals"],
					["minecraft:blue_dye", "minecraft:prismarine_crystals", "minecraft:blue_dye"]
				]
			)
			.newCaveTabletRecipe(
				Cave.CANDY_CAVITY,
				[
					["minecraft:pink_dye", "minecraft:cake", "minecraft:pink_dye"],
					["minecraft:cake", "minecraft:lodestone", "minecraft:cake"],
					["minecraft:pink_dye", "minecraft:cake", "minecraft:pink_dye"]
				]
			);
	}

	private newCaveTabletRecipe(cave: Cave, table: Special.Item[][]): this {
		this.newShapedRecipe(this.getCaveTabletItem(cave), table);
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
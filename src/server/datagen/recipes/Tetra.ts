import { RecipesHandler } from "./_RecipesHandler";


class Tetra extends RecipesHandler {
	public static instance = new this();

	private constructor() {
		super();
		RecipesHandler.handlers.push(this);
	}

	private static readonly RECIPE_IDS_TO_REMOVE: Special.RecipeId[] = [
		"tetra:thousand_cold_night_scroll",
		"tetra:rending_scissor_scroll",
		"tetra:katana_scroll",
		"tetra:crucible_scroll",
		"tetra:architects_crucible_scroll",
		"tetra:murasama_scroll"
	];

	protected handleEvent() {
		for (let recipeId of Tetra.RECIPE_IDS_TO_REMOVE) {
			this.event.remove({ id: recipeId });
		}

		this.newShapedRecipe(Item.of("tetra:hammer_base", 1), [
			["minecraft:iron_block", "art_of_forging:forged_steel_ingot", "minecraft:iron_block"],
			["art_of_forging:forged_steel_ingot", "deeperdarker:heart_of_the_deep", "art_of_forging:forged_steel_ingot"],
			["minecraft:iron_block", "art_of_forging:forged_steel_ingot", "minecraft:iron_block"]
		]);
	}
}
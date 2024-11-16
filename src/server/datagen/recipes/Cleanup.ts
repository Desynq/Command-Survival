import { RecipesHandler } from "./_RecipesHandler";



export class CleanupRecipes extends RecipesHandler {
	public static instance = new this();

	protected constructor() {
		super();
		RecipesHandler.handlers.push(this);
	}

	private readonly RECIPES_TO_REMOVE: Special.RecipeId[] = [
		"oreganized:ginger_crystal_glass_pane",
		"twilightdelight:neapolitan/glacier_cake_slice",
		"oreganized:tan_crystal_glass",
		"oreganized:aqua_crystal_glass",
		"oreganized:waxed_forest_concrete_powder",
		"mowziesdelight:cooking/cooked_foliaath_from_campfire_cooking",
		"oreganized:waxed_indigo_concrete_powder",
		"oreganized:amber_crystal_glass",
		"oreganized:aqua_crystal_glass_pane",
		"oreganized:forest_crystal_glass_pane",
		"mowziesdelight:cooking/cooked_foliaath_from_smoking",
		"oreganized:rose_crystal_glass_pane",
		"oreganized:teal_crystal_glass",
		"oreganized:maroon_crystal_glass_pane",
		"oreganized:slate_crystal_glass_pane",
		"twilightdelight:rainbow_ice_cream",
		"twilightdelight:twilight_ice_cream",
		"oreganized:waxed_teal_concrete_powder",
		"oreganized:waxed_mint_concrete_powder",
		"twilightdelight:neapolitan/aurora_cake_slice",
		"oreganized:waxed_aqua_concrete_powder",
		"oreganized:waxed_ginger_concrete_powder",
		"alexsdelight:barbecue_on_a_stick",
		"oreganized:olive_crystal_glass",
		"oreganized:amber_crystal_glass_pane",
		"oreganized:slate_crystal_glass",
		"oreganized:electrum_shield",
		"create_netherless:soul_sand_from_sequenced_assembly",
		"oreganized:waxed_rose_concrete_powder",
		"oreganized:waxed_coral_concrete_powder",
		"twilightdelight:neapolitan/torchberry_cake_slice",
		"oreganized:mint_crystal_glass_pane",
		"mowziesdelight:cooking/cooked_foliaath",
		"oreganized:maroon_crystal_glass",
		"oreganized:waxed_amber_concrete_powder",
		"oreganized:navy_crystal_glass_pane",
		"oreganized:ginger_crystal_glass",
		"oreganized:waxed_slate_concrete_powder",
		"oreganized:verdant_crystal_glass",
		"oreganized:verdant_crystal_glass_pane",
		"oreganized:waxed_beige_concrete_powder",
		"oreganized:waxed_olive_concrete_powder",
		"oreganized:indigo_crystal_glass",
		"oreganized:beige_crystal_glass_pane",
		"oreganized:waxed_verdant_concrete_powder",
		"oreganized:beige_crystal_glass",
		"oreganized:waxed_navy_concrete_powder",
		"oreganized:navy_crystal_glass",
		"oreganized:waxed_tan_concrete_powder",
		"oreganized:olive_crystal_glass_pane",
		"oreganized:electrum_machete",
		"oreganized:tan_crystal_glass_pane",
		"oreganized:tan_crystal_glass_pane",
		"oreganized:waxed_maroon_concrete_powder",
		"twilightdelight:refreshing_ice_cream",
		"oreganized:rose_crystal_glass",
		"twilightdelight:neapolitan/phytochemical_cake_slice",
		"oreganized:coral_crystal_glass",
		"oreganized:forest_crystal_glass",
		"oreganized:mint_crystal_glass",
		"oreganized:teal_crystal_glass_pane",
		"oreganized:indigo_crystal_glass_pane",
		"oreganized:coral_crystal_glass_pane"
	]
	protected handleEvent(): void {
		for (let recipeId of this.RECIPES_TO_REMOVE) {
			this.event.remove({id: recipeId});
		}
	}
}
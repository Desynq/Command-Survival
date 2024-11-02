import { ShapedRecipe, ShapedRecipeTemplate } from "./Main";

export class DimensionalDoorsRecipes {
	private event: Internal.RecipesEventJS;

	private constructor(event: Internal.RecipesEventJS) {
		this.event = event;
		this.removeRecipes();
		this.addShapedRecipes();
	}

	private readonly RECIPES_TO_REMOVE = [
		"dimdoors:iron_dimensional_door",
		"dimdoors:oak_dimensional_door",
		"dimdoors:gold_dimensional_door",
		"dimdoors:quartz_dimensional_door",
		"dimdoors:stabilized_rift_signature",
		"dimdoors:rift_signature"
	];

	private readonly SHAPED_RECIPES: Array<ShapedRecipeTemplate> = [
		[
			Item.of("dimdoors:item_ag_dim_minecraft_iron_door", 1),
			[
				" 0 ",
				"121",
				" 0 "
			],
			[
				"minecraft:echo_shard",
				"minecraft:iron_door",
				"dimdoors:stable_fabric"
			]
		],
		[
			Item.of("minecraft:echo_shard", 1),
			[
				"010",
				"010",
				"010"
			],
			[
				"minecraft:amethyst_shard",
				"minecraft:ender_pearl"
			]
		],
		[
			Item.of("dimdoors:stabilized_rift_signature", 1),
			[
				"010",
				"232",
				"040"
			],
			[
				"dimdoors:stable_fabric",
				"alexscaves:azure_magnet",
				"dimdoors:rift_stabilizer",
				"dimdoors:rift_signature",
				"alexscaves:scarlet_magnet"
			]
		],
		[
			Item.of("dimdoors:item_ag_dim_dimdoors_quartz_door", 1),
			[
				"010",
				"232",
				"010"
			],
			[
				"dimdoors:fabric_of_finality",
				"dimdoors:fuzzy_fireball",
				"dimdoors:quartz_door",
				"dimdoors:stabilized_rift_signature"
			]
		],
		[
			Item.of("dimdoors:rift_signature"),
			[
				"010",
				"121",
				"010"
			],
			[
				"minecraft:iron_ingot",
				"minecraft:ender_pearl",
				"dimdoors:rift_pearl"
			]
		],
		[
			Item.of("dimdoors:item_ag_dim_dimdoors_quartz_door", 2),
			[
				" 0 ",
				"121"
			],
			[
				"minecraft:nether_star",
				"dimdoors:quartz_door",
				"dimdoors:item_ag_dim_dimdoors_quartz_door"
			]
		]
	];

	private removeRecipes() {
		for (let recipe of this.RECIPES_TO_REMOVE) {
			this.event.remove(recipe as any);
		}
	}

	private addShapedRecipes() {
		for (let template of this.SHAPED_RECIPES) {
			let recipe = new ShapedRecipe(template[0], template[1], template[2]);
			//@ts-ignore
			this.event.shaped(recipe.itemStack, recipe.shape, recipe.getIngredients());
		}
	}

	public static register(event: Internal.RecipesEventJS) {
		new this(event);
	}
}
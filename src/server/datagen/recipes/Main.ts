


export type ShapedRecipeTemplate = [Internal.ItemStack, Array<string>, Array<string>]

export class ShapedRecipe {
	public itemStack : Internal.ItemStack;
	public shape : Array<string>;
	private ingredients: Array<string>

	public constructor(itemStack: Internal.ItemStack, shape: Array<string>, ingredients: Array<string>) {
		this.itemStack = itemStack;
		this.shape = shape;
		this.ingredients = ingredients;
	}

	public getIngredients(): Record<string, string> {
		const record: Record<string, string> = {};
		this.ingredients.forEach((ingredient, index) => {
			record[index.toString()] = ingredient;
		});
		return record;
	}
}
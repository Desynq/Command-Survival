


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

	}
}
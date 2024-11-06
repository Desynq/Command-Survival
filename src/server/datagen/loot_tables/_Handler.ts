


export abstract class LootTableHandler {
	protected static handlers: LootTableHandler[] = [];

	protected event: Internal.LootModificationEventJS | undefined;

	protected abstract handleEvent(event: Internal.LootModificationEventJS): void;



	public static register(event: Internal.LootModificationEventJS): void {
		this.handlers.forEach(handler => handler.handleEvent(event));
	}
}



class BatLootTable extends LootTableHandler {
	public static readonly instance: BatLootTable = new this();

	private constructor() {
		super();
		LootTableHandler.handlers.push(this);
	}

	protected handleEvent(event: Internal.LootModificationEventJS): void {
		this.event = event;

		this.event
			.addLootTableModifier("minecraft:entities/bat" as any)
			.randomChanceWithLooting(0.25, 0.25)
			.addLoot("alexscaves:guano" as any);
	}
}
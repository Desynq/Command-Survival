


export class PowerResource {
	public static readonly COGWORK_FLAMETHROWER_COOLDOWN = new this("command_survival:origins/cogwork/flamethrower_cooldown", 0, 10_000);

	private constructor(
		public id: string,
		public min: number,
		public max: number
	) { }

	public get(entity: Internal.Entity): number {
		return Utils.server.runCommandSilent(`resource get ${entity.username} ${this.id}`);
	}

	public set(entity: Internal.Entity, value: number): void {
		Utils.server.runCommandSilent(`resource set ${entity.username} ${this.id} ${Math.floor(value)}`);
	}

	public setMax(entity: Internal.Entity): void {
		this.set(entity, this.max);
	}

	public change(entity: Internal.Entity, amount: number): void {
		// Math.ceil() ensures that a change occurs when amount < 1 but amount > 0, and also to punish the player because why not lmao
		Utils.server.runCommandSilent(`resource change ${entity.username} ${this.id} ${Math.ceil(amount)}`);
	}

	public changeByPercentage(entity: Internal.Entity, float: number): void {
		const amount = float * this.max;
		this.change(entity, amount);
	}

	/**
	 * Assuming resource is at maximum value, it will roughly take the amount of ticks specified for it to get to its minimum value
	 */
	public decrementByTick(entity: Internal.Entity, ticks: number): void {
		const changePerTick = (Math.abs(this.min) + Math.abs(this.max)) / ticks;
		this.change(entity, -changePerTick);
	}
}
export class PlayerMoney {
	private static KEY = "player_money";

	public static get(server: Internal.MinecraftServer, uuid: string): number {
		return server.persistentData.getCompound(this.KEY).getLong(uuid);
	}

	public static set(server: Internal.MinecraftServer, uuid: string, amount: number): void {
		const compoundTag = server.persistentData.getCompound(this.KEY);
		compoundTag.putLong(uuid, amount);

		server.persistentData.put(this.KEY, compoundTag as unknown as Internal.Tag_);
	}

	public static add(server: Internal.MinecraftServer, uuid: string, amount: number): void {
		const money = this.get(server, uuid);
		this.set(server, uuid, money + amount);
	}
}
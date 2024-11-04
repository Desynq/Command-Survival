


export class PlayerHelper {
	private static uuidCache: Record<string, Internal.Player> = {};

	public static fromUUID(uuid: string): Internal.Player | null {
		const cachedPlayer = this.uuidCache[uuid];
		if (cachedPlayer) return cachedPlayer;

		for (const player of Utils.server.players.toArray() as Internal.Player[]) {
			if (player.uuid.toString() == uuid) {
				this.uuidCache[uuid] = player;
				return player;
			}
		}
		return null;
	}
}
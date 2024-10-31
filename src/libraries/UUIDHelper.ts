


export class UUIDHelper {
	
	public static getPlayer(server: Internal.MinecraftServer, uuid: string): Internal.Player | undefined {
		return server.players.toArray().find((player: Internal.Player) => player.uuid.toString() == uuid);
	}
}
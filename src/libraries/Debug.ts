


export class Debug {
	public static logAdmin(message: string) {
		const players: Internal.Player[] = Utils.server.players.toArray();
		if (!players) {
			return;
		}
		const admins = players.filter(player => player.hasPermissions(4));
		if (!admins) {
			return;
		}
		admins.forEach(admin => admin.tell(message as any));
	}
}
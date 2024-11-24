


export class Debug {
	/**
	 * @deprecated
	 */
	public static logAdmin(message: string): void {
		this.logToAdmins(message);
	}

	public static logToAdmins(message: string): void {
		for (let player of Utils.server.players as unknown as Player[]) {
			this.logIfAdmin(player, message);
		}
	}

	public static logIfAdmin(player: Player, message: string): void {
		if (!player.hasPermissions(4)) {
			return;
		}

		player.paint({
			"debug": {
				type: "text",
				text: `${message}`,
				color: "white",
				shadow: true,
				alignX: "left",
				alignY: "bottom",
				x: 0,
				y: 0,
				scale: 0.5
			}
		});
	}
}
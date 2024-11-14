


export class SculkOrigin {

	private static readonly RESOURCE_IDS = {
		ABSORB_LEVEL: "command_survival:origins/sculker/absorb_level"
	};
	public static getAbsorbLevel(player: Player): number {
		return Utils.server.runCommandSilent(`resource get ${player.username} ${this.RESOURCE_IDS.ABSORB_LEVEL}`);
	}

	public static setAbsorbLevel(player: Player, amount: number): void {
		Utils.server.runCommandSilent(`resource set ${player.username} ${this.RESOURCE_IDS.ABSORB_LEVEL} ${amount}`);
	}

	public static addAbsorbLevel(player: Player, amount: number): void {
		let absorbLevel = this.getAbsorbLevel(player) + amount;
		this.setAbsorbLevel(player, absorbLevel);
	}
}
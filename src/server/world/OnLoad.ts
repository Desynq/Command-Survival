import { Debug } from "../../libraries/Debug";



export class OnServerLoad {
	private static loaded: boolean = false;

	public static main() {
		if (this.loaded) {
			return;
		}
		this.loaded = true;

		Utils.server.allLevels.forEach(level => {
			this.adjustWorldBorder(level);
		});
	}

	private static adjustWorldBorder(level: Internal.ServerLevel) {
		const worldBorder = level.worldBorder;
		const dimension = level.dimension.toString();

		if (dimension.startsWith("command_survival:underground/")) {
			worldBorder.setCenter(0.0, 0.0);
			worldBorder.size = 1024;
		}
	}
}
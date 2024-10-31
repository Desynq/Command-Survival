import { UUIDHelper } from "../../../libraries/UUIDHelper";
import { StatsDataHelper } from "./DataHelper";
import { StatType, VariableAttributeModifier } from "./StatTypes";


export class StatsApplier {

	private server: Internal.MinecraftServer;
	private player: Internal.Player;
	private playerUUID: string;
	private statsDataHelper: StatsDataHelper;

	private constructor(server: Internal.MinecraftServer, player: Internal.Player, statsDataHelper?: StatsDataHelper) {
		this.server = server;
		this.player = player;
		this.playerUUID = this.player.uuid.toString();
		this.statsDataHelper = statsDataHelper ?? new StatsDataHelper(server, this.playerUUID);
	}



	public static applyStatsFromUUID(server: Internal.MinecraftServer, uuid: string, statsDataHelper?: StatsDataHelper): void {
		const player = UUIDHelper.getPlayer(server, uuid);
		if (player) {
			this.applyStats(server, player, statsDataHelper);
		}
	}

	public static applyStats(server: Internal.MinecraftServer, player: Internal.Player, statsDataHelper?: StatsDataHelper): void {
		new StatsApplier(server, player, statsDataHelper);
	}



	private applyGenericAttribute(statType: StatType, modifier: VariableAttributeModifier, amountPerPoint: number) {
		const points = this.statsDataHelper.getPointsFromStat(statType);
		const newValue = amountPerPoint * points;
	}

	private applyStrengthStat(): void {
		this.applyGenericAttribute(StatType.STRENGTH, StatType.STRENGTH.modifiers[0], 0.025);
	}
}
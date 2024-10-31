import { Money } from "../../../libraries/Money";
import { StatType } from "./StatTypes";

export class StatsDataHelper {
	public static POINT_COST_SCALING_FACTOR = Money.fromDollar(80.00);

	protected ROOT_KEY = "player_stats";
	protected TOTAL_POINTS_KEY = "total_points";
	protected STATS_KEY = "stats";

	protected server: Internal.MinecraftServer;
	protected playerUUID: string;

	public constructor(server: Internal.MinecraftServer, playerUUID: string) {
		this.server = server;
		this.playerUUID = playerUUID;
	}

	protected getPlayerCompound(): Internal.CompoundTag {
		return this.server.persistentData.getCompound(this.ROOT_KEY).getCompound(this.playerUUID);
	}

	protected getStatsCompound(): Internal.CompoundTag {
		return this.getPlayerCompound().getCompound(this.STATS_KEY);
	}

	protected setPlayerCompound(playerCompound: Internal.CompoundTag): void {
		const rootCompound = this.server.persistentData.getCompound(this.ROOT_KEY);

		rootCompound.put(this.playerUUID, playerCompound as unknown as Internal.Tag_);

		this.server.persistentData.put(this.ROOT_KEY, rootCompound as unknown as Internal.Tag_);
	}

	protected setStatsCompound(statsCompound: Internal.CompoundTag): void {
		const playerCompound = this.getPlayerCompound();

		playerCompound.put(this.STATS_KEY, statsCompound as unknown as Internal.Tag_);

		this.setPlayerCompound(playerCompound);
	}



	public getTotalPoints(): number {
		return this.getPlayerCompound().getInt(this.TOTAL_POINTS_KEY);
	}

	public getSpentPoints(): number {
		const statsCompound = this.getStatsCompound();

		let spentPoints = 0;
		statsCompound.allKeys.forEach(key => spentPoints += statsCompound.getInt(key) );
		return spentPoints;
	}

	public getSparePoints(): number {
		return this.getTotalPoints() - this.getSpentPoints();
	}

	public getPointsFromStat(statType: StatType): number {
		return this.getStatsCompound().getInt(statType.name);
	}



	protected setPoints(amount: number): void {
		const playerCompound = this.getPlayerCompound();
		
		playerCompound.putInt(this.TOTAL_POINTS_KEY, amount);
		this.setPlayerCompound(playerCompound);
	}



	protected addPoints(amount: number): void {
		this.setPoints(this.getTotalPoints() + amount);
	}

	public getNextPointValue(): number {
		return StatsDataHelper.POINT_COST_SCALING_FACTOR * this.getTotalPoints();
	}
}
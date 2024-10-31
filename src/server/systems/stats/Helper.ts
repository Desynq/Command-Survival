import { PlayerMoney } from "../../../libraries/PlayerMoney";
import { StatsApplier } from "./Applier";
import { StatsDataHelper } from "./DataHelper";
import { StatType } from "./StatTypes";

export class StatsHelper extends StatsDataHelper {

	public buyPoint(): "NOT_ENOUGH_MONEY" | "SUCCESS" {
		const cost = this.getNextPointValue();
		let money = PlayerMoney.get(this.server, this.playerUUID);

		if (money < cost) {
			return "NOT_ENOUGH_MONEY";
		}
		money -= cost;
		PlayerMoney.set(this.server, this.playerUUID, money);
		this.addPoints(1);
		return "SUCCESS";
	}

	public resetStats(): void {
		const playerCompound = this.getPlayerCompound();
		playerCompound.remove(this.STATS_KEY);
		this.setPlayerCompound(playerCompound);

		StatsApplier.applyStatsFromUUID(this.server, this.playerUUID);
	}

	public spendPoints(statType: StatType, amount: number): "AMOUNT_NOT_VALID" | "NOT_ENOUGH_POINTS" | "SUCCESS" {
		if (amount <= 0) {
			return "AMOUNT_NOT_VALID";
		}
		const sparePoints = this.getSparePoints();
		if (amount > sparePoints) {
			return "NOT_ENOUGH_POINTS";
		}

		const statsCompound = this.getStatsCompound();
		const newAmount = this.getPointsFromStat(statType) + amount;
		statsCompound.putInt(statType.name, newAmount);
		this.setStatsCompound(statsCompound);

		StatsApplier.applyStatsFromUUID(this.server, this.playerUUID);
		return "SUCCESS";
	}
}
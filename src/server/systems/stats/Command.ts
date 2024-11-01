import { Money } from "../../../libraries/Money";
import { PlayerMoney } from "../../../libraries/PlayerMoney";
import { StatsHelper } from "./Helper";



export class StatsCommand {

	public static buyPoint(context: Internal.CommandContext<Internal.CommandSourceStack>) {
		const { server, player } = context.source;
		const statsHelper = new StatsHelper(server, player.uuid.toString());

		const moneyString = Money.toDollarString(PlayerMoney.get(server, player.uuid.toString()));
		const cost = statsHelper.getNextPointValue();

		const result = statsHelper.buyPoint();
		switch (result) {
			case "NOT_ENOUGH_MONEY":
				server.runCommandSilent(`tellraw ${player.username} [{"color":"red","text":"Buying the next stat point costs "},{"color":"dark_green","text":"${cost}"},", you only have ",{"color":"dark_green","text":"${moneyString}"},"."]`);
				break;
		}
	}
}
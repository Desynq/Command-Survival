import { $Commands } from "../../libraries/JavaClasses";
import { ApplyAttributesManager } from "../managers/ApplyAttributes";



export class UpdateCommand {

	public static register(event: Internal.CommandRegistryEventJS) {
		event.register($Commands.literal("update")
			.executes(context => {
				this.executeUpdateCommand(context);
				return 1;
			})
		);
	}

	private static executeUpdateCommand(context: Internal.CommandContext<Internal.CommandSourceStack>) {
		new ApplyAttributesManager(context.source.player as Player);
	}
}

ServerEvents.commandRegistry(event => UpdateCommand.register(event));
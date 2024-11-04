import { $Commands } from "../../libraries/JavaClasses";



export class DieCommand {

	public static register(event: Internal.CommandRegistryEventJS) {
		event.register($Commands.literal("die")
			.executes(context => {
				this.executeDieCommand(context);
				return 1;
			})
		);
	}

	private static executeDieCommand(context: Internal.CommandContext<Internal.CommandSourceStack>) {
	}
}
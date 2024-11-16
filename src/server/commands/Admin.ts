import { $Commands } from "../../libraries/JavaClasses";






class ReloadSchedule {
	private secondsLeft: number;

	public constructor(initialSeconds: number, secondsLeft: number) {
		this.secondsLeft = secondsLeft;
		Utils.server.scheduleInTicks((initialSeconds - this.secondsLeft) * 20, () => this.future());
	}

	private future() {
		if (this.secondsLeft === 0) {
			Utils.server.players?.tell("Reloading..." as any);
			Utils.server.runCommandSilent("reload");
			return;
		}

		Utils.server.players?.tell(`Reloading in ${this.secondsLeft}...` as any);
	}
}


class AdminCommand {

	public static register(event: Internal.CommandRegistryEventJS) {
		event.register($Commands.literal("admin")
			.requires(executor => executor.hasPermission(4))
			.then($Commands.literal("reload")
				.executes(context => this.reload(context))
			)
		);
	}

	private static reload(context: Internal.CommandContext<Internal.CommandSourceStack>): number {
		const startSeconds = 15;
		for (let seconds = startSeconds; seconds >= 0; seconds--) {
			new ReloadSchedule(startSeconds, seconds);
		}

		return 1;
	}
}

ServerEvents.commandRegistry(event => AdminCommand.register(event));
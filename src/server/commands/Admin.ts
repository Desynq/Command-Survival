import { $Commands } from "../../libraries/JavaClasses";





const RELOAD_START_SECONDS = 15;

class ReloadSchedule {
	private secondsLeft: number;

	public constructor(secondsLeft: number) {
		this.secondsLeft = secondsLeft;

		Utils.server.scheduleInTicks((RELOAD_START_SECONDS - this.secondsLeft) * 20, () => this.future());
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
		for (let seconds = RELOAD_START_SECONDS; seconds >= 0; seconds--) {
			new ReloadSchedule(seconds);
		}
		return 1;
	}

	private static give(context: Internal.CommandContext<Internal.CommandSourceStack>): number {
		return 1;
	}
}

ServerEvents.commandRegistry(event => AdminCommand.register(event));
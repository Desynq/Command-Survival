import { $Commands } from "../../libraries/JavaClasses";
import { KeyPressEvent } from "../events/key/PrimaryActive";
import { ApplyAttributesManager } from "../managers/ApplyAttributes";
import { SculkOrigin } from "../origins/Sculk";
import { SculkerAbsorb } from "./run/SculkerAbsorb";



export class RunCommand {

	public static register(event: Internal.CommandRegistryEventJS) {
		event.register($Commands.literal("run")
			.requires(executor => executor.hasPermission(4))
			.then(
				$Commands.literal("sculker_absorb").executes(context => {
					SculkerAbsorb.run(context.source.playerOrException as Player);
					return 1;
				})
			)
			.then(
				$Commands.literal("key_primary_active").executes(context => {
					KeyPressEvent.PrimaryActiveKey.press(context.source.playerOrException as Player);
					return 1;
				})
			)
		);
	}
}

ServerEvents.commandRegistry(event => RunCommand.register(event));
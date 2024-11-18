import { $ServerPlayer } from "../../libraries/JavaClasses";



BlockEvents.rightClicked(event => {
	const player: Player = event.player as Player;
	// @ts-ignore
	const isAdventure = player.gameMode.getGameModeForPlayer() === GameMode.ADVENTURE;

	if (isAdventure && ["minecraft:oak_trapdoor", "minecraft:anvil", "minecraft:crafting_table"].indexOf(event.block.id) !== -1) {
		event.cancel();
	}
});
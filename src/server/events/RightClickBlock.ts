import { $ServerPlayer } from "../../libraries/JavaClasses";



BlockEvents.rightClicked(event => {
	const player: Player = event.player as Player;
	// @ts-ignore
	const isAdventure = player.gameMode.getGameModeForPlayer() === GameMode.ADVENTURE;

	if (isAdventure && event.block.id === "minecraft:oak_trapdoor") {
		event.cancel();
	}
});
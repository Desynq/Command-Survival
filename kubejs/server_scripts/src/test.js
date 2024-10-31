// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded server scripts)');

PlayerEvents.tick(event => {
	const { player, server } = event;

	// player.tell(player.username);
	if (player.username == 'Desynq') {
		Spartan(player, server);
	}
});

/**
 * 
 * @param {$Player} spartanPlayer
 * @param {$MinecraftServer} server
 */
function Spartan(spartanPlayer, server) {
	// player.tell('Hello World');

	let health = spartanPlayer.health;
	let maxHealth = spartanPlayer.maxHealth;

	server.runCommandSilent(`bossbar set minecraft:bossbar name {"color":"gray","text":"Netherite Drone (${health.toFixed(2)}/${maxHealth.toString()})"}`);
	server.runCommandSilent(`bossbar set minecraft:bossbar max ${maxHealth.toString()}`);
	server.runCommandSilent(`bossbar set minecraft:bossbar value ${health.toString()}`);
}
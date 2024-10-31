// priority: 0

ServerEvents.tick(event => {
	const { server } = event;

	/**
	 * @type {Internal.Player[]}
	 */
	let players = server.players.toArray();

	for (let player of players) {
		if (player == Desynq(server)) continue;

		// player.addEffect(new $MobEffectInstance("minecraft:glowing", 20, 0, false, false, true));
	}


});
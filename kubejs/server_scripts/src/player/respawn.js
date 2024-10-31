// priority: 0

PlayerEvents.respawned(event => {
	const { server, player } = event;
	new CustomStats(server, player.uuid.toString()).applyStats();
});
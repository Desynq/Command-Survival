// priority: -10000000

(function () {
	let hasLoaded = false;

	ServerEvents.tick(event => {
		if (hasLoaded) {
			return;
		}

		StartupLogger.instances.forEach(logger => {
			const desynq = event.server.players.toArray().find(player => player.username == 'Desynq');
			if (desynq !== undefined) {
				desynq.tell(logger.message)
			}
		})
		hasLoaded = true;
	});
})();
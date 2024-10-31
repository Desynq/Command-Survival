EntityEvents.hurt(event => {
	const server = event.server;
	const entity = event.entity;
});



EntityEvents.hurt("minecraft:creeper", event => {
	/** @type {Internal.Creeper} */
	const creeper = event.entity;
	if (creeper.isOnFire && !creeper.ignited) {
		creeper.ignite();
	}
});

EntityEvents.hurt("minecraft:player", event => {
	const server = event.server;
	/** @type {Internal.Player} */
	const player = event.entity;

	if (event.source.creativePlayer && player.level.dimension == "dimdoors:public_pockets") {
		event.cancel();
	}
});
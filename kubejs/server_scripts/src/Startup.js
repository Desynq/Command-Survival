// priority: 2147483647





(function () {
	/** @type {boolean} */
	let hasLoaded = false;

	ServerEvents.tick(event => {
		const { server } = event;
		if (hasLoaded)
		{
			return;
		}
		hasLoaded = true;
	});
})();
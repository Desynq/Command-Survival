// priority: 2147483646



/**
 * @param {Internal.MinecraftServer} server
 * @returns {Internal.Player}
 */
function Desynq(server) {
	try
	{
		return server.players.toArray().find(player => player.username == 'Desynq');
	}
	catch (error)
	{
		return null;
	}
}
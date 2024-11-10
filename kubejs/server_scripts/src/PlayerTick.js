// priority: 0

PlayerEvents.tick(event => new PlayerTick(event));




/** @type {Internal.Player} */
PlayerTick.prototype.player = null;

/** @type {Internal.MinecraftServer} */
PlayerTick.prototype.server = null;



/**
 * @param {Internal.SimplePlayerEventJS} event 
 */
function PlayerTick(event)
{
	this.player = event.player;
	this.server = event.server;



	if (this.player.username == "Desynq")
	{
		this.server.players.forEach(player => DesynqTickAPlayer(this.player, this.server, player))
	}



	if (this.player.stats.timeSinceDeath == 1)
	{
		this.restoreHungerFromLastLife();
	}



	this.updateInfoHUD();

	this.saveDataForNextTick();
}



PlayerTick.prototype.restoreHungerFromLastLife = function ()
{
	this.player.foodLevel = this.player.persistentData.getFloat('food_level_last_tick');
	this.player.saturation = this.player.persistentData.getFloat('saturation_last_tick');
}

PlayerTick.prototype.updateInfoHUD = function ()
{
	const moneyString = Money.ToDollarString(PlayerMoney.get(this.server, this.player.uuid.toString()));
	this.player.paint({
		money: {
			type: "text",
			text: `$${moneyString}`,
			color: "green",
			shadow: true,
			alignX: "left",
			alignY: "top",
			x: 30,
			y: 10,
			scale: 1.5
		}
	});
}

PlayerTick.prototype.saveDataForNextTick = function ()
{
	this.player.persistentData.putFloat('food_level_last_tick', this.player.foodLevel);
	this.player.persistentData.putFloat('saturation_last_tick', this.player.saturation);
}







/**
 * @param {Internal.Player} desynq 
 * @param {Internal.MinecraftServer} server 
 * @param {Internal.Player} player 
 */
function DesynqTickAPlayer(desynq, server, player)
{
	if (player.deathTime == 1)
	{
		desynq.heal(5);
	}
}
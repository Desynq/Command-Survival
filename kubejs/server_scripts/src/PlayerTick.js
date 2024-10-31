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

	if (this.player.level.dimension == "dimdoors:dungeon_pockets")
	{
		//this.player.addEffect("")
	}

	if (this.player.level.dimension == "dimdoors:limbo")
	{
		this.player.addEffect(new $MobEffectInstance("minecraft:darkness", 40, 0, false, false, true));
	}

	if (this.player.level.dimension == "minecraft:overworld" && this.player.y <= -128 && this.player.health <= 4) {
		let clearedTotem = this.server.runCommandSilent(`clear ${this.player.username} minecraft:totem_of_undying 1`) == 1;
		if (clearedTotem) {
			let x, y = MathHelper.get2dPointInCircle(512);
			this.player.teleportTo("command_survival:the_underground", 0, 320, 0, this.player.yaw, this.player.pitch);
			this.player.addEffect(new $MobEffectInstance("minecraft:blindness", 200, 0, false, false, true));
		}
	}



	if (this.player.stats.timeSinceDeath == 1)
	{
		this.restoreHungerFromLastLife();
	}




	this.checkMovement();

	this.updateInfoHUD();

	this.saveDataForNextTick();
}



PlayerTick.prototype.restoreHungerFromLastLife = function ()
{
	this.player.foodLevel = this.player.persistentData.getFloat('food_level_last_tick');
	this.player.saturation = this.player.persistentData.getFloat('saturation_last_tick');
}

PlayerTick.prototype.checkMovement = function ()
{
	let lastX = this.player.persistentData.getDouble('last_x');
	let lastY = this.player.persistentData.getDouble('last_y');
	let lastZ = this.player.persistentData.getDouble('last_z');
	let lastYaw = this.player.persistentData.getFloat('last_yaw');
	let lastPitch = this.player.persistentData.getFloat('last_pitch');

	let hasMoved = this.player.x != lastX
		|| this.player.y != lastY
		|| this.player.z != lastZ
		|| this.player.yaw != lastYaw
		|| this.player.pitch != lastPitch;

	this.server.runCommandSilent(`scoreboard players set ${this.player.username} is_moving ${Number(hasMoved)}`);
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

	this.player.persistentData.putDouble('last_x', this.player.x);
	this.player.persistentData.putDouble('last_y', this.player.y);
	this.player.persistentData.putDouble('last_z', this.player.z);
	this.player.persistentData.putFloat('last_yaw', this.player.yaw);
	this.player.persistentData.putFloat('last_pitch', this.player.pitch);
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
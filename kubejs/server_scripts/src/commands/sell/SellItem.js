// priority: 1

/** @type {$CommandContext_<$CommandSourceStack_>} */
SellItem.prototype.context = undefined;

/** @type {$Player_} */
SellItem.prototype.player = undefined;

/** @type {$MinecraftServer_} */
SellItem.prototype.server = undefined;

/** @type {boolean} */
SellItem.prototype.sellAll = undefined;

/** @type {string} */
SellItem.prototype.item = undefined

/** @type {object<string, number[2]>} */
SellItem.prototype.sellableItems = undefined;

/** @type {string[]} */
SellItem.prototype.items = undefined;

/** @type {number} */
SellItem.prototype.amountToSell = undefined;

/** @type {number} */
SellItem.prototype.amountSold = undefined;

/** @type {number} */
SellItem.prototype.itemValue = undefined

/** @type {number} */
SellItem.prototype.totalValue = undefined;



function SellItem(context, sellAll)
{
	this.context = context;
	this.player = this.context.source.player;
	this.server = this.player.server;

	this.sellAll = sellAll;

	this.item = $Arguments.STRING.getResult(this.context, "item");
	this.items = Object.keys(SellableItems);


	if (this.items.indexOf(this.item) === -1)
	{
		this.player.tell(Text.red("Sell an actual item next time."));
		return;
	}

	if (this.sellAll)
	{
		this.amountToSell = 2147483647;
	}
	else
	{
		this.amountToSell = $Arguments.INTEGER.getResult(this.context, "amount");
		if (this.amountToSell <= 0)
		{
			this.player.tell(Text.red("Sell an actual quantity next time."));
			return;
		}
	}

	this.itemValue = SellItem.getRealItemValue(this.server, this.item);
	if (this.itemValue === null || this.itemValue === undefined)
	{
		this.player.tell(Text.darkRed("Something went horribly wrong"));
		return;
	}

	this.sellItem();
	this.tellOutput();
	this.logTransaction();
}

SellItem.prototype.logTransaction = function ()
{
	const desynq = Desynq(this.server);
	if (desynq == null)
	{
		return;
	}

	desynq.tell(Text.gray(`Player ${this.player.username} sold ${this.amountSold} ${this.item} for ${Money.ToDollarString(this.totalValue)}`));
}

/**
 * Applies changes to the player and the server in order to simulate selling the item
 * NONE of what's in this method can fail otherwise players can potentially gain money illegally or sell items without compensation or lose sell value
 */
SellItem.prototype.sellItem = function ()
{
	this.amountSold = this.server.runCommandSilent(`clear ${this.player.username} ${this.item} ${this.amountToSell}`);

	if (!this.player.creative || !this.player.spectator)
	{
		SellTracker.addSold(this.server, this.item, this.amountSold);
	}

	this.totalValue = this.amountSold * this.itemValue;
	PlayerMoney.add(this.server, this.player.uuid.toString(), this.totalValue);
}




/**
 * @param {$MinecraftServer_} server 
 * @param {string} item
 * @returns {number}
 */
SellItem.getRealItemValue = function (server, item)
{
	const itemEntry = SellableItems[item];
	const baseValue = itemEntry[0];
	const percentageLoss = itemEntry[1];
	const exponentialGroup = itemEntry[2];

	if (percentageLoss === undefined || exponentialGroup === undefined)
	{
		return baseValue;
	}

	let globalAmountSold = SellTracker.getSold(server, item);

	return Math.ceil(baseValue * ((1 - percentageLoss) ** (globalAmountSold / exponentialGroup)));
}

SellItem.prototype.tellOutput = function ()
{
	const output =
		`${'-'.repeat(32)}\n` +
		`Individual Value: $${(this.itemValue / 100).toFixed(2)}\n` +
		`Sold: ${this.amountSold}\n` +
		`Total Value: $${(this.totalValue / 100).toFixed(2)}\n` +
		`${'-'.repeat(32)}`
		;

	this.player.tell(output);
}


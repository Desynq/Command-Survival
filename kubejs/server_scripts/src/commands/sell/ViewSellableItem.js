// priority: 1



/**
 * 
 * @param {$CommandContext_<$CommandSourceStack_>} context 
 */
function ViewSellableItem(context)
{
	this.server = context.source.server;
	this.executor = context.source.player;
	this.itemName = $Arguments.STRING.getResult(context, "item");

	this.viewItem();
}

ViewSellableItem.prototype.server = undefined;
ViewSellableItem.prototype.executor = undefined;
/** @type {string} */
ViewSellableItem.prototype.itemName = undefined;



ViewSellableItem.prototype.viewItem = function ()
{
	const basePrice = SellableItems[this.itemName][0];
	const currentPrice = SellItem.getRealItemValue(this.server, this.itemName);
	const circulationAmount = SellTracker.getSold(this.server, this.itemName);

	const dashedLine = '-'.repeat(32);
	this.executor.tell(ConcatString(
		`${dashedLine}\n`,
		`Item: ${this.itemName}\n`,
		`Base Price: ${Money.ToDollarString(basePrice)}\n`,
		`Current Price: ${Money.ToDollarString(currentPrice)}\n`,
		`Circulation: ${circulationAmount.toFixed(2)} Units\n`,
		`${dashedLine}`
	));
}

/**
 * 
 * @param {Internal.CommandContext<Internal.CommandSourceStack>} context 
 */
ViewSellableItem.viewAllByDeviation = function (context)
{
	const executor = context.source.player;
	const server = context.source.server;

	const keys = Object.keys(SellableItems);
	keys.sort((a, b) =>
	{
		const basePriceA = SellableItems[a][0];
	});
}
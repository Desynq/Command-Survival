// priority: 2

const SellTracker = {
	/**
	 * @param {$MinecraftServer_} server
	 * @param {string} itemName
	 * @returns {number}
	 */
	getSold(server, itemName)
	{
		return server.persistentData.getCompound('items_sold').getDouble(itemName);
	},


	/**
	 * @param {$MinecraftServer_} server
	 * @param {string} itemName 
	 * @param {number} newAmount 
	 */
	updateSold(server, itemName, newAmount)
	{
		let compoundTag = server.persistentData.getCompound('items_sold');

		if (compoundTag.empty)
		{
			server.persistentData.put('items_sold', new $CompoundTag());
			compoundTag = server.persistentData.getCompound('items_sold');
		}

		compoundTag.putDouble(itemName, newAmount);
	},


	/**
	 * @param {$MinecraftServer_} server
	 * @param {string} itemName 
	 * @param {number} amount 
	 */
	addSold(server, itemName, amount)
	{
		let currentAmount = SellTracker.getSold(server, itemName);
		SellTracker.updateSold(server, itemName, currentAmount + amount);
	},


	/**
	 * @param {$MinecraftServer_} server
	 * @param {number} percentageLost percentage of items lost after the method call
	 */
	diminishAll(server, percentageLost)
	{
		Object.keys(SellableItems).forEach(itemName => {
			let amountSold = SellTracker.getSold(server, itemName);
			amountSold *= 1 - percentageLost;
			SellTracker.updateSold(server, itemName, amountSold);
		});
	}
}
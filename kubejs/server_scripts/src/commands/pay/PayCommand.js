// priority: 0



const PayCommand = (function ()
{
	function Class() { }

	Class.RECIPIENT_ARGUMENT_ID = "player";
	Class.AMOUNT_ARGUMENT_ID = "amount";

	

	/**
	 * 
	 * @param {Internal.MinecraftServer} server 
	 * @param {Internal.Player} executor 
	 * @param {string} recipientUsername 
	 * @param {number} amount assumed to already be in dollar format (1.29 -> 129)
	 */
	Class.PayPlayer = function (server, executor, recipientUsername, amount)
	{
		this.server = server;
		this.executor = executor;
		this.recipientUsername = recipientUsername;
		this.amount = amount;
		/** @type {boolean} */
		this.cancelled = false;
		/** @type {string} */
		this.recipientStringUUID = undefined;

		this.checkEnoughMoney();
		if (this.cancelled) return;

		this.checkRecipient();
		if (this.cancelled) return;

		this.doTransaction();
		this.outputResult();
	}

	/**
	 * @declares `this.executorMoney`
	 */
	Class.PayPlayer.prototype.checkEnoughMoney = function ()
	{
		const executorMoney = PlayerMoney.get(this.server, this.executor.uuid.toString());
		if (executorMoney < this.amount)
		{
			executor.tell(`You'll need ${Money.ToDollarString(this.amount - executorMoney)} more to pay ${this.recipientUsername} ${Money.ToDollarString(this.amount)}.`);
			this.cancel();
		}
	}

	/**
	 * @declares `this.recipientStringUUID`
	 */
	Class.PayPlayer.prototype.checkRecipient = function ()
	{
		this.recipientStringUUID = PlayerIdentifiers.getStringUUIDFromUsername(this.server, this.recipientUsername);
		if (this.recipientStringUUID == null)
		{
			this.executor.tell("Recipient does not exist.");
			this.cancel();
		}
	}

	Class.PayPlayer.prototype.doTransaction = function ()
	{
		PlayerMoney.add(this.server, this.executor.uuid.toString(), -this.amount);
		PlayerMoney.add(this.server, this.recipientStringUUID, this.amount);
	}

	Class.PayPlayer.prototype.outputResult = function ()
	{
		const amountString = Money.ToDollarString(this.amount);

		/** @type {Internal.Player[]} */
		const players = this.server.players.toArray();

		let recipient = players.find(player => player.uuid.toString() == this.recipientStringUUID);
		if (recipient != null)
		{
			this.server.runCommandSilent(`tellraw ${this.executor.username} ["",{"color":"gray","text":"Paid "},{"selector":"${recipient.username}"},{"color":"yellow","text":" ${amountString}"}]`);
			this.server.runCommandSilent(`tellraw ${recipient.username} ["",{"selector":"${this.executor.username}"},{"color":"gray","text":" paid you"},{"color":"yellow","text":" ${amountString}"}]`);
			return;
		}
		this.server.runCommandSilent(`tellraw ${this.executor.username} ["",{"color":"gray","text":"Paid "},{"color":"dark_gray","text":"${this.recipientUsername}"},{"color":"yellow","text":" ${amountString}"}]`);
	}

	Class.PayPlayer.prototype.cancel = function ()
	{
		this.cancelled = true;
	}



	/**
	 * 
	 * @param {Internal.CommandContext<Internal.CommandSourceStack>} context 
	 */
	Class.executePayPlayer = function (context)
	{
		const server = context.source.server;
		const executor = context.source.player;

		const recipientUsername = $Arguments.STRING.getResult(context, Class.RECIPIENT_ARGUMENT_ID);
		/** @type {string} */
		const amountString = $Arguments.STRING.getResult(context, Class.AMOUNT_ARGUMENT_ID);

		const amount = Money.FromSimpleDollarString(amountString);
		if (amount == NaN)
		{
			executor.tell("Amount must be either be x, x.x, or x.xx (no negatives)");
			return 1;
		}

		new Class.PayPlayer(server, executor, recipientUsername, amount);
		return 1;
	}

	/**
	 * @param {Internal.CommandContext<Internal.CommandSourceStack>} context
	 * @param {Internal.SuggestionsBuilder} builder
	 */
	Class.suggestPlayer = function (context, builder)
	{
		PlayerIdentifiers.getUsernames(context.source.server).forEach(username => builder.suggest(username));
		return builder.buildFuture();
	}


	/**
	 * 
	 * @param {Internal.CommandRegistryEventJS} event 
	 */
	Class.registerCommand = function (event)
	{
		event.register($Commands.literal("pay")
			.then($Commands.argument(Class.RECIPIENT_ARGUMENT_ID, $Arguments.STRING.create(event))
				.suggests((context, builder) => PayCommand.suggestPlayer(context, builder))
				.then($Commands.argument(Class.AMOUNT_ARGUMENT_ID, $Arguments.STRING.create(event))
					.executes(context => Class.executePayPlayer(context))
				)
			)
		);
	}



	return Class;
})();
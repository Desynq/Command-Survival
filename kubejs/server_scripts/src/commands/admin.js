// priority: 0



const AdminCommand = {};

/**
 * @param {$CommandContext_<$CommandSourceStack_>} context 
 */
AdminCommand.ItemsSoldChange = function (context)
{
	const executor = context.source.player;
	if (!executor.op)
	{
		return;
	}

	const server = context.source.server;
	const item = $Arguments.STRING.getResult(context, "item");
	const newAmount = $Arguments.INTEGER.getResult(context, "new_amount");

	SellTracker.updateSold(server, item, newAmount);
}

/**
 * @param {Internal.CommandContext<Internal.CommandSourceStack>} context 
 */
AdminCommand.AddMoneyToPlayer = function (context)
{
	const server = context.source.server;
	const executor = context.source.player;
	if (!executor.op)
	{
		return;
	}

	/** @type {$Player_} */
	const username = $Arguments.STRING.getResult(context, "username");
	const amount = $Arguments.DOUBLE.getResult(context, "amount");

	const stringUUID = PlayerIdentifiers.getStringUUIDFromUsername(server, username)
	const money = Money.FromDollar(amount);

	PlayerMoney.add(server, stringUUID, money);
	executor.tell(Text.gold(`Added ${Money.ToDollarString(money)} to ${username}`));
}

/**
 * @param {$CommandContext_<$CommandSourceStack_>} context
 */
AdminCommand.GetMoneyFromPlayer = function (context)
{
	const executor = context.source.player;
	if (!executor.op)
	{
		return;
	}
	const server = context.source.server;

	const username = $Arguments.STRING.getResult(context, "username");
	const money = PlayerMoney.get(server, PlayerIdentifiers.getStringUUIDFromUsername(server, username));

	executor.tell(Text.gold(`Player ${username} has ${Money.ToDollarString(money)}`));
}



/**
 * 
 * @param {Internal.CommandContext<Internal.CommandSourceStack>} context
 */
AdminCommand.Reload = function (context)
{
	const server = context.source.server;

	server.players.tell("Reloading in 5 seconds");

	server.scheduleInTicks(20, callback =>
	{
		server.players.tell("Reloading in 4 seconds");
	});
	server.scheduleInTicks(40, callback =>
	{
		server.players.tell("Reloading in 3 seconds");
	});

	server.scheduleInTicks(60, callback =>
	{
		server.players.tell("Reloading in 2 seconds");
	});

	server.scheduleInTicks(80, callback =>
	{
		server.players.tell("Reloading in 1 second");
	});

	server.scheduleInTicks(100, callback =>
	{
		server.players.tell("Reloading...");
		server.runCommandSilent("reload");
	});
}

/**
 * 
 * @param {Internal.CommandContext<Internal.CommandSourceStack>} context
 */
AdminCommand.ReloadFast = function (context)
{
	const server = context.source.server;
	server.players.tell(Text.darkRed("Expect frequent reloads!"));
	server.players.tell("Reloading in 3 seconds");

	server.scheduleInTicks(20, callback =>
	{
		server.players.tell("Reloading in 2 seconds");
	});
	server.scheduleInTicks(40, callback =>
	{
		server.players.tell("Reloading in 1 second");
	});

	server.scheduleInTicks(60, callback =>
	{
		server.players.tell("Reloading...");
		server.runCommandSilent("reload");
	});
	return 1;
}



/**
 * 
 * @param {Internal.CommandContext<Internal.CommandSourceStack>} context 
 */
AdminCommand.AddPlayer = function (context)
{
	const server = context.source.server;
	const username = $Arguments.STRING.getResult(context, "username");
	const stringUUID = $Arguments.STRING.getResult(context, "string_uuid");
	PlayerIdentifiers.appendUsernameToStringUUIDMap(server, username, stringUUID);
}

AdminCommand.spyPlayerStats = function (context) {
	const { server, player } = context.source;
	const spiedUsername = $Arguments.STRING.getResult(context, "username");
	const spiedUUID = PlayerIdentifiers.getStringUUIDFromUsername(server, spiedUsername);
	const spiedStats = new CustomStats(server, spiedUUID);
}



ServerEvents.commandRegistry(event =>
{
	event.register($Commands.literal("admin")
		.requires(executor => executor.hasPermission(4))
		/**
		 * /admin items_solid change <item> <new_amount>
		 * 
		 */
		.then($Commands.literal("items_sold")

			.then($Commands.literal("change")
				.then($Commands.argument("item", $Arguments.STRING.create(event))
					.suggests((context, builder) => suggestSellableItem(context, builder))
					.then($Commands.argument("new_amount", $Arguments.INTEGER.create(event))
						.executes(context =>
						{
							AdminCommand.ItemsSoldChange(context);
							return 1;
						})
					)
				)
			)
		)

		/**
		 * /admin money add <player> <amount>
		 * /admin money get <player>
		 * 
		 */
		.then($Commands.literal("money")
			.then($Commands.literal("add")
				.then($Commands.argument("username", $Arguments.STRING.create(event))
					.then($Commands.argument("amount", $Arguments.DOUBLE.create(event))
						.executes(context =>
						{
							AdminCommand.AddMoneyToPlayer(context);
							return 1;
						})
					)
				)
			)
			.then($Commands.literal("get")
				.then($Commands.argument("username", $Arguments.STRING.create(event))
					.executes(context =>
					{
						AdminCommand.GetMoneyFromPlayer(context);
						return 1;
					})
				)
			)
		)

		.then($Commands.literal("player")
			.then($Commands.argument("username", $Arguments.STRING.create(event))
				.then($Commands.literal("stats")
					.executes(context => AdminCommand.spyPlayerStats(context))
				)
			)
		)

		.then($Commands.literal("reload")
			.executes(context =>
			{
				AdminCommand.Reload(context);
				return 1;
			})
			.then($Commands.literal("fast")
				.executes(context => AdminCommand.ReloadFast(context))
			)
		)

		.then($Commands.literal("add_player")
			.then($Commands.argument("username", $Arguments.STRING.create(event))
				.then($Commands.argument("string_uuid", $Arguments.STRING.create(event))
					.executes(context =>
					{
						AdminCommand.AddPlayer(context);
						return 1;
					})
				)
			)
		)

		.then($Commands.literal("spawn"))
	);
});
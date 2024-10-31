// priority: 0



ServerEvents.commandRegistry(event => 
{
	PayCommand.registerCommand(event);
	CustomStats.registerCommand(event);
});
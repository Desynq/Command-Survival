


PlayerEvents.advancement("command_survival:internal/chose_sculker", event => {
	Utils.server.runCommandSilent(`puffish_skills category unlock ${event.player.username} puffish_skills:origins/sculker`);
	Utils.server.runCommandSilent(`advancement revoke ${event.player.username} only ${event.advancement.id()}`);
});
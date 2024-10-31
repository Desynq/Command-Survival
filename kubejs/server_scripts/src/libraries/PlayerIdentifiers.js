// priority: 2147483646

/*
{
	player_string_uuids: [
		string_uuid
	]
}
*/

const PlayerIdentifiers = (function ()
{
	function Class()
	{ }

	Class.PLAYER_USERNAME_TO_STRING_UUID_MAP_KEY = "player_username_to_string_uuid_map";
	Class.PLAYER_STRING_UUIDS_KEY = "player_string_uuids";


	/**
	 * 
	 * @param {Internal.MinecraftServer} server
	 * @param {string} stringUUID
	 */
	Class.putStringUUID = function (server, stringUUID)
	{
		let listTag = server.persistentData.getList(Class.PLAYER_STRING_UUIDS_KEY, $Tag.TAG_STRING);
		let stringTag = $StringTag.valueOf(stringUUID);
		if (listTag.contains(stringTag))
		{
			return;
		}

		listTag.addTag(listTag.size(), stringTag);
		server.persistentData.put(Class.PLAYER_STRING_UUIDS_KEY, listTag);
	}

	/**
	 * 
	 * @param {Internal.MinecraftServer} server
	 * @param {string} username 
	 */
	Class.getStringUUIDFromUsername = function (server, username)
	{
		return server.persistentData.getCompound(Class.PLAYER_USERNAME_TO_STRING_UUID_MAP_KEY).getString(username);
	}

	/**
	 * 
	 * @param {Internal.MinecraftServer} server
	 * @param {string} username
	 * @param {string} stringUUID 
	 */
	Class.appendUsernameToStringUUIDMap = function (server, username, stringUUID)
	{
		let compound = server.persistentData.getCompound(Class.PLAYER_USERNAME_TO_STRING_UUID_MAP_KEY);
		compound.putString(username, stringUUID);
		server.persistentData.put(Class.PLAYER_USERNAME_TO_STRING_UUID_MAP_KEY, compound);
	}

	/**
	 * 
	 * @param {Internal.MinecraftServer} server
	 * @returns {string[]}
	 */
	Class.getUsernames = function (server)
	{
		return server.persistentData.getCompound(Class.PLAYER_USERNAME_TO_STRING_UUID_MAP_KEY).getAllKeys().toArray();
	}



	return Class;
}
)();

PlayerEvents.tick(event =>
{
	const { server, player } = event;
	PlayerIdentifiers.putStringUUID(server, player.uuid.toString());
	PlayerIdentifiers.appendUsernameToStringUUIDMap(server, player.username, player.uuid.toString());
});
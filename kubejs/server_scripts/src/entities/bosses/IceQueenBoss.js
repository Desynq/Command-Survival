// priority: 0

const IceQueenBoss = (function () {
	/**
	 * @param {Internal.LivingEntity} entity 
	 */
	function Class(entity) {
		this.entity = entity;
		this.server = this.entity.server;

		if (this.entity.tags.toArray().indexOf("registered") === -1) this.register();
	}

	Class.prototype.register = function () {
		const maxHealth = 1000;
		this.entity.attributes.getInstance($Attributes.MAX_HEALTH).baseValue = maxHealth;
		this.entity.health = maxHealth;
		this.server.runCommandSilent(`data modify entity ${this.entity.uuid.toString()} CustomName set value '{"color":"rainbow","bold":true,"text":"Ice Queen"}'`);
		this.entity.tags.add("registered");
	}

	return Class;
})();
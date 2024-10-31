// priority: 2147483646



const AttributeModifierHelper = (function () {
	Class.prototype.entity = undefined;
	Class.prototype.attribute = undefined;
	Class.prototype.modifierUUID = undefined;
	Class.prototype.modifierName = undefined;

	/**
	 * @param {Internal.LivingEntity} entity 
	 * @param {Internal.Attribute} attribute 
	 * @param {Internal.UUID} modifierUUID 
	 * @param {string} modifierName
	*/
	function Class(entity, attribute, modifierUUID, modifierName) {
		this.entity = entity;
		this.attribute = attribute;
		this.modifierUUID = modifierUUID;
		this.modifierName = modifierName
	}

	Class.prototype.getAttributeInstance = function () {
		return this.entity.attributes.getInstance(this.attribute);
	}

	Class.prototype.hasModifier = function () {
		return this.entity.attributes.hasModifier(this.attribute, this.modifierUUID);
	}

	Class.prototype.getModifierValue = function () {
		return this.hasModifier() ? this.entity.attributes.getModifierValue(this.attribute, this.modifierUUID) : 0;
	}

	Class.prototype.removeModifier = function () {
		this.getAttributeInstance().removeModifier(this.modifierUUID);
		return this;
	}

	/**
	 * @param {number} value 
	 * @param {Internal.AttributeModifier$Operation_} operation 
	 */
	Class.prototype.addModifier = function (value, operation) {
		const modifier = new $AttributeModifier(this.modifierUUID, this.modifierName, value, operation);
		this.getAttributeInstance().addPermanentModifier(modifier);
		return this;
	}

	Class.prototype.updateHealth = function () {
		if (this.entity instanceof global.$Player && this.entity.stats.timeSinceDeath !== 1) {
			return;
		}
		const maxHealth = this.entity.attributes.getValue($Attributes.MAX_HEALTH);
		if (this.entity.health > maxHealth) {
			this.entity.health = maxHealth;
		}
	}



	return Class;
}
)();
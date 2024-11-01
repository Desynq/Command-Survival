import { $AttributeModifier, $Player } from "./JavaClasses";



export class AttributeModifierHelper {

	private entity: Internal.LivingEntity;
	private attribute: Internal.Attribute;
	private modifierUUID: Internal.UUID;
	private modifierName: string;

	public constructor(entity: Internal.LivingEntity, attribute: Internal.Attribute, modifierUUID: Internal.UUID, modifierName: string) {
		this.entity = entity;
		this.attribute = attribute;
		this.modifierUUID = modifierUUID;
		this.modifierName = modifierName;
	}

	public getAttributeInstance(): Internal.AttributeInstance {
		return this.entity.attributes.getInstance(this.attribute);
	}

	public hasModifier(): boolean {
		return this.entity.attributes.hasModifier(this.attribute, this.modifierUUID);
	}

	public getModifierValue(): number {
		return this.hasModifier() ? this.entity.attributes.getModifierValue(this.attribute, this.modifierUUID) : 0;
	}

	public removeModifier(): this {
		this.getAttributeInstance().removeModifier(this.modifierUUID)
		return this;
	}

	public addModifier(value: number, operation: Internal.AttributeModifier$Operation_) {
		const modifier = new $AttributeModifier(this.modifierUUID, this.modifierName, value, operation);
		this.getAttributeInstance().addPermanentModifier(modifier);
		return this;
	}

	public updateHealth() {
		// players should only have their health updated right after respawning
		if (this.entity instanceof $Player && this.entity.stats.timeSinceDeath !== 1) {
			return;
		}

		const maxHealth = this.entity.attributes.getValue(this.attribute);
		if (this.entity.health > maxHealth) {
			this.entity.health = maxHealth;
		}
	}
}
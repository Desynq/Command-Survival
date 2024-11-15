import { $AttributeModifier, $Player } from "../JavaClasses";
import { AttributeHelper } from "./AttributeHelper";



export class AttributeModifier {
	public static readonly SCULKER = {
		MAX_HEALTH: new this(
			"Sculker: Max Health",
			"minecraft:generic.max_health",
			"306b8ae0-40e1-4369-aeed-afb2f312d47c"
		),
		ATTACK_DAMAGE: new this(
			"Sculker: Attack Damage",
			"minecraft:generic.attack_damage",
			"9f4b2fab-3da0-4f57-9269-626efd8332a9"
		),
		ATTACK_SPEED: new this(
			"Sculker: Attack Speed",
			"minecraft:generic.attack_speed",
			"c390507e-36de-4601-9764-66c6b2dbf263"
		),
		ARMOR_TOUGHNESS: new this(
			"Sculker: Armor Toughness",
			"minecraft:generic.armor_toughness",
			"6dd8a9d3-a4c8-4d58-89ca-0bcfe77e415f"
		),
		MOVEMENT_SPEED: new this(
			"Sculker: Movement Speed",
			"minecraft:generic.movement_speed",
			"62034afe-ba04-45cb-bfc4-d16696e0700e"
		),
	}

	public uuid: Internal.UUID;
	private constructor(public name: string, public attributeId: string, public stringUUID: string) {
		this.uuid = UUID.fromString(stringUUID);
	}

	public get attribute(): Internal.Attribute {
		return AttributeHelper.getAttribute(this.attributeId);
	}



	public has(entity: Internal.LivingEntity): boolean {
		return entity.attributes.hasModifier(this.attribute, this.uuid);
	}

	public getValue(entity: Internal.LivingEntity): number {
		return this.has(entity) ? entity.attributes.getModifierValue(this.attribute, this.uuid) : 0;
	}

	public getOperation(entity: Internal.LivingEntity): string | null {
		return entity.attributes.getInstance(this.attribute).getModifier(this.uuid)?.operation.toString();
	}

	public remove(entity: Internal.LivingEntity): this {
		entity.attributes.getInstance(this.attribute).removeModifier(this.uuid);
		return this;
	}

	/**
	 * Attempts to add the attribute modifier to the entity
	 * 
	 * Is able to be added to an entity even if they already have the attribute modifier if the value or operation is different
	 * 
	 * Returns a boolean indicating whether it succeeded or not
	 */
	public add(entity: Internal.LivingEntity, value: number, operation: Internal.AttributeModifier$Operation_, updateHealth?: boolean): boolean {
		if (updateHealth && this.attributeId !== "minecraft:generic.max_health") {
			throw Error("Tried to add a non-max-health attribute modifier while also updating an entity's health");
		}

		if (this.getValue(entity) === value && this.getOperation(entity) === operation) {
			return false;
		}

		const attrInstance = entity.attributes.getInstance(this.attribute);
		const healthPercentage = entity.health / entity.attributes.getValue(AttributeHelper.MAX_HEALTH);

		if (this.has(entity)) {
			this.remove(entity);
		}

		const modifier = new $AttributeModifier(this.uuid, this.name, value, operation);
		attrInstance.addPermanentModifier(modifier);

		if (updateHealth) {
			entity.health = attrInstance.getValue() * healthPercentage;
		}

		return true;
	}
}
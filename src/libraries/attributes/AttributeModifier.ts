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
		[Symbol.iterator]: function* (this: Record<string, AttributeModifier>): Generator<AttributeModifier> {
			for (const key of Object.keys(this)) {
				yield this[key];
			}
		}
	}

	public static readonly HUMAN_JACK_OF_ALL_TRADES = {
		[Symbol.iterator]: function* (this: Record<string, AttributeModifier>): Generator<AttributeModifier> {
			for (const key of Object.keys(this)) {
				yield this[key];
			}
		},
		MAX_HEALTH: new this(
			"Human: Jack of All Trades",
			"minecraft:generic.max_health",
			"f8310f1e-6d65-4200-adb3-7497200f4ff6"
		),
		ARMOR: new this(
			"Human: Jack of All Trades",
			"minecraft:generic.armor",
			"45927081-d1eb-4128-8457-84f29765a1ec"
		),
		ARMOR_TOUGHNESS: new this(
			"Human: Jack of All Trades",
			"minecraft:generic.armor_toughness",
			"c125d47b-940f-42d7-89f6-f50fee2271dd"
		),
		ATTACK_DAMAGE: new this(
			"Human: Jack of All Trades",
			"minecraft:generic.attack_damage",
			"5b266a8f-2cda-4c4e-bb55-62078651c366"
		),
		ATTACK_KNOCKBACK: new this(
			"Human: Jack of All Trades",
			"minecraft:generic.attack_knockback",
			"2e77410c-956a-4b58-a5c5-676e7aa01fff"
		),
		ATTACK_SPEED: new this(
			"Human: Jack of All Trades",
			"minecraft:generic.attack_speed",
			"c82948fe-08e5-4e49-b389-102a5e79c119"
		),
		LUCK: new this(
			"Human: Jack of All Trades",
			"minecraft:generic.luck",
			"2fe13953-9ed2-47d4-ad08-668c06c5cd56"
		),
		MOVEMENT_SPEED: new this(
			"Human: Jack of All Trades",
			"minecraft:generic.movement_speed",
			"14532a34-13bc-427f-9702-764acc4bd85e"
		),
		SWIM_SPEED: new this(
			"Human: Jack of All Trades",
			"forge:swim_speed",
			"0d53f52b-9581-42ba-ad22-46fbdec46c4b"
		),
		DIG_SPEED: new this(
			"Human: Jack of All Trades",
			"additionalentityattributes:dig_speed",
			"6e158240-3f58-4af2-b780-726864f9ee92"
		),
		LUNG_CAPACITY: new this(
			"Human: Jack of All Trades",
			"additionalentityattributes:lung_capacity",
			"8e4b6aa9-4df2-4a1e-98be-8b1a83c7af56"
		),
		MAGIC_PROTECTION: new this(
			"Human: Jack of All Trades",
			"additionalentityattributes:magic_protection",
			"0eed1baf-9b36-44eb-a8ef-61c1af3e1bb0"
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
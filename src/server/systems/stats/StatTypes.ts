

export class VariableAttributeModifier {
	public uuid: string;
	public name: string;
	public operation: Internal.AttributeModifier$Operation_;
	public attributeId: string;
	public base: number;

	constructor(uuid: string, name: string, operation: Internal.AttributeModifier$Operation_, attributeId: string, base: number) {
		this.uuid = uuid;
		this.name = name;
		this.operation = operation;
		this.attributeId = attributeId;
		this.base = base;
	}
}

export class StatType {
	public static STRENGTH = new StatType(
		"strength",
		[
			new VariableAttributeModifier("70561290-4434-4c86-9b87-cbdeb8c6d6bf", "Strength Stat", "multiply_total", "minecraft:generic.attack_damage", 0.025),
		]
	);

	public static CONSTITUTION = new StatType(
		"constitution",
		[
			new VariableAttributeModifier("b9919b8e-e0b0-444a-9581-ada3d1873716", "Constitution Stat", "addition", "minecraft:generic.max_health", 1),
		]
	);

	public static PERCEPTION = new StatType(
		"perception",
		[
			new VariableAttributeModifier("857342a0-0313-4df5-aecd-874bc8779114", "Perception Stat", "addition", "minecraft:generic.luck", 0.1),
			new VariableAttributeModifier("538a9086-bfec-4011-8c3f-bf3b4a3a826c", "Perception Stat", "addition", "additionalentityattributes:bonus_loot_count_rolls", 0.1),
			new VariableAttributeModifier("e2859f15-2f5d-47a5-9ac0-5f676b41252b", "Perception Stat", "addition", "additionalentityattributes:bonus_rare_loot_rolls", 0.05),
			new VariableAttributeModifier("d128c990-da79-4d51-894a-1da6605437cd", "Perception Stat", "multiply_total", "additionalentityattributes:critical_bonus_damage", 0.025),
		]
	);

	public static AGILITY = new StatType(
		"agility",
		[
			new VariableAttributeModifier("87c8d2a4-7ad8-43ce-9630-498763a48ac1", "Agility Stat", "addition", "minecraft:generic.movement_speed", 0.05),
		]
	);

	public static DEXTERITY = new StatType(
		"dexterity",
		[
			new VariableAttributeModifier("c4f60a84-4e1a-4640-a964-33ea65b5faf5", "Dexterity Stat", "multiply_total", "minecraft:generic.attack_speed", 0.025),
		]
	);

	public static ENDURANCE = new StatType(
		"endurance",
		[
			new VariableAttributeModifier("91cdc925-a17c-406d-9770-68aef89d5aec", "Endurance Stat", "addition", "minecraft:generic.knockback_resistance", 0.01),
			new VariableAttributeModifier("716b8455-7606-4b88-9f20-37da95b14687", "Endurance Stat", "multiply_total", "minecraft:generic.knockback_resistance", 0.025),
			new VariableAttributeModifier("c6338a93-e4f7-483e-87e2-a777fdb74585", "Endurance Stat", "multiply_total", "minecraft:generic.armor_toughness", 0.025),
		]
	);



	public name: string;
	public modifiers: Array<VariableAttributeModifier>;

	private constructor(name: string, modifiers: VariableAttributeModifier[]) {
		this.name = name;
		this.modifiers = modifiers;
	}
}
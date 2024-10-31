// priority: 0


/**
 * @typedef {"strength" | "constitution" | "perception" | "agility" | "dexterity" | "endurance"} StatId
 */


const CustomStatData = {
	/**
	 * Attack Damage (+2.5% per point)
	 * - #### 
	 */
	strength: {
		modifierUUID: "70561290-4434-4c86-9b87-cbdeb8c6d6bf",
		modifierName: "strength_stat"
	},
	/**
	 * Max Health (+1 per point)
	 * - #### Prevent death once per life if 20+ points invested and >=30% of total points
	 */
	constitution: {
		modifierUUID: "b9919b8e-e0b0-444a-9581-ada3d1873716",
		modifierName: "constitution_stat"
	},
	/**
	 * - Luck (+0.1 per point)
	 * - Bonus Loot Count Rolls (+0.1 per point)
	 * - Bonus Rare Loot Rolls (+0.05 per point)
	 * - Critical Bonus Damage (+2.5% per point)
	 * - Nametag Render Distance (+2.0 per point)
	 * - #### Players within 16 blocks will glow if 20+ points invested and >=30% of total points
	 */
	perception: {
		modifierUUID: "857342a0-0313-4df5-aecd-874bc8779114",
		modifierName: "perception_stat"
	},
	/**
		 * Movement Speed (+0.005 per point)
		 * Dodge Chance (WIP)
		 */
	agility: {
		modifierUUID: "87c8d2a4-7ad8-43ce-9630-498763a48ac1",
		modifierName: "agility_stat"
	},
	/**
	 * Attack Speed (+2.5% per point)
	 */
	dexterity: {
		modifierUUID: "c4f60a84-4e1a-4640-a964-33ea65b5faf5",
		modifierName: "dexterity_stat"
	},
	/**
	 * - Knockback Resistance (+0.01 per point, +2.5% per point)
	 * - Armor Toughness (+2.5% per point)
	 */
	endurance: {
		modifierUUID: "91cdc925-a17c-406d-9770-68aef89d5aec",
		modifierName: "Endurance Stat",
		modifierUUID2: "716b8455-7606-4b88-9f20-37da95b14687",
		modifierName2: "Endurance Stat (2)"
	},
};
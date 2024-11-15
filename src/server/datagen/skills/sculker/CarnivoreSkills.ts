


export const carnivoreSkills = {
	"carnivore_1": {
		title: "Carnivore I",
		description: "You can consume meat at any time and convert it directly to experience points depending on its nutrition and saturation.",
		extra_description: Component.yellow("player.xp += (nutrition + (nutrition * saturationModifier)) * ⅙").toJson(),
		icon: {
			type: "item",
			data: {
				item: "minecraft:chicken"
			}
		},
		size: 1,
		cost: 1,
		rewards: [
			{
				type: "puffish_skills_origins:power",
				data: {
					power: "command_survival:origins/sculker/skills/carnivore"
				}
			},
			{
				type: "puffish_skills:tag",
				data: {
					tag: "origin.sculker.carnivore_1"
				}
			}
		]
	},
	"carnivore_2": {
		title: "Carnivore II",
		description: "You can more efficiently collect experience from consuming meat",
		extra_description: "player.xp += (nutrition + (nutrition * saturationModifier)) * ⅓",
		icon: {
			type: "item",
			data: {
				item: "minecraft:mutton"
			}
		},
		size: 1,
		cost: 1,
		rewards: [
			{
				type: "puffish_skills:tag",
				data: {
					tag: "origin.sculker.carnivore_2"
				}
			}
		]
	},
	"carnivore_3": {
		title: "Carnivore III",
		description: "You are very efficient at collecting experience from consuming meat",
		extra_description: "player.xp += (nutrition + (nutrition * saturationModifier)) * ½",
		icon: {
			type: "item",
			data: {
				item: "minecraft:beef"
			}
		},
		size: 1,
		cost: 1,
		rewards: [
			{
				type: "puffish_skills:tag",
				data: {
					tag: "origin.sculker.carnivore_3"
				}
			}
		]
	}
};
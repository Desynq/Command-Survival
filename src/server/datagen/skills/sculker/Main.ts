import { carnivoreSkills } from "./CarnivoreSkills";



const json = {
	"experience-eater": {
		title: "Experience Eater",
		description: "Instead of consuming food for nutrition and saturation, you instead consume your experience in order to sate yourself.",
		icon: {
			type: "item",
			data: {
				item: "minecraft:experience_bottle"
			}
		},
		size: 2,
		cost: 0,
		required_skills: 0,
		rewards: []
	}
};

Object.assign(json, carnivoreSkills);

JsonIO.write("config/puffish_skills/categories/origins/sculker/definitions.json" as any, json as any);
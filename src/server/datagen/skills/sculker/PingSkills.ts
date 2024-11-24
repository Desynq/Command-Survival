import { Definition } from "PuffishSkills";


namespace Skills {
	export const Echolocate: Definition = {
		title: "Echolocate",
		description: "Active ability that allows you to ping enemies within eyesight.\nDistance: 16\nDuration: 3s\nCooldown: 30s\nCost: 30xp",
		icon: {
			type: "item",
			data: {
				item: "minecraft:bell"
			}
		},
		size: 1.25,
		cost: 1,
		required_skills: 0,
		rewards: []
	}

	export const FastPing_1: Definition = {
		title: "Fast Ping I",
		description: "2/3 of cooldown",
		icon: {
			type: "item",
			data: {
				item: "minecraft:ice"
			}
		},
		size: 1,
		cost: 1,
		required_skills: 0,
		rewards: []
	}
	export const FastPing_2: Definition = {
		title: "Fast Ping II",
		description: "1/3 of cooldown",
		icon: {
			type: "item",
			data: {
				item: "minecraft:packed_ice"
			}
		},
		size: 1,
		cost: 1,
		required_skills: 0,
		rewards: []
	}
	export const FastPing_3: Definition = {
		title: "Fast Ping III",
		description: "1/6 of cooldown",
		icon: {
			type: "item",
			data: {
				item: "minecraft:blue_ice"
			}
		},
		size: 1,
		cost: 1,
		required_skills: 0,
		rewards: []
	}
	export const FastPing_4: Definition = {
		title: "Fast Ping I",
		description: "No cooldown",
		icon: {
			type: "item",
			data: {
				item: "mowziesmobs:ice_crystal"
			}
		},
		size: 1,
		cost: 2,
		required_skills: 0,
		rewards: []
	}
}




export const PingSkills = {
	"echolocate": Skills.Echolocate,
	"fast_ping_1": Skills.FastPing_1,
	"fast_ping_2": Skills.FastPing_2,
	"fast_ping_3": Skills.FastPing_3,
}
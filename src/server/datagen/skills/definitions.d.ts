


declare module "PuffishSkills" {

	export interface Icon {
		type: string
		data: object
	}

	export interface ItemIcon extends Icon {
		type: "item"
		data: {
			item: Special.Item
		}
	}

	export interface EffectIcon extends Icon {
		type: "effect"
		data: {
			effect: Special.MobEffect
		}
	}

	export interface TextureIcon extends Icon {
		type: "texture"
		data: {
			texture: string
		}
	}

	export interface Reward {
		type: string
		data: object
		required?: boolean
	}

	export interface AttributeReward extends Reward {
		type: "puffish_skills:attribute"
		data: {
			attribute: string
			value: number
			operation: Internal.AttributeModifier$Operation_
		}
	}

	export interface CommandReward extends Reward {
		type: "puffish_skills:command"
		data: {
			command?: string
			unlock_command?: string
			lock_command?: string
		}
	}

	export interface ScoreboardReward extends Reward {
		type: "puffish_skills:scoreboard"
		data: {
			scoreboard: string
		}
	}

	export interface TagReward extends Reward {
		type: "puffish_skills:tag";
		data: {
			tag: string;
		}
	}

	export interface OriginReward extends Reward {
		type: "puffish_skills_origins:power"
		data: {
			power: string
		}
	}

	export interface Definition {
		title: string | object
		frame?: "task" | "goal" | "challenge"
		icon: ItemIcon | EffectIcon | TextureIcon
		size?: number
		description?: string | object
		extra_description?: string | object
		rewards: (AttributeReward | CommandReward | ScoreboardReward | TagReward | OriginReward | never)[]
		cost?: number
		required_points?: number
		required_skills?: number
		required_spent_points?: number
	}
}
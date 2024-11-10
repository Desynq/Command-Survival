import { BiEntityCondition } from "./types/BiEntityCondition";
import { EntityCondition } from "./types/EntityCondition";
import { PowerType } from "./types/PowerType";








namespace EntityRenderPower {

	const IS_FAR_AWAY = BiEntityCondition.distance(">", 64);

	const resourceId = "command_survival:global/resource/time-since-last-movement";
	const HASNT_MOVED_FOR_OVER_A_SECOND = BiEntityCondition.target(EntityCondition.resource(resourceId, ">", 20));

	export const INSTANCE: PowerType.IPreventEntityRender = {
		"type": "origins:prevent_entity_render",
		"bientity_condition": BiEntityCondition.and(
			BiEntityCondition.target(EntityCondition.living()),
			BiEntityCondition.or(IS_FAR_AWAY, HASNT_MOVED_FOR_OVER_A_SECOND)
		)
	};
}

namespace EntityGlowPower {

	const WITHIN_32_BLOCKS_OF_SIGHT = BiEntityCondition.and(BiEntityCondition.canSee(), BiEntityCondition.distance("<=", 32));

	export const INSTANCE: PowerType.IEntityGlow = {
		"type": "origins:entity_glow",
		"entity_condition": EntityCondition.living(),
		"bientity_condition": BiEntityCondition.or(WITHIN_32_BLOCKS_OF_SIGHT, BiEntityCondition.distance("<=", 8))
	}
}



export namespace MotionVisionPower {



	const data = {
		type: "origins:multiple",

		"entity-render": EntityRenderPower.INSTANCE,
		"entity-glow": EntityGlowPower.INSTANCE,

		"shader": {
			type: "origins:shader",
			shader: "minecraft:shaders/post/sobel.json",
			toggleable: true
		},

		"night-vision": {
			type: "origins:stacking_status_effect",
			min_stacks: 0,
			max_stacks: 1,
			duration_per_stack: 600,
			tick_rate: 10,
			effect: {
				effect: "minecraft:night_vision",
				duration: 100,
				amplifier: 0,
				is_ambient: true,
				show_particles: false,
				show_icon: false
			}
		}
	};

	JsonIO.write("kubejs/data/command_survival/powers/generated/motion-vision.json" as any, data as any);
}
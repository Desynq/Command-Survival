import { BiEntityCondition } from "./types/BiEntityCondition";
import { EntityCondition } from "./types/EntityCondition";
import { PowerType } from "./types/PowerType";








namespace EntityRenderPower {

	const IS_LIVING = BiEntityCondition.target(EntityCondition.living());

	const IS_FAR_AWAY = BiEntityCondition.distance(">", 32);

	const resourceId = "command_survival:global/resource/time-since-last-movement";
	const HASNT_MOVED_FOR_OVER_A_SECOND = BiEntityCondition.target(EntityCondition.resource(resourceId, ">", 20));

	export const INSTANCE: PowerType.IPreventEntityRender = {
		"type": "origins:prevent_entity_render",
		"bientity_condition": BiEntityCondition.and(
			IS_LIVING,
			BiEntityCondition.or(IS_FAR_AWAY, HASNT_MOVED_FOR_OVER_A_SECOND)
		)
	};
}



export namespace MotionVisionPower {



	const data = {
		type: "origins:multiple",

		"entity-render": EntityRenderPower.INSTANCE,

		// "entity-glow": {
		// 	type: "origins:entity_glow",
		// 	entity_condition: C.Entity.isLiving(),
		// 	bientity_condition: {
		// 		type: "origins:or",
		// 		conditions: [
		// 			C.BiEntity.distanceUnobstructed(32),
		// 			// or
		// 			C.BiEntity.within(8)
		// 		]
		// 	}
		// },

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
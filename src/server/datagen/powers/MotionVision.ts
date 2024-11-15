import { PINGED_RESOURCE_ID } from "../../events/MobEffectTick";
import { BiEntityCondition as bec } from "./types/BiEntityCondition";
import { EntityCondition as ec } from "./types/EntityCondition";
import { PowerType as pt } from "./types/PowerType";








namespace EntityRenderPower {

	const IS_FAR_AWAY = bec.distance(">", 64);

	const IS_NOT_PINGED = bec.target({
		type: "origins:resource",
		resource: PINGED_RESOURCE_ID,
		comparison: "<=",
		compare_to: 1
	});

	export const INSTANCE: pt.IPreventEntityRender = {
		type: "origins:prevent_entity_render",
		bientity_condition: bec.and(
			bec.target(ec.living()),
			bec.or(IS_FAR_AWAY, IS_NOT_PINGED)
		)
	};
}

namespace EntityGlowPower {

	const WITHIN_32_BLOCKS_OF_SIGHT = bec.and(bec.canSee(), bec.distance("<=", 32));

	export const INSTANCE: pt.IEntityGlow = {
		"type": "origins:entity_glow",
		"entity_condition": ec.living(),
		"bientity_condition": bec.or(WITHIN_32_BLOCKS_OF_SIGHT, bec.distance("<=", 8))
	}
}



export namespace MotionVisionPower {



	const data = {
		type: "origins:multiple",

		// PreventEntityRender if Distance > 64 || NotPinged
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

	JsonIO.write("kubejs/data/command_survival/powers/origins/sculker/motion-vision.json" as any, data as any);
}
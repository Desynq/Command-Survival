import { BiEntityCondition } from "./BiEntityCondition";
import { EntityCondition } from "./EntityCondition";



export namespace PowerType {

	interface PowerType {
		type: string,
		// optional
		name?: string
		// optional
		description?: string
		// false
		hidden?: boolean
		condition?: EntityCondition.AnyType
		// 0
		loading_priority?: number
		// optional
		badges?: any[] // TODO: IBadge[]
	}



	export interface IPreventEntityRender extends PowerType {
		type: "origins:prevent_entity_render"
		/**
		 * If specified, only entities which fulfills this condition will be affected.
		 */
		entity_condition?: EntityCondition.AnyType
		/**
		 * If specified, the power will only be active if this condition is fulfilled by either or both the 'actor' (the player that has the power) and 'target' (the entity that will not render) entities.
		 */
		bientity_condition?: BiEntityCondition.Any
	}

	export interface IEntityGlow extends PowerType {
		type: "origins:entity_glow"
		entity_condition?: EntityCondition.AnyType
		bientity_condition?: BiEntityCondition.Any
		use_teams?: boolean
		red?: number,
		green?: number,
		blue?: number
	}
}
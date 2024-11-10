import { EntityCondition } from "./EntityCondition";
import { ComparisonType, FluidHandling, IComparison, ShapeType } from "./Meta";



export namespace BiEntityCondition {
	interface Base {
		type: string;
	}



	export interface ITarget extends Base {
		type: "origins:target_condition";
		condition: EntityCondition.Any;
	}
	export function target(condition: EntityCondition.Any): ITarget {
		return {
			type: "origins:target_condition",
			condition: condition
		};
	}



	export interface IDistance extends Base, IComparison {
		type: "origins:distance";
	}
	export function distance(comparison: ComparisonType, compare_to: number): IDistance {
		return {
			type: "origins:distance",
			comparison: comparison,
			compare_to: compare_to
		};
	}

	export interface ICanSee extends Base {
		type: "origins:can_see"
		shape_type?: ShapeType
		fluid_handling?: FluidHandling
	}
	export function canSee(): ICanSee {
		return {
			type: "origins:can_see"
		}
	}



	export interface IOr extends Base {
		type: "origins:or",
		conditions: Any[]
	}
	export function or(...anyBiEntityCondition: Any[]): IOr;
	export function or(): IOr {
		const conditions: Any[] = Array.from(arguments);
		return {
			type: "origins:or",
			conditions: conditions
		}
	}



	export interface IAnd extends Base {
		type: "origins:and",
		conditions: Any[];
	}
	export function and(...anyBiEntityCondition: Any[]): IAnd;
	export function and(): IAnd {
		const conditions: Any[] = Array.from(arguments);
		return {
			type: "origins:and",
			conditions: conditions
		};
	}



	export type Any = ITarget | IDistance | ICanSee | IOr | IAnd;
}
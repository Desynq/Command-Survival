import { ComparisonType, IComparison } from "./Meta";



export namespace EntityCondition {
	interface Base {
		type: string;
		inverted?: boolean;
	}



	export interface ILiving extends Base {
		type: "origins:living";
	}
	export function living(): ILiving {
		return {
			type: "origins:living"
		};
	}



	export interface IAir extends Base, IComparison {
		type: "origins:air";
	}
	export function air(comparison: ComparisonType, compare_to: number): IAir {
		return {
			type: "origins:air",
			comparison: comparison,
			compare_to: compare_to
		}
	}



	export interface IResource extends Base, IComparison {
		type: "origins:resource",
		resource: string;
	}
	export function resource(resource: string, comparison: ComparisonType, compare_to: number): IResource {
		return {
			type: "origins:resource",
			resource: resource,
			comparison: comparison,
			compare_to: compare_to
		};
	}



	export interface IEntityType extends Base {
		type: "origins:entity_type",
		entity_type: string
	}
	export function entityType(entity_type: string, inverted: boolean = false): IEntityType {
		return {
			type: "origins:entity_type",
			entity_type: entity_type,
			inverted: inverted
		}
	}



	export interface IOr extends Base {
		type: "origins:or",
		conditions: AnyType[];
	}
	export function or(...anyType: AnyType[]): IOr;
	export function or(): IOr {
		const conditions: AnyType[] = Array.from(arguments);
		return {
			type: "origins:or",
			conditions: conditions
		};
	}



	export interface IAnd extends Base {
		type: "origins:and",
		conditions: AnyType[];
	}
	export function and(...anyType: AnyType[]): IAnd;
	export function and(): IAnd {
		const conditions: AnyType[] = Array.from(arguments);
		return {
			type: "origins:and",
			conditions: conditions
		};
	}

	export type AnyType = ILiving | IAir | IResource | IEntityType | IAnd | IOr;
}
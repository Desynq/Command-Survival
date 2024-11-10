import { ComparisonType, IComparison } from "./Meta";



export namespace EntityCondition {
	interface Base {
		type: string;
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

	export type Any = ILiving | IAir | IResource;
}



export type ComparisonType = "<" | "<=" | ">" | ">=" | "==" | "!=";

export type ShapeType = "collider" | "outline" | "visual";
export type FluidHandling = "any" | "none" | "source_only";

export interface IComparison {
	comparison: ComparisonType;
	compare_to: number;
}
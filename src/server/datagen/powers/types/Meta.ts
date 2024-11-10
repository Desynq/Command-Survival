


export type ComparisonType = "<" | "<=" | ">" | ">=" | "==" | "!=";

export interface IComparison {
	comparison: ComparisonType;
	compare_to: number;
}
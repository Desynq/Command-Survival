


export namespace PowerConditions {

	export namespace BiEntity {

		export function within(distance: number) {
			return {
				type: "origins:distance",
				comparison: "<=",
				compare_to: distance
			};
		}

		export function furtherThan(distance: number) {
			return {
				type: "origins:distance",
				comparison: ">",
				compare_to: distance
			}
		}

		export function distanceUnobstructed(distance: number) {
			return {
				type: "origins:and",
				conditions: [
					{
						type: "origins:can_see"
					},
					PowerConditions.BiEntity.within(distance)
				]
			};
		}
	}

	export namespace Entity {

		export function hasntMovedForAtLeast(ticks: number) {
			return {
				type: "origins:resource",
				resource: "command_survival:global/resource/time-since-last-movement",
				comparison: ">",
				compare_to: ticks
			};
		}

		export function isLiving() {
			return {
				type: "origins:living"
			}
		}
	}
}
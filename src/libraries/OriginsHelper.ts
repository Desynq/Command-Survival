import { Debug } from "./Debug";
import { $IOriginContainer, $IPowerContainer, $OriginLayer, $OriginsAPI } from "./JavaClasses";




export namespace OriginsHelper {

	export function getOriginLayer(originLayerId?: string) {
		return $OriginsAPI.getLayersRegistry().get(originLayerId ?? "origins:origin");
	}

	export function getOrigin(originId: string) {
		return $OriginsAPI.getOriginsRegistry().get(originId);
	}



	export function entity(entity: Internal.Entity) {
		class Entity {

			public getOriginId(originLayerId?: string): string | undefined {
				const layer = getOriginLayer(originLayerId);
				let output: string | undefined;
				$IOriginContainer.get(entity).ifPresent(container => {
					const origin = container.getOrigin(layer);
					output = `${origin.namespace}:${origin.path}`;
				});
				return output;
			}

			public hasPower(powerId: string): boolean {
				const container: Internal.LazyOptional<Internal.IPowerContainer> = $IPowerContainer.get(entity);
				let hasPower: boolean = false;
				container.map(x => {
					if (x.hasPower(powerId)) {
						hasPower = true;
					}
				});
				return hasPower;
			}
		}

		return new Entity;
	}
}
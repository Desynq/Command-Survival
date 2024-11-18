import { Debug } from "./Debug";
import { $IOriginContainer, $IPowerContainer, $OriginLayer, $OriginsAPI } from "./JavaClasses";




export namespace OriginsHelper {

	export function getOriginLayer(originLayerId?: string): io.github.edwinmindcraft.origins.api.origin.OriginLayer {
		return $OriginsAPI.getLayersRegistry().get(originLayerId ?? "origins:origin");
	}

	export function getOrigin(originId: string): Internal.Origin {
		return $OriginsAPI.getOriginsRegistry().get(originId);
	}

	export function getOriginNamespace(originId: string): string | null {
		const match = originId.match(/:(.+)/);
		return match ? match[1] : null;
	}



	export function entity(entity: Internal.Entity) {
		return new OriginsEntityHelper(entity);
	}
}

export class OriginsEntityHelper {

	public constructor(private entity: Internal.Entity) { }

	public getOriginId(originLayerId?: string): string | undefined {
		const layer = OriginsHelper.getOriginLayer(originLayerId);
		let output: string | undefined;
		$IOriginContainer.get(this.entity).ifPresent(container => {
			const origin = container.getOrigin(layer);
			output = `${origin.namespace}:${origin.path}`;
		});
		return output;
	}

	public hasPower(powerId: string): boolean {
		const container: Internal.LazyOptional<Internal.IPowerContainer> = $IPowerContainer.get(this.entity);
		let hasPower: boolean = false;
		container.map(x => {
			if (x.hasPower(powerId)) {
				hasPower = true;
			}
		});
		return hasPower;
	}
}
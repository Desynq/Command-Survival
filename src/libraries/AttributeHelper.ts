import { $Registries, $ResourceKey } from "./JavaClasses";



export class AttributeHelper {
	
	public static getAttributeFromId(server: Internal.MinecraftServer, id: string): Internal.Attribute {
		const resourceLocation = new ResourceLocation(id);
		const resourceKey = $ResourceKey.create($Registries.ATTRIBUTE, resourceLocation);
		return server.registryAccess().lookupOrThrow($Registries.ATTRIBUTE).getOrThrow(resourceKey).value();
	}
}
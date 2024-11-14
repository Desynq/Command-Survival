import { $Registries, $ResourceKey } from "../JavaClasses";



export class AttributeHelper {
	
	public static getAttribute(id: string): Internal.Attribute {
		const resourceLocation = new ResourceLocation(id);
		const resourceKey = $ResourceKey.create($Registries.ATTRIBUTE, resourceLocation);
		return Utils.server.registryAccess().lookupOrThrow($Registries.ATTRIBUTE).getOrThrow(resourceKey).value();
	}

	static get MAX_HEALTH(): Internal.Attribute {
		return this.getAttribute("minecraft:generic.max_health");
	}

	static get ATTACK_DAMAGE(): Internal.Attribute {
		return this.getAttribute("minecraft:generic.attack_damage");
	}

	static get ATTACK_SPEED(): Internal.Attribute {
		return this.getAttribute("minecraft:generic.attack_speed");
	}

	static get ARMOR_TOUGHNESS(): Internal.Attribute {
		return this.getAttribute("minecraft:generic.armor_toughness");
	}

	static get MOVEMENT_SPEED(): Internal.Attribute {
		return this.getAttribute("minecraft:generic.movement_speed");
	}
}



export class EntityHelper {
	private static uuidCache: Record<string, Internal.Entity> = {};

	public static fromUUID(uuid: string): Internal.Entity | null {
		const cachedEntity = this.uuidCache[uuid];
		if (cachedEntity) return cachedEntity;

		for (const entity of Utils.server.entities.toArray() as Array<Internal.Entity>) {
			if (entity.uuid.toString() == uuid) {
				this.uuidCache[uuid] = entity;
				return entity;
			}
		}
		return null;
	}

	public static ofType(type: string): Array<Internal.Entity> {
		const entities: Array<Internal.Entity> = [];

		for (const entity of Utils.server.entities.toArray() as Array<Internal.Entity>) {
			if (entity.type == type) {
				entities.push(entity);
			}
		}
		return entities;
	}
}
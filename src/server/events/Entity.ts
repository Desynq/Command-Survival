


export class Entity {
	public static instances: Set<Entity> = new Set();

	protected entity: Internal.Entity;
	protected uuid: string;

	protected constructor(entity: Internal.Entity) {
		this.entity = entity;
		this.uuid = this.entity.uuid.toString();

		Entity.instances.add(this);
	}

	public static createOrReuse(entity: Internal.Entity) {}

	protected tick() {}
}
import { EntityHelper } from "../../entity/Helper";



export class EntityBossbar {
	public static bossbars: Record<string, EntityBossbar> = {};

	public id: string;
	public stringUUID: string;
	public uuid: Internal.UUID;
	// public bossbar: Internal.CustomBossEvent;
	private entity: Internal.Entity;

	private constructor(entity: Internal.Entity) {
		this.entity = entity;
		this.uuid = entity.uuid;
		this.stringUUID = entity.uuid.toString();
		this.id = `boss:${this.stringUUID}`;
		// this.createCustomBossEvent();

		EntityBossbar.bossbars[this.stringUUID] = this;
	}

	// private createCustomBossEvent(): void {
	// 	this.bossbar = Utils.server.customBossEvents.get(this.id);
	// 	if (!this.bossbar) {
	// 		Utils.server.runCommandSilent(`bossbar add ${this.id} ""`);
	// 		this.bossbar = Utils.server.customBossEvents.get(this.id);
	// 	}
	// }


	public getEntity(): Internal.Entity | null {
		if (this.entity && this.entity.alive) return this.entity;
		
		const entity = EntityHelper.fromUUID(this.stringUUID);
		return entity ? entity : null;
	}

	public getCustomBossEvent(): void {
		
	}

	public garbageCollect(): void {

	}



	public static getOrCreate(entity: Internal.Entity): EntityBossbar {
		return this.get(entity) ?? new this(entity);
	}

	private static get(entity: Internal.Entity): EntityBossbar {
		return this.bossbars[entity.uuid.toString()];
	}
}
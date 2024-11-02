import { Entity } from "../events/Entity";




export class Boss extends Entity {

	protected bossbarId: string;
	bossbar: Internal.CustomBossEvent;

	private constructor(entity: Internal.Entity) {
		super(entity);
		this.bossbarId = `boss:${this.uuid}`;
		this.bossbar = Utils.server.customBossEvents.get(this.bossbarId);
		if (this.bossbar == null) this.createBossbar()
	}

	private createBossbar() {
		Utils.server.runCommandSilent(`bossbar add ${this.bossbarId} ""`);
		this.bossbar = Utils.server.customBossEvents.get(this.bossbarId);
	}
}
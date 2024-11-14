import { ApplyAttributesManager } from "../managers/ApplyAttributes";


PlayerEvents.respawned(event => {
	new ApplyAttributesManager(event.player as Player);
});
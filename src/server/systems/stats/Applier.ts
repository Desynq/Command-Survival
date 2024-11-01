import { AttributeHelper } from "../../../libraries/AttributeHelper";
import { AttributeModifierHelper } from "../../../libraries/AttributeModifierHelper";
import { UUIDHelper } from "../../../libraries/UUIDHelper";
import { StatsDataHelper } from "./DataHelper";
import { StatType, VariableAttributeModifier } from "./StatTypes";


export class StatsApplier {

	private server: Internal.MinecraftServer;
	private player: Internal.Player;
	private playerUUID: string;
	private statsDataHelper: StatsDataHelper;

	private constructor(server: Internal.MinecraftServer, player: Internal.Player, statsDataHelper?: StatsDataHelper) {
		this.server = server;
		this.player = player;
		this.playerUUID = this.player.uuid.toString();
		this.statsDataHelper = statsDataHelper ?? new StatsDataHelper(server, this.playerUUID);

		this.applyStats();
	}



	public static applyStatsFromUUID(server: Internal.MinecraftServer, uuid: string, statsDataHelper?: StatsDataHelper): void {
		const player = UUIDHelper.getPlayer(server, uuid);
		if (player) {
			this.applyStats(server, player, statsDataHelper);
		}
	}

	public static applyStats(server: Internal.MinecraftServer, player: Internal.Player, statsDataHelper?: StatsDataHelper): void {
		new StatsApplier(server, player, statsDataHelper);
	}



	private applyGenericAttribute(statType: StatType, index: number) {
		const modifier = statType.modifiers[index];
		const amountPerPoint = modifier.base;
		const points = this.statsDataHelper.getPointsFromStat(statType);
		const newValue = amountPerPoint * points;

		const helper = new AttributeModifierHelper(this.player, AttributeHelper.getAttributeFromId(this.server, modifier.attributeId), UUID.fromString(modifier.uuid), modifier.name);
		const oldValue = helper.getModifierValue();

		if (newValue != oldValue) {
			helper.removeModifier().addModifier(newValue, modifier.operation);
			if (modifier.attributeId == "minecraft:generic.max_health") {
				helper.updateHealth();
			}
		}
	}

	private applyStats() {
		this.applyStrength();
		this.applyConstitution();
		this.applyPerception();
		this.applyAgility();
		this.applyDexterity();
		this.applyEndurance();
	}

	private applyStrength(): void {
		this.applyGenericAttribute(StatType.STRENGTH, 0);
	}

	private applyConstitution(): void {
		this.applyGenericAttribute(StatType.CONSTITUTION, 0);
	}

	private applyPerception(): void {
		this.applyGenericAttribute(StatType.PERCEPTION, 0);
		this.applyGenericAttribute(StatType.PERCEPTION, 1);
		this.applyGenericAttribute(StatType.PERCEPTION, 2);
		this.applyGenericAttribute(StatType.PERCEPTION, 3);
	}

	private applyAgility(): void {
		this.applyGenericAttribute(StatType.AGILITY, 0);
	}

	private applyDexterity(): void {
		this.applyGenericAttribute(StatType.DEXTERITY, 0);
	}

	private applyEndurance(): void {
		this.applyGenericAttribute(StatType.ENDURANCE, 0);
		this.applyGenericAttribute(StatType.ENDURANCE, 1);
		this.applyGenericAttribute(StatType.ENDURANCE, 2);
	}
}
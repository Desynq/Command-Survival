declare const global: {
	"jeiRuntime": Internal.JEIJeiRuntime,
	"$Player": typeof any,
	"effectTick": {
		Pinged(entity: Internal.LivingEntity, effectLvl: number): void
	},
	"events": {
		LivingEntityUseItemEvent$Finish(event: Internal.LivingEntityUseItemEvent$Finish): void;
		VanillaGameEvent(event: Internal.VanillaGameEvent): void;
	},
	"$AdditionalEntityAttributes": typeof any;
};

type Player = Internal.Player & Internal.ServerPlayer & Internal.LivingEntity & Internal.Entity;
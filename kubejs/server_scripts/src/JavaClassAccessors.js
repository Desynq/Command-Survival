// priority: 2147483647



// level
const $GameRules = Java.loadClass("net.minecraft.world.level.GameRules");



// commands
const $Commands = Java.loadClass("net.minecraft.commands.Commands");



const $Arguments = Java.loadClass("dev.latvian.mods.kubejs.command.ArgumentTypeWrappers");



// attributes
const $Attributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes');
const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier');



/*
net.minecraft.nbt
*/
const $Tag = Java.loadClass("net.minecraft.nbt.Tag");
const $CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag");
const $StringTag = Java.loadClass('net.minecraft.nbt.StringTag');
const $ListTag = Java.loadClass("net.minecraft.nbt.ListTag");



/*
net.minecraft.world.effect
*/
const $MobEffectInstance = Java.loadClass("net.minecraft.world.effect.MobEffectInstance");



/*
java.util
*/
const $UUID = Java.loadClass("java.util.UUID");



/*
net.minecraft.world.entity.player
*/
global.$Player = Java.loadClass("net.minecraft.world.entity.player.Player");

/*
de.dafuqs.additionalentityattributes
*/
global.$AdditionalEntityAttributes = Java.loadClass("de.dafuqs.additionalentityattributes.AdditionalEntityAttributes");
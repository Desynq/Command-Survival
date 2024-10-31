// priority: 0

ServerEvents.recipes(event => {
    event.remove('dimdoors:iron_dimensional_door');
    event.remove('dimdoors:oak_dimensional_door');
    event.remove('dimdoors:gold_dimensional_door');
    event.remove('dimdoors:quartz_dimensional_door');

    event.shaped(
        Item.of('minecraft:echo_shard', 1),
        [
            '010',
            '010',
            '010'
        ],
        {
            0: 'minecraft:amethyst_shard',
            1: 'minecraft:ender_pearl'
        }
    );

    event.shaped(
        Item.of('dimdoors:item_ag_dim_minecraft_iron_door', 1),
        [
            ' 0 ',
            '121',
            ' 0 '
        ],
        {
            0: 'minecraft:echo_shard',
            1: 'minecraft:iron_door',
            2: 'dimdoors:stable_fabric'
        }
    );
});
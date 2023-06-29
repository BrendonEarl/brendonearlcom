MyGame.components.Collision = function (array, entities, reportEvent, particleSystem) {
    'use strict';


    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j].length > 1) {
                for (let k = 0; k < array[i][j].length - 1; k++) {
                    let check = array[i][j][k];
                    for (let z = k + 1; z < array[i][j].length; z++) {
                        if (entities[check] != undefined && entities[array[i][j][z]] != undefined) {
                            //winning
                            if (entities[check].components.properties.is_win && entities[array[i][j][z]].components.properties.is_controllable) {
                                reportEvent({ type: 'win' })

                            }
                            if (entities[check].components.properties.is_controllable && entities[array[i][j][z]].components.properties.is_win) {
                                reportEvent({ type: 'win' })
                            }

                            //burning
                            if (entities[check].components.properties.is_destroy && entities[array[i][j][z]].components.properties.is_controllable) {
                                particleSystem.create_destroy_effect(entities[check]);
                                delete entities[array[i][j][z]];
                                reportEvent({
                                    type: 'death',
                                    location: { x: i, y: j }
                                })
                                break;
                            }
                            if (entities[check].components.properties.is_controllable && entities[array[i][j][z]].components.properties.is_destroy) {
                                particleSystem.create_destroy_effect(entities[check]);
                                delete entities[check]
                                reportEvent({
                                    type: 'death',
                                    location: { x: i, y: j }
                                })
                                break;
                            }
                            //melt rocks
                            // if (entities[check].components.properties.is_destroy && entities[array[i][j][z]].components.properties.is_pushable) {
                            //     particleSystem.create_destroy_effect(entities[check]);
                            //     delete entities[array[i][j][z]];
                            //     // entities[i][j].splice(z,1);
                            //     reportEvent({
                            //         type: 'death',
                            //         location: { x: i, y: j }
                            //     })
                            //     break;
                            // }
                            // if (entities[check].components.properties.is_pushable && entities[array[i][j][z]].components.properties.is_destroy) {
                            //     particleSystem.create_destroy_effect(entities[check]);
                            //     delete entities[check]
                            //     // entities[i][j].splice(k,1);
                            //     reportEvent({
                            //         type: 'death',
                            //         location: { x: i, y: j }
                            //     })
                            //     break;
                            // }

                            //drowning
                            if (entities[check].components.properties.is_sink && entities[array[i][j][z]].components.properties.is_controllable) {
                                particleSystem.create_destroy_effect(entities[check]);

                                delete entities[array[i][j][z]];
                                delete entities[check]
                                reportEvent({
                                    type: 'death',
                                    location: { x: i, y: j }
                                })
                                break;
                            }
                            if (entities[check].components.properties.is_controllable && entities[array[i][j][z]].components.properties.is_sink) {
                                particleSystem.create_destroy_effect(entities[check]);
                                delete entities[array[i][j][z]];
                                delete entities[check]
                                reportEvent({
                                    type: 'death',
                                    location: { x: i, y: j }
                                })
                                break;

                            }

                            //sinking
                            if (entities[check].components.properties.is_sink && entities[array[i][j][z]].components.properties.is_pushable) {
                                if (entities[array[i][j][z]].components.object) {
                                    particleSystem.create_destroy_effect(entities[check]);

                                    delete entities[array[i][j][z]];
                                    delete entities[check]
                                    reportEvent({
                                        type: 'sink',
                                        location: { x: i, y: j }
                                    })
                                    break;
                                }

                            }
                            if (entities[check].components.properties.is_pushable && entities[array[i][j][z]].components.properties.is_sink) {
                                if (entities[check].components.object) {
                                    particleSystem.create_destroy_effect(entities[check]);
                                    delete entities[array[i][j][z]];
                                    delete entities[check]
                                    reportEvent({
                                        type: 'sink',
                                        location: { x: i, y: j }
                                    })
                                    break;
                                }
                            }
                        }

                    }
                }
            }
        }
    }

    let api = {
        get name() { return 'collision'; },
    };

    return api;
};

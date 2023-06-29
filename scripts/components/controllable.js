MyGame.components.Controllable = function(spec) {
    'use strict';

    let api = {
        get name() { return 'controllable'; },
        get keys() { return spec.keys; }
    };

    return api;
};

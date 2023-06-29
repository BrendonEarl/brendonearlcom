MyGame.components.Properties = function(spec) {
    'use strict';

    let api = {
        get name() { return 'properties'; },

        get is_controllable() { return spec.is_controllable; },
        set is_controllable(value) { spec.is_controllable = value; },

        get is_pushable() { return spec.is_pushable; },
        set is_pushable(value) { spec.is_pushable = value; },

        get is_stop() { return spec.is_stop; },
        set is_stop(value) { spec.is_stop = value; },

        get is_win() { return spec.is_win; },
        set is_win(value) { spec.is_win = value; },

        get is_destroy() { return spec.is_destroy; },
        set is_destroy(value) { spec.is_destroy = value; },

        get is_sink() { return spec.is_sinkable; },
        set is_sink(value) { spec.is_sinkable = value; },

        get is_connector() { return spec.is_connector; }  
    };

    return api;
};

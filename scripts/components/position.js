MyGame.components.Position = function(spec) {
    'use strict';

    let api = {
        get name() { return 'position'; },
        get x() { return spec.x; },
        get y() { return spec.y; },

        set x(loc_x) { spec.x = loc_x; },
        set y(loc_y) { spec.y = loc_y; }
    };

    return api;
};

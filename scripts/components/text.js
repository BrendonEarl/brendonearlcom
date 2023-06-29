MyGame.components.Text = function(spec) {
    'use strict';

    let api = {
        get name() { return 'text'; },
        get word() { return spec.word; },
        get type() { return spec.type; }
    };

    return api;
};

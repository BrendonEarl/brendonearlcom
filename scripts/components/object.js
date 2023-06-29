MyGame.components.Object = function(spec) {
    'use strict';

    let api = {
        get name() { return 'object'; },
        get word() { return spec.word; }
    };

    return api;
};

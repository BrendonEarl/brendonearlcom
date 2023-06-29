// This component would be added by the movement system if the 
// entity is ready to move, and it will be removed once the entity
// has been moved.
MyGame.components.CanMove = function() {
    'use strict';
    let api = {
        get name() { return 'canMove'; }
    };

    return api;
};

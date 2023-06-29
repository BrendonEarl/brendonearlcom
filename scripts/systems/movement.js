// --------------------------------------------------------------
//
// This system is responsible for handling the movement of any
// entity with a movable & position components.
//
// --------------------------------------------------------------
MyGame.systems.movement = (function (graphics, components) {
    'use strict';

    // Check if this is false before moving stuff so we only get one movement per key press
    let stopInput = false;
    // When doing a down movement, for example, check if keysDown[localStorage.getItem(downMoveKey)]
    // and also check if stopInput is false, and if so, then allow the movement down.
    let keysDown = {};

    let end_game = false;
    let undo_happened = false;

    let movement_happened = false;

    // Keyboard constants
    let upKey = localStorage.getItem('up-control');
    let downKey = localStorage.getItem('down-control');
    let leftKey = localStorage.getItem('left-control');
    let rightKey = localStorage.getItem('right-control');
    let undoKey = localStorage.getItem('undo-control');
    let resetKey = localStorage.getItem('reset-control');

    function keyPress(e) {
        keysDown[e.key] = e.timeStamp;

        // NOTE: Put stopInput = true in the update code after the movements happen,
        // And then when the key is released it will change stopInput to false
        // stopInput = true;
    }

    function keyRelease(e) {
        delete keysDown[e.key];
        stopInput = false;
    }

    // --------------------------------------------------------------
    //
    // This handles the collision checks that happen before movements 
    // occur.
    //
    // --------------------------------------------------------------
    function collides(a, b) {
        return a.components.position.x === b.components.position.x &&
            a.components.position.y === b.components.position.y;
    }

    // --------------------------------------------------------------
    //
    // This goes through all the entities, and if they have the
    // canMove component, it calls the mode function on them and
    // then removes the canMove component.
    //
    // --------------------------------------------------------------
    function moveAllEntities(entities, direction, gridSize, initializeBoard) {
        for (let id in entities) {
            let currentEntity = entities[id];
            // console.log(currentEntity.id)
            // If the entity is controllable, move it
            if (currentEntity.components.canMove) {
                movement_happened = true;
                switch (direction) {
                    case 'up':
                        move(currentEntity, 0, -1, gridSize);
                        currentEntity.removeComponent(components.CanMove());
                        break;
                    case 'down':
                        move(currentEntity, 0, 1, gridSize);
                        currentEntity.removeComponent(components.CanMove());
                        break;
                    case 'left':
                        move(currentEntity, -1, 0, gridSize);
                        currentEntity.removeComponent(components.CanMove());
                        break;
                    case 'right':
                        move(currentEntity, 1, 0, gridSize);
                        currentEntity.removeComponent(components.CanMove());
                        break;
                }
            }
        }
        initializeBoard();
        // console.log(entities);
    }

    // --------------------------------------------------------------
    //
    // This handles the movement of an entity by updating its
    // position in the position component.
    //
    // --------------------------------------------------------------
    function move(entity, xIncrement, yIncrement, gridSize) {
        let position = entity.components.position;

        // Update the position of the entity
        position.x += xIncrement;
        position.y += yIncrement;

        // Update the entity's center after the movement occurs
        updateCenter(entity, gridSize);
    }

    // --------------------------------------------------------------
    //
    // This recursive function starts at the entity and looks in the
    // direction of movement to see if there are any pushable things
    // that also need to be moved, or if there is a wall blocking 
    // things from moving. Then as it backs out of the recursion, it
    // either moves all that need to be moved or doesn't move them.
    //
    // The gameGrid will be the 2D array of all the entities being stored
    //
    // --------------------------------------------------------------
    function moveEntity(entity, entities, direction, gameGrid) {
        // Base Case: There is an entity there that has the "is_stop" property
        if (entity != undefined && entity.components.properties.is_stop) {
            return false;
        }
        // Base Case: There is an empty space or the entity doesn't have the "is_stop"
        //            property and it isn't something pushable
        else if (entity == undefined ||
            (!entity.components.properties.is_stop && !entity.components.properties.is_pushable)) {
            // If the thing is movable (not pushable), allow stacking by returning true, but also
            // try to move the current entity
            if (entity != undefined && entity.components.properties.is_controllable) {
                let posX = parseInt(entity.components.position.x);
                let posY = parseInt(entity.components.position.y);
                switch (direction) {
                    case 'up':
                        let canMoveUp = false;
                        if (gameGrid[posY - 1][posX].length == 0) {
                            canMoveUp = true;
                        } else {
                            for (let entityNum in gameGrid[posY - 1][posX]) {
                                let entityAbove = entities[gameGrid[posY - 1][posX][entityNum]];
                                // canMoveUp = (true && (entityAbove.components.properties.is_stop ? false : moveEntity(entityAbove, entities, 'up', gameGrid)));
                                canMoveUp = true;
                                if (entityAbove.components.properties.is_stop) {
                                    canMoveUp = false;
                                } else if (entityAbove.components.properties.is_pushable) {
                                    canMoveUp = (true && moveEntity(entityAbove, entities, 'up', gameGrid));
                                }
                                // moveEntity(entityAbove, entities, 'up', gameGrid);
                            }
                        }
                        if (canMoveUp) {
                            if (!entity.components.canMove) {
                                entity.addComponent(components.CanMove());
                            }
                            return true;
                        } else {
                            return false;
                        }
                    case 'down':
                        let canMoveDown = false;
                        if (gameGrid[posY + 1][posX].length == 0) {
                            canMoveDown = true;
                        } else {
                            for (let entityNum in gameGrid[posY + 1][posX]) {
                                let entityBelow = entities[gameGrid[posY + 1][posX][entityNum]];
                                // canMoveDown = (true && (entityBelow.components.properties.is_stop ? false : moveEntity(entityBelow, entities, 'down', gameGrid)));
                                canMoveDown = true;
                                if (entityBelow.components.properties.is_stop) {
                                    canMoveDown = false;
                                } else if (entityBelow.components.properties.is_pushable) {
                                    canMoveDown = (true && moveEntity(entityBelow, entities, 'down', gameGrid));
                                }
                            }
                        }
                        if (canMoveDown) {
                            if (!entity.components.canMove) {
                                entity.addComponent(components.CanMove());
                            }
                            return true;
                        } else {
                            return false;
                        }

                    case 'left':
                        let canMoveLeft = false;
                        if (gameGrid[posY][posX - 1].length == 0) {
                            canMoveLeft = true;
                        } else {
                            for (let entityNum in gameGrid[posY][posX - 1]) {
                                let entityLeft = entities[gameGrid[posY][posX - 1][entityNum]];
                                // canMoveLeft = (true && (entityLeft.components.properties.is_stop ? false : moveEntity(entityLeft, entities, 'left', gameGrid)));
                                canMoveLeft = true;
                                if (entityLeft.components.properties.is_stop) {
                                    canMoveLeft = false;
                                } else if (entityLeft.components.properties.is_pushable) {
                                    canMoveLeft = (true && moveEntity(entityLeft, entities, 'left', gameGrid));
                                }
                            }
                        }
                        if (canMoveLeft) {
                            if (!entity.components.canMove) {
                                entity.addComponent(components.CanMove());
                            }
                            return true;
                        } else {
                            return false;
                        }
                    case 'right':
                        let canMoveRight = false;
                        if (gameGrid[posY][posX + 1].length == 0) {
                            canMoveRight = true;
                        } else {
                            for (let entityNum in gameGrid[posY][posX + 1]) {
                                let entityRight = entities[gameGrid[posY][posX + 1][entityNum]];
                                // canMoveRight = (true && (entityRight.components.properties.is_stop ? false : moveEntity(entityRight, entities, 'right', gameGrid)));
                                canMoveRight = true;
                                if (entityRight.components.properties.is_stop) {
                                    canMoveRight = false;
                                } else if (entityRight.components.properties.is_pushable) {
                                    canMoveRight = (true && moveEntity(entityRight, entities, 'right', gameGrid));
                                }
                            }
                        }
                        if (canMoveRight) {
                            if (!entity.components.canMove) {
                                entity.addComponent(components.CanMove());
                            }
                            return true;
                        } else {
                            return false;
                        }
                }
            }
            // If not movable, still just return true if there's an empty space or
            // background or something
            return true;
        }
        // Recursive case for when looking in a direction and there's another entity there
        // that is pushable. (this case doesn't account for movable)
        else {
            let posX = entity.components.position.x;
            let posY = entity.components.position.y;
            switch (direction) {
                case 'up':
                    let canMoveUp = false;
                    if (gameGrid[posY - 1][posX].length == 0) {
                        canMoveUp = true;
                    } else {
                        for (let entityNum in gameGrid[posY - 1][posX]) {
                            let entityAbove = entities[gameGrid[posY - 1][posX][entityNum]];
                            canMoveUp = (true && moveEntity(entityAbove, entities, 'up', gameGrid));
                            // if (canMoveUp) {
                            //     if (!entity.components.canMove) {
                            //         entity.addComponent(components.CanMove());
                            //     }
                            //     return true;
                            // } else {
                            //     return false;
                            // }
                        }
                    }
                    if (canMoveUp) {
                        if (!entity.components.canMove) {
                            entity.addComponent(components.CanMove());
                        }
                        return true;
                    } else {
                        return false;
                    }
                case 'down':
                    let canMoveDown = false;
                    if (gameGrid[posY + 1][posX].length == 0) {
                        canMoveDown = true;
                    } else {
                        for (let entityNum in gameGrid[posY + 1][posX]) {
                            let entityBelow = entities[gameGrid[posY + 1][posX][entityNum]];
                            canMoveDown = (true && moveEntity(entityBelow, entities, 'down', gameGrid));
                        }
                    }
                    if (canMoveDown) {
                        if (!entity.components.canMove) {
                            entity.addComponent(components.CanMove());
                        }
                        return true;
                    } else {
                        return false;
                    }

                case 'left':
                    let canMoveLeft = false;
                    if (gameGrid[posY][posX - 1].length == 0) {
                        canMoveLeft = true;
                    } else {
                        for (let entityNum in gameGrid[posY][posX - 1]) {
                            let entityLeft = entities[gameGrid[posY][posX - 1][entityNum]];
                            canMoveLeft = (true && moveEntity(entityLeft, entities, 'left', gameGrid));
                        }
                    }
                    if (canMoveLeft) {
                        if (!entity.components.canMove) {
                            entity.addComponent(components.CanMove());
                        }
                        return true;
                    } else {
                        return false;
                    }
                case 'right':
                    let canMoveRight = false;
                    if (gameGrid[posY][posX + 1].length == 0) {
                        canMoveRight = true;
                    } else {
                        for (let entityNum in gameGrid[posY][posX + 1]) {
                            let entityRight = entities[gameGrid[posY][posX + 1][entityNum]];
                            canMoveRight = (true && moveEntity(entityRight, entities, 'right', gameGrid));
                        }
                    }
                    if (canMoveRight) {
                        if (!entity.components.canMove) {
                            entity.addComponent(components.CanMove());
                        }
                        return true;
                    } else {
                        return false;
                    }
            }
        }
    }

    // --------------------------------------------------------------
    //
    // This handles the updating of the center of the entity in its
    // appearance component
    //
    // --------------------------------------------------------------
    function updateCenter(entity, gridSize, gameGrid) {
        // Update the center based on current position
        let positionX = entity.components.position.x;
        let positionY = entity.components.position.y;

        let appearance = entity.components.appearance;

        // Set the center to the center of the grid location's box
        let newCenter = {
            x: positionX * (graphics.width / gridSize) + (graphics.width / gridSize / 2),
            y: positionY * (graphics.height / gridSize) + (graphics.height / gridSize / 2)
        }

        // Set the entity's center to the new center
        appearance.center = newCenter;
    }

    // --------------------------------------------------------------
    //
    // Grind through all the entities and move the ones that can move.
    //
    // STILL NEED TO WRITE THE HELPER FUNCTIONS BEFORE WRITING THIS
    //
    // --------------------------------------------------------------
    function update(elapsedTime, entities, gameGrid, gridSize, reportEvent, initializeBoard) {
        let currentDirection = null;

        // Check for undo or reset
        if (keysDown[undoKey] && !stopInput && !end_game) {
            reportEvent({ type: 'undo' });
            stopInput = true;
        }
        if (keysDown[resetKey] && !stopInput && !end_game) {
            reportEvent({ type: 'reset' });
            stopInput = true;
        }


        // Get the entities that need to move and set their canMove
        // components
        for (let id in entities) {
            let currentEntity = entities[id];
            // If the entity is controllable, move it
            if (currentEntity.components.properties.is_controllable) {
                if (keysDown[upKey] && !stopInput && !end_game) {
                    if (undo_happened) {
                        reportEvent({ type: 'push_again' });
                        undo_happened = false;
                    }
                    moveEntity(currentEntity, entities, 'up', gameGrid);
                    currentDirection = 'up';
                    // stopInput = true;
                    // Move all the entities that have the canMove component
                    // moveAllEntities(entities, currentDirection, gridSize, initializeBoard);
                } else if (keysDown[downKey] && !stopInput && !end_game) {
                    if (undo_happened) {
                        reportEvent({ type: 'push_again' });
                        undo_happened = false;
                    }
                    moveEntity(currentEntity, entities, 'down', gameGrid);
                    currentDirection = 'down';
                    // stopInput = true;
                    // Move all the entities that have the canMove component
                    // moveAllEntities(entities, currentDirection, gridSize, initializeBoard);
                } else if (keysDown[leftKey] && !stopInput && !end_game) {
                    if (undo_happened) {
                        reportEvent({ type: 'push_again' });
                        undo_happened = false;
                    }
                    moveEntity(currentEntity, entities, 'left', gameGrid);
                    currentDirection = 'left';
                    // stopInput = true;
                    // Move all the entities that have the canMove component
                    // moveAllEntities(entities, currentDirection, gridSize, initializeBoard);
                } else if (keysDown[rightKey] && !stopInput && !end_game) {
                    if (undo_happened) {
                        reportEvent({ type: 'push_again' });
                        undo_happened = false;
                    }
                    moveEntity(currentEntity, entities, 'right', gameGrid);
                    currentDirection = 'right';
                    // stopInput = true;
                    // Move all the entities that have the canMove component
                    // moveAllEntities(entities, currentDirection, gridSize, initializeBoard);
                }
            }
        }
        if ((keysDown[upKey] && !stopInput) || (keysDown[downKey] && !stopInput) || (keysDown[leftKey] && !stopInput) || (keysDown[rightKey] && !stopInput)) {
            stopInput = true;
        }
        moveAllEntities(entities, currentDirection, gridSize, initializeBoard);
        // Report movement if needed
        if (movement_happened) {
            reportEvent({ type: 'movement' });
            movement_happened = false;
        }
        // // Move all the entities that have the canMove component
        // moveAllEntities(entities, currentDirection, gridSize);

    }

    function reportEventMovement(info) {
        switch (info.type) {
            case 'end_game':
                end_game = true;
                break;
            case 'begin_game':
                end_game = false;
                getControls();
                break;
            case 'undo_happened':
                undo_happened = true;
                break;

        }
    }

    function getControls() {
        // Keyboard constants
        upKey = localStorage.getItem('up-control');
        downKey = localStorage.getItem('down-control');
        leftKey = localStorage.getItem('left-control');
        rightKey = localStorage.getItem('right-control');
        undoKey = localStorage.getItem('undo-control');
        resetKey = localStorage.getItem('reset-control');
    }

    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);

    let api = {
        update: update,
        reportEventMovement
    };

    return api;
}(MyGame.graphics, MyGame.components));



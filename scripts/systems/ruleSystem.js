// --------------------------------------------------------------
//
// This system is responsible for rendering the whole game, which
// is just the background and the entities with a appearance
// and position components.
//
// --------------------------------------------------------------
MyGame.systems.ruleSystem = function (components) {
    'use strict';

    // Variables to track property changes (for particle effects)
    let is_you_changed = false;
    let is_win_changed = false;


    // --------------------------------------------------------------
    //
    // This function will reset ALL entities back to their base components so that the rule scans
    // in the other functions will truly make sure to set all the rules correctly. This will also help
    // so that if a rule with text was broken, we just don't end up setting those properties again
    // on the base components, rather than trying to update all the components accordingly.
    //
    // The appearance and positions don't need to change, so maybe just go through all the "properties"
    // components and reset everything to false, except for the rare cases like hedges which are always stop, 
    // or text which is always push
    //
    // --------------------------------------------------------------
    function resetRules(entities) {
        for (let entity in entities) {
            let currentEntity = entities[entity];
            // Special cases
            // TEXT entities will always be push
            if (currentEntity.components.text) {
                currentEntity.removeComponent(components.Properties);
                currentEntity.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
            }
            
            if (currentEntity.components.object) {
                // Hedge OBJECTS will always be stop
                if (currentEntity.components.object.word == 'hedge') {
                    currentEntity.removeComponent(components.Properties);
                    currentEntity.addComponent(components.Properties({
                        is_controllable: false,
                        is_pushable: false,
                        is_stop: true,
                        is_win: false,
                        is_destroy: false,
                        is_burnable: false,
                        is_sinkable: false
                    }));
                } else {
                    // All other objects will just have no properties
                    currentEntity.removeComponent(components.Properties);
                    currentEntity.addComponent(components.Properties({
                        is_controllable: false,
                        is_pushable: false,
                        is_stop: false,
                        is_win: false,
                        is_destroy: false,
                        is_burnable: false,
                        is_sinkable: false
                    }));
                }
            }
        }
        return;
    }

    // --------------------------------------------------------------
    //
    // Function used to update a noun entity to another noun entity.
    //
    // The inputs are both TEXT entities, so we need to find the 
    // OBJECT entities associated with the textEntityToChange and update
    // ALL their components to match the entity associated with
    // the textEntityToReference. Do this by basically removing all
    // the components of the entities and then doing
    // addComponent(_.cloneDeep(component)) for each component of the 
    // objectEntityToReference
    //
    // will need to loop through the entities list to find the first 
    // entity associated with textEntitityToReference, and set that as
    // the objectEntityToReference, 
    //
    // then loop through the entities and for ALL the objectEntityToChange
    // entities, do the changing of their components. Then later, when the
    // entities are saved again, they will be saved in their new form.
    //
    // --------------------------------------------------------------
    function make_noun_noun(textEntityToChange, textEntityToReference, entities, GRID_SIZE) {
        
        let textEntityToChangeWord = textEntityToChange.components.text.word;
        let textEntityToReferenceWord = textEntityToReference.components.text.word;

        for (let entity in entities) {
            let currentEntity = entities[entity];
            // If current entity is entityToChange that we want
            if (currentEntity.components.object) {
                if (currentEntity.components.object.word == textEntityToChangeWord) {
                    // Create the new entity in its place, and then delete the current entity from entities
                    let currentX = currentEntity.components.position.x;
                    let currentY = currentEntity.components.position.y;
                    BigFunctions.create_entity_by_word(textEntityToReferenceWord,currentX,currentY,entities, GRID_SIZE);

                    delete entities[currentEntity.id];
                }
            }
        }
        return;
    }

    // --------------------------------------------------------------
    //
    // Function used to update a noun entity's properties
    //
    // The inputs are both TEXT entities, so we need to find the OBJECT
    // entities associated with the textEntityToChange and update
    // All their 'properties' components to match the new properties
    // associated with the textPropertyToAdd. ONLY update the properties
    // in the 'properties' component that need updating, because it is
    // possible that another rule will update other properties that are
    // independent of the ones in any given property update.
    //
    // We will just need to loop through the entities and for ALL the
    // objectEntityToChange entities, do the updating of their 
    // properties. Then later, when the entities are saved again, they
    // will be saved with their new properties.
    //
    // --------------------------------------------------------------
    function set_noun_properties(textEntityToChange, textPropertyToAdd, entities) {
        // Cases: textPropertyToAdd.components.text.word ==
        //        'stop', 'push', 'you', 'win', 'sink', 'kill'
        let textEntityToChangeWord = textEntityToChange.components.text.word;
        let textPropertyToAddWord = textPropertyToAdd.components.text.word;

        for (let entity in entities) {
            let currentEntity = entities[entity];
            // If current entity is the entityToChange that we want
            if (currentEntity.components.object) {
                if (currentEntity.components.object.word == textEntityToChangeWord) {
                    // switch(textPropertyToAddWord) {
                    //     case 'stop':
                    //         currentEntity.components.properties.is_stop = true;
                    //         break;
                    //     case 'push':
                    //         currentEntity.components.properties.is_pushable = true;
                    //         break;
                    //     case 'you':
                    //         currentEntity.components.properties.is_controllable = true;
                    //         break;
                    //     case 'win':
                    //         currentEntity.components.properties.is_win = true;
                    //         break;
                    //     case 'sink':
                    //         currentEntity.components.properties.is_destroy = true;
                    //         break;
                    //     case 'kill':
                    //         currentEntity.components.properties.is_destroy = true;
                    //         break;
                    // }
                    if (textPropertyToAddWord == 'stop') {
                        currentEntity.components.properties.is_stop = true;
                    } else if (textPropertyToAddWord == 'push') {
                        currentEntity.components.properties.is_pushable = true;
                    } else if (textPropertyToAddWord == 'you') {
                        currentEntity.components.properties.is_controllable = true;
                        currentEntity.components.appearance.render_priority = 4; // Set highest render priority
                    } else if (textPropertyToAddWord == 'win') {
                        currentEntity.components.properties.is_win = true;
                    } else if (textPropertyToAddWord == 'sink') {
                        currentEntity.components.properties.is_sink = true;
                    } else if (textPropertyToAddWord == 'kill') {
                        currentEntity.components.properties.is_destroy = true;
                    }
                }
            }
        }

        return;
    }

    // --------------------------------------------------------------
    //
    // Function used to check the rules on the game board
    //
    // --------------------------------------------------------------
    function checkRules(entities, gameBoard, GRID_SIZE) {
        // console.log(gameBoard);
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                // Only need to check the first item in the array since nothing
                // should ever overlap a word entity

                // Check if the entity is of text type
                let currentEntity = entities[gameBoard[i][j][0]];
                // console.log(gameBoard[i][j][0]);
                // console.log(current)
                if (currentEntity != undefined && currentEntity.components.text) {
                    // Check if the text is an "IF" word
                    if (currentEntity.components.text.type == 'connector') {
                        // Get the entity to the left (if it exists)
                        let leftEntity = undefined;
                        if (gameBoard[i][j-1].length > 1) {
                            for (let k = 0; k < gameBoard[i][j-1].length - 1; k++) {
                                let id = gameBoard[i][j-1][k];
                                if (entities[id].components.text) {
                                    leftEntity = entities[id];
                                }
                            }
                        } else {
                            leftEntity = entities[gameBoard[i][j - 1][0]];
                        }
                        // let leftEntity = entities[gameBoard[i][j - 1][0]];
                        // Get the entity to the right (if it exists)
                        let rightEntity = undefined;
                        if (gameBoard[i][j+1].length > 1) {
                            for (let k = 0; k < gameBoard[i][j+1].length - 1; k++) {
                                let id = gameBoard[i][j+1][k];
                                if (entities[id].components.text) {
                                    rightEntity = entities[id];
                                }
                            }
                        } else {
                            rightEntity = entities[gameBoard[i][j + 1][0]];
                        }
                        // let rightEntity = entities[gameBoard[i][j + 1][0]];
                        // Make a rule ONLY if left and right entities are text
                        if (leftEntity != undefined && leftEntity.components.text && rightEntity != undefined && rightEntity.components.text) {
                            // Make a rule ONLY if the left entity is a noun
                            if (leftEntity.components.text.type == 'noun') {
                                // Make a rule ONLY if the right entity is a noun or a property
                                // Case for noun
                                if (rightEntity.components.text.type == 'noun') {
                                    // Remove all current components of the right entity
                                    // and replace them with components of the left entity
                                    make_noun_noun(leftEntity, rightEntity, entities, GRID_SIZE);
                                    // console.log(`${leftEntity.components.text.word} ${currentEntity.components.text.word} ${rightEntity.components.text.word}`);
                                }
                                // Case for property
                                if (rightEntity.components.text.type == 'property') {
                                    set_noun_properties(leftEntity, rightEntity, entities);
                                    // console.log(`${leftEntity.components.text.word} ${currentEntity.components.text.word} ${rightEntity.components.text.word}`);
                                }
                            }
                        }

                        // Do the same as the above loop, but for up and down entities
                        // Get the entity above (if it exists)
                        let topEntity = undefined;
                        if (gameBoard[i-1][j].length > 1) {
                            for (let k = 0; k < gameBoard[i-1][j].length - 1; k++) {
                                let id = gameBoard[i-1][j][k];
                                if (entities[id].components.text) {
                                    topEntity = entities[id];
                                }
                            }
                        } else {
                            topEntity = entities[gameBoard[i - 1][j][0]];
                        }
                        // let topEntity = entities[gameBoard[i - 1][j][0]];
                        // Get the entity below (if it exists)
                        let bottomEntity = undefined;
                        if (gameBoard[i+1][j].length > 1) {
                            for (let k = 0; k < gameBoard[i+1][j].length - 1; k++) {
                                let id = gameBoard[i+1][j][k];
                                if (entities[id].components.text) {
                                    bottomEntity = entities[id];
                                }
                            }
                        } else {
                            bottomEntity = entities[gameBoard[i + 1][j][0]];
                        }
                        // let bottomEntity = entities[gameBoard[i + 1][j][0]];
                        // Make a rule ONLY if top and bottom entities are text
                        if (topEntity != undefined && topEntity.components.text && bottomEntity != undefined && bottomEntity.components.text) {
                            // Make a rule ONLY if the top entity is a noun
                            if (topEntity.components.text.type == 'noun') {
                                // Make a rule ONLY if the bottom entity is a noun or a property
                                // Case for noun
                                if (bottomEntity.components.text.type == 'noun') {
                                    // Remove all current components of the bottom entity
                                    // and replace them with components of the top entity
                                    make_noun_noun(topEntity, bottomEntity, entities, GRID_SIZE);
                                    // console.log(`${topEntity.components.text.word} ${currentEntity.components.text.word} ${bottomEntity.components.text.word}`);
                                }
                                // Case for property
                                if (bottomEntity.components.text.type == 'property') {
                                    set_noun_properties(topEntity, bottomEntity, entities);
                                    // console.log(`${topEntity.components.text.word} ${currentEntity.components.text.word} ${bottomEntity.components.text.word}`);
                                }
                            }
                        }
                    } // end (if entity is connector loop)
                } // end (if entity is TEXT loop)
            } // end (for j loop)
        } // end (for i loop)
    }

    // --------------------------------------------------------------
    //
    // Public interface used to update the rules of the game
    //
    // --------------------------------------------------------------
    function update(entities, gameBoard, GRID_SIZE) {
        //TODO: This function will reset ALL entities back to their base components so that the rule scans
        // in the next function will truly make sure to set all the rules correctly. This will also help
        // so that if a rule with text was broken, we just don't end up setting those properties again
        // on the base components, rather than trying to update all the components accordingly
        resetRules(entities);
        // Kickstart function for checking the rules
        checkRules(entities, gameBoard, GRID_SIZE);
    }

    let api = {
        update: update
    };

    return api;
}

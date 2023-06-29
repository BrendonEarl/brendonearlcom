let GameModel = (function (systems, renderer, assets, graphics, components) {
  'use strict';

  let movement_happened = false;

  let you_entities = [];
  let win_entities = [];

  let game_over = false;

  let that = {};
  let GRID_SIZE = 20;
  let entities = {};  // key is 'id', value is an Entity
  let entityStack = []; // Items are entity dictionaries {}
  let gameBoard = null;

  // Create a particle system and a rule system
  let particleSystemBlue = systems.ParticleSystem(GRID_SIZE);
  let ruleSystem = systems.ruleSystem(components);


  // --------------------------------------------------------------
  //
  // Function for initializing the 3D Array of the game board
  //
  // --------------------------------------------------------------
  function initializeBoard() {
    let array = new Array(GRID_SIZE);

    // Create the 3D Array
    for (let i = 0; i < GRID_SIZE; i++) {
      array[i] = new Array(GRID_SIZE);

      for (let j = 0; j < GRID_SIZE; j++) {
        array[i][j] = [];

      }
    }
    for (let entity in entities) {
      let currentEntity = entities[entity];
      let currentX = currentEntity.components.position.x;
      let currentY = currentEntity.components.position.y;
      array[currentY][currentX].push(entity);
    }
    gameBoard = array;
  }

  // --------------------------------------------------------------
  //
  // Function for initializing the level based on the file reading
  //
  // --------------------------------------------------------------
  that.initializeLevels = function () {
    // Push all entities into the 3D array

    // Array 1
    let levels = JSON.parse(localStorage.getItem('levels'));
    let level_to_load = parseInt(localStorage.getItem('level_to_load'));

    for (let i = 0; i < levels[level_to_load].arr1.length; i++) {
      for (let j = 0; j < levels[level_to_load].arr1[i].length; j++) {
        BigFunctions.initialize_entities(levels[level_to_load].arr1, i, j, entities, GRID_SIZE);
      }
    }

    // Array 2
    for (let i = 0; i < levels[level_to_load].arr2.length; i++) {
      for (let j = 0; j < levels[level_to_load].arr2[i].length; j++) {
        BigFunctions.initialize_entities(levels[level_to_load].arr2, i, j, entities, GRID_SIZE);
      }
    }
  }

  // --------------------------------------------------------------
  //
  // Function for saving the entities every time a movement happens
  // To assist with undo
  //
  // --------------------------------------------------------------
  that.saveEntities = function () {
    // Push a deep copy of the current entity dictionary onto the stack
    let entities_copy = {};
    for (let entity in entities) {
      let currentEntity = entities[entity];
      let entityCopy = Entity.createEntity();
      for (let component in currentEntity.components) {
        entityCopy.addComponent(_.cloneDeep(currentEntity.components[component]));
      }
      entities_copy[entityCopy.id] = entityCopy;
    }


    entityStack.push(entities_copy);
  }

  // --------------------------------------------------------------
  //
  // Function for checking if the is_win or is_you property
  // of an entity was set to true
  //
  // --------------------------------------------------------------
  function checkProperties() {
    let you_entities_copy = [];
    let win_entities_copy = [];
    for (let entity in entities) {
      let currentEntity = entities[entity];
      // Check if an entity is an object
      if (currentEntity.components.object) {
        // Check if an entity is a YOU entity now
        if (currentEntity.components.properties.is_controllable) {
          // If they weren't YOU last time, generate a particle effect around them
          let word = currentEntity.components.object.word;
          if (!you_entities.includes(word)) {
            particleSystemBlue.create_changeProperty_effect(currentEntity, 'blue');
            // add entity to the tracker for YOU entities for next check
            if (!you_entities_copy.includes(word)) {
              you_entities_copy.push(word);
            }
          } else {
            // add entity to the tracker for YOU entities for next check
            if (!you_entities_copy.includes(word)) {
              you_entities_copy.push(word);
            }
          }
        }
        // Check if an entity is a WIN entity now
        if (currentEntity.components.properties.is_win) {
          // If they weren't WIN last time, generate a particle effect around them
          let word = currentEntity.components.object.word;
          if (!win_entities.includes(word)) {
            particleSystemBlue.create_changeProperty_effect(currentEntity, 'yellow');
            // add entity to the tracker for WIN entities for next check
            if (!win_entities_copy.includes(word)) {
              win_entities_copy.push(word);
              MyGame.assets['audio_is_win'].play()
              MyGame.assets['audio_is_win'].currentTime = 0;
            }
          } else {
            // add entity to the tracker for WIN entities for next check
            if (!win_entities_copy.includes(word)) {
              win_entities_copy.push(word);
            }
          }
        }
      }
    }
    // Set original arrays to new arrays
    you_entities = Array.from(you_entities_copy);
    win_entities = Array.from(win_entities_copy);
    // Reset copied arrays
    you_entities_copy.length = 0;
    win_entities_copy.length = 0;
  }

  // --------------------------------------------------------------
  //
  // Interface that allows systems to report events back to the overall
  // game model for processing.
  //
  // --------------------------------------------------------------
  function reportEvent(info) {
    switch (info.type) {
      case 'movement':
        movement_happened = true;

        // Once a movement happens, check for collision events here!
        MyGame.components.Collision(gameBoard, entities, reportEvent, particleSystemBlue);


        // Once a movement happens, update the rules here!
        ruleSystem.update(entities, gameBoard, GRID_SIZE);

        // Check again for collisions after the rule update
        MyGame.components.Collision(gameBoard, entities, reportEvent, particleSystemBlue);

        // Once a movement happens and entities are all updated from rules,
        // save the entities in the stack for the undo system
        that.saveEntities();
        initializeBoard();

        // Play sound
        MyGame.assets['audio_move'].play();
        MyGame.assets['audio_move'].currentTime = 0;
        // Check for property updates
        checkProperties();
        break;
      case 'undo':
        // When undo happens, pop from the stack and set entities to the next thing on the stack
        if (entityStack.length > 1) {
          if (movement_happened) {
            entityStack.pop(); // Remove the current set of entities just pushed onto the stack from the movement
           
            systems.movement.reportEventMovement({ type: 'undo_happened' });
            
          }
          entities = entityStack.pop();
          initializeBoard(); // Reinitialize the position of all entities
          movement_happened = false;
        } else {
          if (entityStack.length == 0) {
            that.saveEntities();
            return;
          }
          entities = entityStack.pop();
          that.saveEntities();
          initializeBoard(); // Reinitialize the position of all entities
          movement_happened = false;
        }
        ruleSystem.update(entities, gameBoard, GRID_SIZE);
        checkProperties();
        break;
      case 'reset':
        // When reset happens, remove all but the first element in the stack
        // which will be the very first set of entities. Set it to the current entitites
        if (entityStack.length > 1) {
          entities = entityStack[0];
          entityStack.length = 0;
          initializeBoard(); // Reinitialize the position of all entities
          ruleSystem.update(entities, gameBoard, GRID_SIZE);
          that.saveEntities();
          checkProperties();
        }
        break;

      case 'win':
        // Remove player ability to move
        systems.movement.reportEventMovement({ type: 'end_game' });
        game_over = true;
        MyGame.assets['audio_win_level'].play();
        MyGame.assets['audio_win_level'].currentTime = 0;
        particleSystemBlue.createWinEffect();
        for (let entity in entities) {
          let currentEntity = entities[entity];
          if (currentEntity.components.object) {
            if (currentEntity.components.properties.is_win == true) {
              particleSystemBlue.create_changeProperty_effect(currentEntity, 'blue');
            }
          }
        }
      case 'death':
        // console.log(info.location);
        break;
      case 'sink':
        // console.log(info.location);
        break;
      case 'drown':
        // console.log(info.location);
        break;
      case 'push_again':
        that.saveEntities();
        break;
    }
  }

  // --------------------------------------------------------------
  //
  // Function for initializing the game
  //
  // --------------------------------------------------------------
  that.initialize = function () {
    GRID_SIZE = parseInt(localStorage.getItem('level_size').split(" ")[0]);
    that.reset();
    // that.initializeEntities();
    that.initializeLevels();
    // Save the first set of entities on the stack
    that.saveEntities();
    initializeBoard();
    ruleSystem.update(entities, gameBoard, GRID_SIZE);
    checkProperties();
  }

  // --------------------------------------------------------------
  //
  // Function for resetting the game
  //
  // --------------------------------------------------------------
  that.reset = function () {
    game_over = false;
    particleSystemBlue.clear_particles();
    entities = {};  // key is 'id', value is an Entity
    entityStack = []; // Items are entity dictionaries {}
    gameBoard = null;
    you_entities = [];
    win_entities = [];
    systems.movement.reportEventMovement({ type: 'begin_game' });
  }

  // --------------------------------------------------------------
  //
  // Function for updating the game model
  //
  // --------------------------------------------------------------
  that.update = function (elapsedTime) {

    // Update the movement system
    systems.movement.update(elapsedTime, entities, gameBoard, GRID_SIZE, reportEvent, initializeBoard);

    // Update the render system
    systems.render.update(elapsedTime, entities, particleSystemBlue);

    // Create fireworks if the game is over
    if (game_over) {
      particleSystemBlue.game_over_update(elapsedTime);
    }

    // Update the particle system
    particleSystemBlue.update(elapsedTime);
  }

  return that;

}(MyGame.systems, MyGame.render, MyGame.assets, MyGame.graphics, MyGame.components));
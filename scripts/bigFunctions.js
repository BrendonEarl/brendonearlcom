// ------------------------------------------------------------------
//
// This is an object that will hold various bigger functions for use
// in the program
//
// ------------------------------------------------------------------
let BigFunctions = (function (components, graphics, assets) {
    'use strict';

    // ------------------------------------------------------------------
    //
    // This is a function to create entities based on their words
    //
    // ------------------------------------------------------------------
    function create_entity_by_word(word, positionX, positionY, entities, GRID_SIZE) {
        let graphics = MyGame.graphics;
        let components = MyGame.components;
        let assets = MyGame.assets;

        let entityCreationByWord = {
            'wall': (position) => {
                let wall = Entity.createEntity();
                wall.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                wall.addComponent(components.Appearance({
                    image_src: assets['wall'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wall'].width / 3, height: assets['wall'].height },
                    rotation: 0,
                    center: { x: wall.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: wall.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 1
                }));
                wall.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                wall.addComponent(components.Object({
                    word: 'wall'
                }));
                entities[wall.id] = wall;
                // console.log(wall);
            },
            'rock': (position) => {
                let rock = Entity.createEntity();
                rock.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                rock.addComponent(components.Appearance({
                    image_src: assets['rock'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['rock'].width / 3, height: assets['rock'].height },
                    rotation: 0,
                    center: { x: rock.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: rock.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 1
                }));
                rock.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                rock.addComponent(components.Object({
                    word: 'rock'
                }));
                entities[rock.id] = rock;
                // console.log(rock);
            },
            'flag': (position) => {
                let flag = Entity.createEntity();
                flag.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                flag.addComponent(components.Appearance({
                    image_src: assets['flag'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['flag'].width / 3, height: assets['flag'].height },
                    rotation: 0,
                    center: { x: flag.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: flag.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 1
                }));
                flag.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                flag.addComponent(components.Object({
                    word: 'flag'
                }));
                entities[flag.id] = flag;
                // console.log(flag);
            },
            'bigBlue': (position) => {
                let bigBlue = Entity.createEntity();
                bigBlue.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                bigBlue.addComponent(components.Appearance({
                    image_src: assets['bigBlue'],
                    size: { width: graphics.width * (24 / 31) / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['bigBlue'].width / 4, height: assets['bigBlue'].height },
                    rotation: 0,
                    center: { x: bigBlue.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: bigBlue.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 4,
                    frame_time: 500,
                    render_priority: 1
                }));
                bigBlue.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                bigBlue.addComponent(components.Object({
                    word: 'bigBlue'
                }));
                entities[bigBlue.id] = bigBlue;
                // console.log(bigBlue);
            },
            'floor': (position) => {
                let floor = Entity.createEntity();
                floor.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                floor.addComponent(components.Appearance({
                    image_src: assets['floor'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['floor'].width / 3, height: assets['floor'].height },
                    rotation: 0,
                    center: { x: floor.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: floor.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 0
                }));
                floor.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                floor.addComponent(components.Object({
                    word: 'floor'
                }));
                entities[floor.id] = floor;
                // console.log(floor);
            },
            'grass': (position) => {
                let grass = Entity.createEntity();
                grass.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                grass.addComponent(components.Appearance({
                    image_src: assets['grass'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['grass'].width / 3, height: assets['grass'].height },
                    rotation: 0,
                    center: { x: grass.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: grass.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 0
                }));
                grass.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                grass.addComponent(components.Object({
                    word: 'grass'
                }));
                entities[grass.id] = grass;
                // console.log(grass);
            },
            'water': (position) => {
                let water = Entity.createEntity();
                water.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                water.addComponent(components.Appearance({
                    image_src: assets['water'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['water'].width / 3, height: assets['water'].height },
                    rotation: 0,
                    center: { x: water.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: water.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 2
                }));
                water.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                water.addComponent(components.Object({
                    word: 'water'
                }));
                entities[water.id] = water;
                // console.log(water);
            },
            'lava': (position) => {
                let lava = Entity.createEntity();
                lava.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                lava.addComponent(components.Appearance({
                    image_src: assets['lava'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['lava'].width / 3, height: assets['lava'].height },
                    rotation: 0,
                    center: { x: lava.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: lava.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 2
                }));
                lava.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                lava.addComponent(components.Object({
                    word: 'lava'
                }));
                entities[lava.id] = lava;
                // console.log(lava);
            },
            'hedge': (position) => {
                let hedge = Entity.createEntity();
                hedge.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                hedge.addComponent(components.Appearance({
                    image_src: assets['hedge'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['hedge'].width / 3, height: assets['hedge'].height },
                    rotation: 0,
                    center: { x: hedge.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: hedge.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 1
                }));
                hedge.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: true,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                hedge.addComponent(components.Object({
                    word: 'hedge'
                }));
                entities[hedge.id] = hedge;
                // console.log(hedge);
            }
        };

        // The call to create the entities
        entityCreationByWord[`${word}`]({ x: positionX, y: positionY });
    }



    // ------------------------------------------------------------------
    //
    // This is a function to create entities based on their letters
    //
    // ------------------------------------------------------------------
    function initialize_entities(array, i, j, entities, GRID_SIZE) {
        let graphics = MyGame.graphics;
        let components = MyGame.components;
        let assets = MyGame.assets;

        let entityCreation = {
            w: (position) => {
                let wall = Entity.createEntity();
                wall.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                wall.addComponent(components.Appearance({
                    image_src: assets['wall'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wall'].width / 3, height: assets['wall'].height },
                    rotation: 0,
                    center: { x: wall.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: wall.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 1
                }));
                wall.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                wall.addComponent(components.Object({
                    word: 'wall'
                }));
                entities[wall.id] = wall;
                // console.log(wall);
            },
            r: (position) => {
                let rock = Entity.createEntity();
                rock.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                rock.addComponent(components.Appearance({
                    image_src: assets['rock'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['rock'].width / 3, height: assets['rock'].height },
                    rotation: 0,
                    center: { x: rock.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: rock.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 1
                }));
                rock.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                rock.addComponent(components.Object({
                    word: 'rock'
                }));
                entities[rock.id] = rock;
                // console.log(rock);
            },
            f: (position) => {
                let flag = Entity.createEntity();
                flag.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                flag.addComponent(components.Appearance({
                    image_src: assets['flag'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['flag'].width / 3, height: assets['flag'].height },
                    rotation: 0,
                    center: { x: flag.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: flag.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 1
                }));
                flag.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                flag.addComponent(components.Object({
                    word: 'flag'
                }));
                entities[flag.id] = flag;
                // console.log(flag);
            },
            b: (position) => {
                let bigBlue = Entity.createEntity();
                bigBlue.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                bigBlue.addComponent(components.Appearance({
                    image_src: assets['bigBlue'],
                    size: { width: graphics.width * (24 / 31) / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['bigBlue'].width / 4, height: assets['bigBlue'].height },
                    rotation: 0,
                    center: { x: bigBlue.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: bigBlue.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 4,
                    frame_time: 500,
                    render_priority: 1
                }));
                bigBlue.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                bigBlue.addComponent(components.Object({
                    word: 'bigBlue'
                }));
                entities[bigBlue.id] = bigBlue;
                // console.log(bigBlue);
            },
            l: (position) => {
                let floor = Entity.createEntity();
                floor.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                floor.addComponent(components.Appearance({
                    image_src: assets['floor'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['floor'].width / 3, height: assets['floor'].height },
                    rotation: 0,
                    center: { x: floor.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: floor.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 0
                }));
                floor.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                floor.addComponent(components.Object({
                    word: 'floor'
                }));
                entities[floor.id] = floor;
                // console.log(floor);
            },
            g: (position) => {
                let grass = Entity.createEntity();
                grass.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                grass.addComponent(components.Appearance({
                    image_src: assets['grass'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['grass'].width / 3, height: assets['grass'].height },
                    rotation: 0,
                    center: { x: grass.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: grass.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 0
                }));
                grass.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                grass.addComponent(components.Object({
                    word: 'grass'
                }));
                entities[grass.id] = grass;
                // console.log(grass);
            },
            a: (position) => {
                let water = Entity.createEntity();
                water.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                water.addComponent(components.Appearance({
                    image_src: assets['water'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['water'].width / 3, height: assets['water'].height },
                    rotation: 0,
                    center: { x: water.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: water.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 2
                }));
                water.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                water.addComponent(components.Object({
                    word: 'water'
                }));
                entities[water.id] = water;
                // console.log(water);
            },
            v: (position) => {
                let lava = Entity.createEntity();
                lava.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                lava.addComponent(components.Appearance({
                    image_src: assets['lava'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['lava'].width / 3, height: assets['lava'].height },
                    rotation: 0,
                    center: { x: lava.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: lava.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 2
                }));
                lava.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                lava.addComponent(components.Object({
                    word: 'lava'
                }));
                entities[lava.id] = lava;
                // console.log(lava);
            },
            h: (position) => {
                let hedge = Entity.createEntity();
                hedge.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                hedge.addComponent(components.Appearance({
                    image_src: assets['hedge'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['hedge'].width / 3, height: assets['hedge'].height },
                    rotation: 0,
                    center: { x: hedge.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: hedge.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 1
                }));
                hedge.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: true,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                hedge.addComponent(components.Object({
                    word: 'hedge'
                }));
                entities[hedge.id] = hedge;
                // console.log(hedge);
            },
            W: (position) => {
                let Wall = Entity.createEntity();
                Wall.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                Wall.addComponent(components.Appearance({
                    image_src: assets['wordWall'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordWall'].width / 3, height: assets['wordWall'].height },
                    rotation: 0,
                    center: { x: Wall.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: Wall.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                Wall.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: false,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                Wall.addComponent(components.Text({
                    word: 'wall',
                    type: 'noun'
                }));
                entities[Wall.id] = Wall;
                // console.log(hedge);
            },
            R: (position) => {
                let Rock = Entity.createEntity();
                Rock.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                Rock.addComponent(components.Appearance({
                    image_src: assets['wordRock'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordRock'].width / 3, height: assets['wordRock'].height },
                    rotation: 0,
                    center: { x: Rock.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: Rock.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                Rock.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                Rock.addComponent(components.Text({
                    word: 'rock',
                    type: 'noun'
                }));
                entities[Rock.id] = Rock;
                // console.log(hedge);
            },
            F: (position) => {
                let Flag = Entity.createEntity();
                Flag.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                Flag.addComponent(components.Appearance({
                    image_src: assets['wordFlag'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordFlag'].width / 3, height: assets['wordFlag'].height },
                    rotation: 0,
                    center: { x: Flag.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: Flag.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                Flag.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                Flag.addComponent(components.Text({
                    word: 'flag',
                    type: 'noun'
                }));
                entities[Flag.id] = Flag;
                // console.log(hedge);
            },
            B: (position) => {
                let BigBlue = Entity.createEntity();
                BigBlue.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                BigBlue.addComponent(components.Appearance({
                    image_src: assets['wordBaba'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordBaba'].width / 3, height: assets['wordBaba'].height },
                    rotation: 0,
                    center: { x: BigBlue.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: BigBlue.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                BigBlue.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                BigBlue.addComponent(components.Text({
                    word: 'bigBlue',
                    type: 'noun'
                }));
                entities[BigBlue.id] = BigBlue;
                // console.log(hedge);
            },
            I: (position) => {
                let Is = Entity.createEntity();
                Is.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                Is.addComponent(components.Appearance({
                    image_src: assets['wordIs'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordIs'].width / 3, height: assets['wordIs'].height },
                    rotation: 0,
                    center: { x: Is.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: Is.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                Is.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                Is.addComponent(components.Text({
                    word: 'is',
                    type: 'connector'
                }));
                entities[Is.id] = Is;
                // console.log(hedge);
            },
            S: (position) => {
                let Stop = Entity.createEntity();
                Stop.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                Stop.addComponent(components.Appearance({
                    image_src: assets['wordStop'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordStop'].width / 3, height: assets['wordStop'].height },
                    rotation: 0,
                    center: { x: Stop.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: Stop.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                Stop.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                Stop.addComponent(components.Text({
                    word: 'stop',
                    type: 'property'
                }));
                entities[Stop.id] = Stop;
                // console.log(hedge);
            },
            P: (position) => {
                let Push = Entity.createEntity();
                Push.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                Push.addComponent(components.Appearance({
                    image_src: assets['wordPush'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordPush'].width / 3, height: assets['wordPush'].height },
                    rotation: 0,
                    center: { x: Push.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: Push.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                Push.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                Push.addComponent(components.Text({
                    word: 'push',
                    type: 'property'
                }));
                entities[Push.id] = Push;
                // console.log(hedge);
            },
            V: (position) => {
                let Lava = Entity.createEntity();
                Lava.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                Lava.addComponent(components.Appearance({
                    image_src: assets['wordLava'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordLava'].width / 3, height: assets['wordLava'].height },
                    rotation: 0,
                    center: { x: Lava.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: Lava.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                Lava.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                Lava.addComponent(components.Text({
                    word: 'lava',
                    type: 'noun'
                }));
                entities[Lava.id] = Lava;
                // console.log(hedge);
            },
            A: (position) => {
                let Water = Entity.createEntity();
                Water.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                Water.addComponent(components.Appearance({
                    image_src: assets['wordWater'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordWater'].width / 3, height: assets['wordWater'].height },
                    rotation: 0,
                    center: { x: Water.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: Water.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                Water.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                Water.addComponent(components.Text({
                    word: 'water',
                    type: 'noun'
                }));
                entities[Water.id] = Water;
                // console.log(hedge);
            },
            Y: (position) => {
                let You = Entity.createEntity();
                You.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                You.addComponent(components.Appearance({
                    image_src: assets['wordYou'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordYou'].width / 3, height: assets['wordYou'].height },
                    rotation: 0,
                    center: { x: You.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: You.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                You.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                You.addComponent(components.Text({
                    word: 'you',
                    type: 'property'
                }));
                entities[You.id] = You;
                // console.log(hedge);
            },
            X: (position) => {
                let Win = Entity.createEntity();
                Win.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                Win.addComponent(components.Appearance({
                    image_src: assets['wordWin'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordWin'].width / 3, height: assets['wordWin'].height },
                    rotation: 0,
                    center: { x: Win.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: Win.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                Win.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                Win.addComponent(components.Text({
                    word: 'win',
                    type: 'property'
                }));
                entities[Win.id] = Win;
                // console.log(hedge);
            },
            N: (position) => {
                let Sink = Entity.createEntity();
                Sink.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                Sink.addComponent(components.Appearance({
                    image_src: assets['wordSink'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordSink'].width / 3, height: assets['wordSink'].height },
                    rotation: 0,
                    center: { x: Sink.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: Sink.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                Sink.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                Sink.addComponent(components.Text({
                    word: 'sink',
                    type: 'property'
                }));
                entities[Sink.id] = Sink;
                // console.log(hedge);
            },
            K: (position) => {
                let Kill = Entity.createEntity();
                Kill.addComponent(components.Position({
                    x: position.x,
                    y: position.y
                }));
                Kill.addComponent(components.Appearance({
                    image_src: assets['wordKill'],
                    size: { width: graphics.width / GRID_SIZE, height: graphics.height / GRID_SIZE },
                    pixel_size: { width: assets['wordKill'].width / 3, height: assets['wordKill'].height },
                    rotation: 0,
                    center: { x: Kill.components.position.x * (graphics.width / GRID_SIZE) + (graphics.width / GRID_SIZE / 2), y: Kill.components.position.y * (graphics.height / GRID_SIZE) + (graphics.height / GRID_SIZE / 2) },
                    num_frames: 3,
                    frame_time: 500,
                    render_priority: 3
                }));
                Kill.addComponent(components.Properties({
                    is_controllable: false,
                    is_pushable: true,
                    is_stop: false,
                    is_win: false,
                    is_destroy: false,
                    is_burnable: false,
                    is_sinkable: false
                }));
                Kill.addComponent(components.Text({
                    word: 'kill',
                    type: 'property'
                }));
                entities[Kill.id] = Kill;
                // console.log(hedge);
            }
            // "FBISPV AYXNK"
        };


        // console.log(levels['level_1'].arr1[i][j]);
        if (array[i][j] == 'w') {
            entityCreation.w({ x: j, y: i });
            // console.log(entityCreation)
        } else if (array[i][j] == 'r') {
            entityCreation.r({ x: j, y: i });
        } else if (array[i][j] == 'f') {
            entityCreation.f({ x: j, y: i });
        } else if (array[i][j] == 'b') {
            entityCreation.b({ x: j, y: i });
        } else if (array[i][j] == 'l') {
            entityCreation.l({ x: j, y: i });
        } else if (array[i][j] == 'g') {
            entityCreation.g({ x: j, y: i });
        } else if (array[i][j] == 'a') {
            entityCreation.a({ x: j, y: i });
        } else if (array[i][j] == 'v') {
            entityCreation.v({ x: j, y: i });
        } else if (array[i][j] == 'h') {
            entityCreation.h({ x: j, y: i });
        } else if (array[i][j] == 'W') {
            entityCreation.W({ x: j, y: i });
        } else if (array[i][j] == 'R') {
            entityCreation.R({ x: j, y: i });
        } else if (array[i][j] == 'F') {
            entityCreation.F({ x: j, y: i });
        } else if (array[i][j] == 'B') {
            entityCreation.B({ x: j, y: i });
        } else if (array[i][j] == 'I') {
            entityCreation.I({ x: j, y: i });
        } else if (array[i][j] == 'S') {
            entityCreation.S({ x: j, y: i });
        } else if (array[i][j] == 'P') {
            entityCreation.P({ x: j, y: i });
        } else if (array[i][j] == 'V') {
            entityCreation.V({ x: j, y: i });
        } else if (array[i][j] == 'A') {
            entityCreation.A({ x: j, y: i });
        } else if (array[i][j] == 'Y') {
            entityCreation.Y({ x: j, y: i });
        } else if (array[i][j] == 'X') {
            entityCreation.X({ x: j, y: i });
        } else if (array[i][j] == 'N') {
            entityCreation.N({ x: j, y: i });
        } else if (array[i][j] == 'K') {
            entityCreation.K({ x: j, y: i });
        }
    }

    return {
        create_entity_by_word: create_entity_by_word,
        initialize_entities: initialize_entities
    };

}(MyGame.components, MyGame.graphics, MyGame.assets));

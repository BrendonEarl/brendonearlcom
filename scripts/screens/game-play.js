// --------------------------------------------------
// Code from Dr. Dean Mathias
// --------------------------------------------------
MyGame.screens['game-play'] = (function(manager, graphics, input, render) {
    'use strict';

    let cancelNextRequest = false;
    let lastTimeStamp;
    let model = null;

    //------------------------------------------------------------------
    //
    // One time initialization...nothing to do here.
    //
    //------------------------------------------------------------------
    function initialize() {
        console.log('game initializing...');
    }

    //------------------------------------------------------------------
    //
    // This is the Game Loop update function!
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        model.update(elapsedTime);
    }

    //------------------------------------------------------------------
    //
    // This is the Game Loop function!
    //
    //------------------------------------------------------------------
    function gameLoop(time) {
        
        update(time - lastTimeStamp);
        lastTimeStamp = time;
        
        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function run() {
        MyGame.assets['audio_music'].volume = 0.22;
        MyGame.assets['audio_music'].play();
        MyGame.assets['audio_music'].loop = true;

        model = GameModel;
        model.initialize();
        //
        // Start the animation loop
        cancelNextRequest = false;
        lastTimeStamp = performance.now();
        requestAnimationFrame(gameLoop);

        // Add capability to go back with the escape key
        window.addEventListener('keydown', function (key) {
            if (key.key == 'Escape') {
                manager.showScreen('main-menu');
                MyGame.assets['audio_music'].volume = 0.05;
            }
        });
    }

    return {
        initialize : initialize,
        run : run
    };
}(MyGame.manager, MyGame.graphics, MyGame.input, MyGame.render));
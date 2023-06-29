MyGame = {
    screens: {},
    components: {},
    systems: {},
    render: {},
    constants: {},
    assets: {}
};

//------------------------------------------------------------------
//
// Purpose of this code is to bootstrap (maybe I should use that as the name)
// the rest of the application.  Only this file is specified in the index.html
// file, then the code in this file gets all the other code and assets
// loaded.
//
//------------------------------------------------------------------
MyGame.loader = (function() {
    'use strict';
    let scriptOrder = [{
            scripts: ['lodash'],
            message: '',
            onComplete: null
        }, {
            scripts: ['entity'],
            message: '',
            onComplete: null
        }, {
            scripts: ['random'],
            message: '',
            onComplete: null
        }, {
            scripts: ['bigFunctions'],
            message: '',
            onComplete: null
        }, {
            scripts: ['components/appearance'],
            message: '',
            onComplete: null
        }, {
            scripts: ['components/canMove'],
            message: '',
            onComplete: null
        }, {
            scripts: ['components/collision'],
            message: '',
            onComplete: null
        }, {
            scripts: ['components/controllable'],
            message: '',
            onComplete: null
        }, {
            scripts: ['components/object'],
            message: '',
            onComplete: null
        }, {
            scripts: ['components/position'],
            message: '',
            onComplete: null
        }, {
            scripts: ['components/properties'],
            message: '',
            onComplete: null
        }, {
            scripts: ['components/text'],
            message: '',
            onComplete: null
        }, {
            scripts: ['render/background'],
            message: '',
            onComplete: null
        }, {
            scripts: ['render/entity'],
            message: '',
            onComplete: null
        }, {
            scripts: ['render/graphics'],
            message: '',
            onComplete: null
        }, {
            scripts: ['render/particleRender'],
            message: '',
            onComplete: null
        }, {
            scripts: ['systems/movement'],
            message: '',
            onComplete: null
        }, {
            scripts: ['systems/particleSystem'],
            message: '',
            onComplete: null
        }, {
            scripts: ['systems/render'],
            message: '',
            onComplete: null
        }, {
            scripts: ['systems/ruleSystem'],
            message: '',
            onComplete: null
        }, {
            scripts: ['game-model'],
            message: '',
            onComplete: null
        }, {
            scripts: ['screens/manager'],
            message: '',
            onComplete: null
        }, {
            scripts: ['screens/controls'],
            message: '',
            onComplete: null
        }, {
            scripts: ['screens/credits'],
            message: '',
            onComplete: null
        }, {
            scripts: ['screens/game-play'],
            message: '',
            onComplete: null
        }, {
            scripts: ['screens/main-menu'],
            message: '',
            onComplete: null
        }];

    let assetOrder = [
        {
            key: 'wordWall',
            source: 'assets/sprites/wordWall.png'
        },
        {
            key: 'wordRock',
            source: 'assets/sprites/wordRock.png'
        },
        {
            key: 'wordFlag',
            source: 'assets/sprites/wordFlag.png'
        },
        {
            key: 'wordBaba',
            source: 'assets/sprites/wordBaba.png'
        },
        {
            key: 'wordIs',
            source: 'assets/sprites/wordIs.png'
        },
        {
            key: 'wordStop',
            source: 'assets/sprites/wordStop.png'
        },
        {
            key: 'wordPush',
            source: 'assets/sprites/wordPush.png'
        },
        {
            key: 'wordLava',
            source: 'assets/sprites/wordLava.png'
        },
        {
            key: 'wordWater',
            source: 'assets/sprites/wordWater.png'
        },
        {
            key: 'wordYou',
            source: 'assets/sprites/wordYou.png'
        },
        {
            key: 'wordWin',
            source: 'assets/sprites/wordWin.png'
        },
        {
            key: 'wordSink',
            source: 'assets/sprites/wordSink.png'
        },
        {
            key: 'wordKill',
            source: 'assets/sprites/word-kill.png'
        },
        {
            key: 'wall',
            source: 'assets/sprites/wall.png'
        }, {
            key: 'rock',
            source: 'assets/sprites/rock.png'
        }, {
            key: 'flag',
            source: 'assets/sprites/flag.png'
        }, {
            key: 'bigBlue',
            source: 'assets/sprites/bigBlueAnimated.png'
        }, {
            key: 'floor',
            source: 'assets/sprites/floor.png'
        }, {
            key: 'grass',
            source: 'assets/sprites/grass.png'
        }, {
            key: 'water',
            source: 'assets/sprites/water.png'
        }, {
            key: 'lava',
            source: 'assets/sprites/lava.png'
        }, {
            key: 'hedge',
            source: 'assets/sprites/hedge.png'
        }, {
            key: 'yellow_star',
            source: 'assets/sprites/yellow_star.png'
        }, {
            key: 'blue_star',
            source: 'assets/sprites/blue_star.png'
        }, {
            key: 'red_star',
            source: 'assets/sprites/red_star.png'
        },  {
            key: 'levelData',
            source: 'assets/levels/levels-all.bbiy'
        }, {
            key: 'audio_death',
            source: 'assets/audio/death.mp3'
        }, {
            key: 'audio_is_win',
            source: 'assets/audio/is_win.mp3'
        }, {
            key: 'audio_move',
            source: 'assets/audio/move.mp3'
        }, {
            key: 'audio_music',
            source: 'assets/audio/Origami Repetika - Honeyknocker Meadows.mp3'
        }, {
            key: 'audio_win_level',
            source: 'assets/audio/win_level.mp3'
        }];

    //------------------------------------------------------------------
    //
    // Helper function used to load scripts in the order specified by the
    // 'scripts' parameter.  'scripts' expects an array of objects with
    // the following format...
    //    {
    //        scripts: [script1, script2, ...],
    //        message: 'Console message displayed after loading is complete',
    //        onComplete: function to call when loading is complete, may be null
    //    }
    //
    //------------------------------------------------------------------
    function loadScripts(scripts, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function() {
                // console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.shift();    // Alternatively: scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // Helper function used to load assets in the order specified by the
    // 'assets' parameter.  'assets' expects an array of objects with
    // the following format...
    //    {
    //        key: 'asset-1',
    //        source: 'asset/.../asset.png'
    //    }
    //
    // onSuccess is invoked per asset as: onSuccess(key, asset)
    // onError is invoked per asset as: onError(error)
    // onComplete is invoked once per 'assets' array as: onComplete()
    //
    //------------------------------------------------------------------
    function loadAssets(assets, onSuccess, onError, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function(asset) {
                    onSuccess(entry, asset);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function(error) {
                    onError(error);
                    assets.shift();    // Alternatively: assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    //------------------------------------------------------------------
    //
    // This function is used to asynchronously load image and audio assets.
    // On success the asset is provided through the onSuccess callback.
    // Reference: http://www.html5rocks.com/en/tutorials/file/xhr2/
    //
    //------------------------------------------------------------------
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = (fileExtension === 'bbiy') ? 'text' : 'blob';

            xhr.onload = function() {
                let asset = null;
                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3' || fileExtension === 'ogg') {
                        asset = new Audio();
                    } else if (fileExtension === 'bbiy') {
                        if (onSuccess) { onSuccess(xhr.responseText); }
                    }
                    else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    if (xhr.responseType === 'blob') {
                        if (fileExtension === 'mp3' || fileExtension === 'ogg') {
                            asset.oncanplaythrough = function() {
                                asset.oncanplaythrough = null;
                                window.URL.revokeObjectURL(asset.src);
                                if (onSuccess) { onSuccess(asset); }
                            };
                        }
                        asset.onload = function() {
                            window.URL.revokeObjectURL(asset.src);
                            if (onSuccess) { onSuccess(asset); }
                        };
                        asset.src = window.URL.createObjectURL(xhr.response);
                    }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
            xhr.send();
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }
    }

    //------------------------------------------------------------------
    //
    // Called when all the scripts are loaded, it kicks off the demo app.
    //
    //------------------------------------------------------------------
    function mainComplete() {
        console.log('It is all loaded up');
        MyGame.manager.initialize();
        // MyGame.main.initialize();
    }

    //
    // Start with loading the assets, then the scripts.
    console.log('Starting to dynamically load project assets');
    loadAssets(assetOrder,
        function(source, asset) {    // Store it on success
            // console.log('asset: ', asset);
            MyGame.assets[source.key] = asset;
        },
        function(error) {
            console.log(error);
        },
        function() {
            console.log('All game assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(scriptOrder, mainComplete);
        }
    );

}());

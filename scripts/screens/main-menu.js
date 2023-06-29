// --------------------------------------------------
// Code from Dr. Dean Mathias
// --------------------------------------------------
MyGame.screens['main-menu'] = (function (manager) {
    'use strict';

    let levels = {};

    function initialize() {
        //
        // Setup each of menu events for the screens
        // document.getElementById('id-new-game').addEventListener(
        //     'click',
        //     function () { manager.showScreen('game-play'); });

        document.getElementById('id-controls').addEventListener(
            'click',
            function () { manager.showScreen('controls'); });

        document.getElementById('id-credits').addEventListener(
            'click',
            function () { manager.showScreen('credits'); });

        // Set up levels
        loadLevels();
        // console.log(levels)

        // Reset list
        document.getElementById('levels-div').innerHTML = "";
        // Load level information into the menu
        for (let i=1; i <= Object.keys(levels).length; i++) {
            document.getElementById('levels-div').innerHTML += 
            `<div class='level-child'> <button id="level_${i}" class="menu_button_lvl">${levels[i].name}</button> </div>`;
            if (i % 3 == 0) {
                document.getElementById('levels-div').innerHTML += "<br>";
            }
        }
        // Add code here to get each button and set it's on-click to set which level to load in localStorage
        // And then when the game loads up (in the run() function), get the level from localStorage
        // and that will be the level to load
        for (let i=1; i <= Object.keys(levels).length; i++) {
            let currentElement = document.getElementById(`level_${i}`);
            currentElement.addEventListener(
                'click',
                function () {
                    localStorage.setItem('level_to_load',i);
                    manager.showScreen('game-play');
                }
            )
        }
    }

    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }

    function loadLevels() {
        let string = MyGame.assets['levelData'];
        let done = false;
        // levels = {};
        let iteration = 1;
        while (!done) {
            let [levelName, ...rest] = string.split("\n");
            if (levelName == '') {
                done = true;
                break;
            }
            // console.log(`level name: ${levelName}`);
            let remainder = rest.join("\n");
            let [levelSize, ...rest2] = remainder.split("\n");
            localStorage.setItem('level_size',levelSize);
            // console.log(`level size: ${levelSize}`);
            let remainder2 = rest2.join("\n");
            let levelWidth = levelSize.split("x")[0].replace(/\s/g, '');
            let levelHeight = levelSize.split("x")[1].replace(/\s/g, '');
            // console.log(`level width: ${levelWidth}, levelHeight: ${levelHeight}`);
            let levelSplitString = remainder2;
            let levelArray1 = [];
            let levelArray2 = [];
            for (let i = 0; i < levelHeight; i++) {
                let [thisRow, ...otherRows] = levelSplitString.split("\n");
                levelArray1.push(thisRow);
                levelSplitString = otherRows.join("\n");
            }
            for (let i = 0; i < levelHeight; i++) {
                let [thisRow, ...otherRows] = levelSplitString.split("\n");
                levelArray2.push(thisRow);
                levelSplitString = otherRows.join("\n");
            }
            // console.log(`levelArray1: ${levelArray1}`);
            // console.log(`levelArray2: ${levelArray2}`);
            if (levelSplitString == undefined) {
                done = true;
            }
            levels[iteration] = {
                name: levelName,
                width: levelWidth,
                height: levelHeight,
                arr1: levelArray1,
                arr2: levelArray2
            }
            iteration++;
            string = levelSplitString;
        }
        // console.log(levels);
        localStorage.setItem('levels', JSON.stringify(levels));
    }

    return {
        initialize: initialize,
        run: run
    };
}(MyGame.manager));

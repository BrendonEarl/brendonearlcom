MyGame.screens['controls'] = (function (manager) {
    'use strict';

    let upControl = document.getElementById('up-control');
    let downControl = document.getElementById('down-control');
    let leftControl = document.getElementById('left-control');
    let rightControl = document.getElementById('right-control');
    let resetControl = document.getElementById('reset-control');
    let undoControl = document.getElementById('undo-control');

    let isChangingControls = false;

    function initialize() {
        document.getElementById('id-controls-back').addEventListener(
            'click',
            function () { manager.showScreen('main-menu'); });

        window.addEventListener('load', getControls());
        set_defaults();
    }

    function run() {
        // Add capability to go back with the escape key
        window.addEventListener('keydown', function (key) {
            if (key.key == 'Escape' && !isChangingControls) {
                manager.showScreen('main-menu');
            }
        });


    }

    // --------------------------------------------------------------
    // Function to set control defaults in memory if needed
    // --------------------------------------------------------------
    function set_defaults() {
        if (localStorage.getItem('up-control') == null) {
            localStorage.setItem('up-control', 'w');
        }
        if (localStorage.getItem('down-control') == null) {
            localStorage.setItem('down-control', 's');
        }
        if (localStorage.getItem('left-control') == null) {
            localStorage.setItem('left-control', 'a');
        }
        if (localStorage.getItem('right-control') == null) {
            localStorage.setItem('right-control', 'd');
        }
        if (localStorage.getItem('reset-control') == null) {
            localStorage.setItem('reset-control', 'r');
        }
        if (localStorage.getItem('undo-control') == null) {
            localStorage.setItem('undo-control', 'z');
        }
    }

    // --------------------------------------------------------------
    // Function to get the controls from local storage
    // --------------------------------------------------------------
    function getControls() {
        // Get the values from localStorage to display for each div,
        // And if they don't exist, set defaults
        if (localStorage.getItem('up-control-display') != null) {
            upControl.innerHTML = localStorage.getItem('up-control-display');
        } else {
            upControl.innerHTML = "KeyW";
            localStorage.setItem('up-control-display', 'KeyW')
        }

        if (localStorage.getItem('down-control-display') != null) {
            downControl.innerHTML = localStorage.getItem('down-control-display');
        } else {
            downControl.innerHTML = "KeyS";
            localStorage.setItem('down-control-display', 'KeyS')
        }

        if (localStorage.getItem('left-control-display') != null) {
            leftControl.innerHTML = localStorage.getItem('left-control-display');
        } else {
            leftControl.innerHTML = "KeyA";
            localStorage.setItem('left-control-display', 'KeyA')
        }

        if (localStorage.getItem('right-control-display') != null) {
            rightControl.innerHTML = localStorage.getItem('right-control-display');
        } else {
            rightControl.innerHTML = "KeyD";
            localStorage.setItem('right-control-display', 'KeyD')
        }

        if (localStorage.getItem('reset-control-display') != null) {
            resetControl.innerHTML = localStorage.getItem('reset-control-display');
        } else {
            resetControl.innerHTML = "KeyR";
            localStorage.setItem('reset-control-display', 'KeyR')
        }

        if (localStorage.getItem('undo-control-display') != null) {
            undoControl.innerHTML = localStorage.getItem('undo-control-display');
        } else {
            undoControl.innerHTML = "KeyZ";
            localStorage.setItem('undo-control-display', 'KeyZ')
        }
    }

    // --------------------------------------------------------------
    // Function to register a key in localStorage
    // --------------------------------------------------------------
    function registerKey(control) {
        if (!isChangingControls) {
            switch (control) {
                case 'up':
                    upControl.innerHTML = "Please press a key...";
                    window.addEventListener('keydown', changeControlUp);
                    isChangingControls = true;
                    break;
                case 'down':
                    downControl.innerHTML = "Please press a key...";
                    window.addEventListener('keydown', changeControlDown);
                    isChangingControls = true;
                    break;
                case 'left':
                    leftControl.innerHTML = "Please press a key...";
                    window.addEventListener('keydown', changeControlLeft);
                    isChangingControls = true;
                    break;
                case 'right':
                    rightControl.innerHTML = "Please press a key...";
                    window.addEventListener('keydown', changeControlRight);
                    isChangingControls = true;
                    break;
                case 'reset':
                    resetControl.innerHTML = "Please press a key...";
                    window.addEventListener('keydown', changeControlReset);
                    isChangingControls = true;
                    break;
                case 'undo':
                    undoControl.innerHTML = "Please press a key...";
                    window.addEventListener('keydown', changeControlUndo);
                    isChangingControls = true;
                    break;
            }
        }
    }

    function changeControlUp(e) {
        e.preventDefault();
        upControl.innerHTML = e.code;
        localStorage.setItem('up-control', e.key);
        localStorage.setItem('up-control-display', e.code);
        window.removeEventListener('keydown', changeControlUp);
        isChangingControls = false;
    }

    function changeControlDown(e) {
        e.preventDefault();
        downControl.innerHTML = e.code;
        localStorage.setItem('down-control', e.key);
        localStorage.setItem('down-control-display', e.code);
        window.removeEventListener('keydown', changeControlDown);
        isChangingControls = false;
    }

    function changeControlLeft(e) {
        e.preventDefault();
        leftControl.innerHTML = e.code;
        localStorage.setItem('left-control', e.key);
        localStorage.setItem('left-control-display', e.code);
        window.removeEventListener('keydown', changeControlLeft);
        isChangingControls = false;
    }

    function changeControlRight(e) {
        e.preventDefault();
        rightControl.innerHTML = e.code;
        localStorage.setItem('right-control', e.key);
        localStorage.setItem('right-control-display', e.code);
        window.removeEventListener('keydown', changeControlRight);
        isChangingControls = false;
    }

    function changeControlReset(e) {
        e.preventDefault();
        resetControl.innerHTML = e.code;
        localStorage.setItem('reset-control', e.key);
        localStorage.setItem('reset-control-display', e.code);
        window.removeEventListener('keydown', changeControlReset);
        isChangingControls = false;
    }

    function changeControlUndo(e) {
        e.preventDefault();
        undoControl.innerHTML = e.code;
        localStorage.setItem('undo-control', e.key);
        localStorage.setItem('undo-control-display', e.code);
        window.removeEventListener('keydown', changeControlUndo);
        isChangingControls = false;
    }

    return {
        initialize: initialize,
        run: run,
        registerKey: registerKey
    };
}(MyGame.manager));
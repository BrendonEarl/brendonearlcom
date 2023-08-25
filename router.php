<?php

$uri = $_SERVER['REQUEST_URI'];
list($uri,$_) = [parse_url($uri)['path'], parse_url($uri)['query'] ?? ''];

$routes = [
    '/' => 'controllers/index.php',
    '/fit' => 'controllers/fit.php',
];

function routeToController($uri, $routes) {
    if (array_key_exists($uri, $routes)) {
        require $routes[$uri];
    }else{
        abort();
    }
}

function abort($code = 404) {
    http_response_code($code);
    require "views/$code.php";
    die();
}

routeToController($uri, $routes);
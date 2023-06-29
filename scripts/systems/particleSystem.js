MyGame.systems.ParticleSystem = function (GRID_SIZE) {
    'use strict';
    let nextName = 1;       // Unique identifier for the next particle
    let particles = {};

    let graphics = MyGame.graphics;
    let particleRenderer = MyGame.render.ParticleRender(particles, graphics);
    let assets = MyGame.assets;

    let game_over_time_elapsed = 0;
    let game_over_time_limit = 1000;
    // let GRID_SIZE = GRID_SIZE;

    // ---------------------------------------------------------
    //
    // Create the particles for when a win condition is met
    //
     // ---------------------------------------------------------
    function createWinEffect() {
        let particlesPerSide = 30;
        // Create 30 particles evenly spaced starting from the top of the screen
        for (let particle = 0; particle < particlesPerSide; particle ++) {
            // Assign a unique name to each particle
            // Their direction will be downward in a line
            particles[nextName++] = create({
                center: {
                    x: (graphics.width / particlesPerSide) * particle,
                    y: 0
                },
                size: {
                    mean: 30,
                    stdev: 5
                },
                direction: {
                    x: 0,
                    y: 1
                },
                speed: {
                    mean: 75,
                    stdev: 25
                },
                lifetime: {
                    mean: 3,
                    stdev: 1.5
                },
                image: assets['yellow_star']
            });
        }
        // Create 30 particles evenly spaced starting from the bottom of the screen
        for (let particle = 0; particle < particlesPerSide; particle ++) {
            // Assign a unique name to each particle
            // Their direction will be upward in a line
            particles[nextName++] = create({
                center: {
                    x: (graphics.width / particlesPerSide) * particle,
                    y: graphics.height
                },
                size: {
                    mean: 30,
                    stdev: 5
                },
                direction: {
                    x: 0,
                    y: -1
                },
                speed: {
                    mean: 75,
                    stdev: 25
                },
                lifetime: {
                    mean: 3,
                    stdev: 1.5
                },
                image: assets['yellow_star']
            });
        }
        // Create 30 particles evenly spaced starting from the left of the screen
        for (let particle = 0; particle < particlesPerSide; particle ++) {
            // Assign a unique name to each particle
            // Their direction will be rightward in a line
            particles[nextName++] = create({
                center: {
                    x: 0,
                    y: (graphics.height / particlesPerSide) * particle
                },
                size: {
                    mean: 30,
                    stdev: 5
                },
                direction: {
                    x: 1,
                    y: 0
                },
                speed: {
                    mean: 75,
                    stdev: 25
                },
                lifetime: {
                    mean: 3,
                    stdev: 1.5
                },
                image: assets['yellow_star']
            });
        }
        // Create 30 particles evenly spaced starting from the left of the screen
        for (let particle = 0; particle < particlesPerSide; particle ++) {
            // Assign a unique name to each particle
            // Their direction will be leftward in a line
            particles[nextName++] = create({
                center: {
                    x: graphics.width,
                    y: (graphics.height / particlesPerSide) * particle
                },
                size: {
                    mean: 30,
                    stdev: 5
                },
                direction: {
                    x: -1,
                    y: 0
                },
                speed: {
                    mean: 75,
                    stdev: 25
                },
                lifetime: {
                    mean: 3,
                    stdev: 1.5
                },
                image: assets['yellow_star']
            });
        }
    };

    // ---------------------------------------------------------
    //
    // Create the particles around an entity when it changes properties
    // such as when it changes to IS_WIN or IS_YOU
    //
    // ---------------------------------------------------------
    function create_changeProperty_effect(entity, color) {
        let particlesPerSide = 30;
        let sizeMean = 7;
        let sizeSTD = 2;
        let speedMean = 8;
        let speedSTD = 2;
        let lifetimeMean = 1;
        let lifetimeSTD = 0.2;
        let imageSRC = assets[`${color}_star`];
        // Create 30 particles evenly spaced starting from the left of the entity
        for (let particle = 0; particle < particlesPerSide; particle++) {
            
            // Assign a unique name to each particle
            // Their direction will be outward in a circle
            particles[nextName++] = create({
                center: {
                    // x: entity.components.appearance.center.x,
                    // y: entity.components.appearance.center.y,
                    x: entity.components.appearance.center.x - (entity.components.appearance.size.width / 2),
                    y: (entity.components.appearance.center.y - (entity.components.appearance.size.height / 2)) + ((entity.components.appearance.size.height / particlesPerSide) * particle)
                },
                size: {
                    mean: sizeMean,
                    stdev: sizeSTD
                },
                direction: Random.nextCircleVector(),
                speed: {
                    mean: speedMean,
                    stdev: speedSTD
                },
                lifetime: {
                    mean: lifetimeMean,
                    stdev: lifetimeSTD
                },
                image: imageSRC
            });
        }
        // Create 30 particles evenly spaced starting from the right of the entity
        for (let particle = 0; particle < particlesPerSide; particle++) {
            
            // Assign a unique name to each particle
            // Their direction will be outward in a circle
            particles[nextName++] = create({
                center: {
                    // x: entity.components.appearance.center.x,
                    // y: entity.components.appearance.center.y,
                    x: entity.components.appearance.center.x + (entity.components.appearance.size.width / 2),
                    y: (entity.components.appearance.center.y - (entity.components.appearance.size.height / 2)) + ((entity.components.appearance.size.height / particlesPerSide) * particle)
                },
                size: {
                    mean: sizeMean,
                    stdev: sizeSTD
                },
                direction: Random.nextCircleVector(),
                speed: {
                    mean: speedMean,
                    stdev: speedSTD
                },
                lifetime: {
                    mean: lifetimeMean,
                    stdev: lifetimeSTD
                },
                image: imageSRC
            });
        }
        // Create 30 particles evenly spaced starting from the top of the entity
        for (let particle = 0; particle < particlesPerSide; particle++) {
            
            // Assign a unique name to each particle
            // Their direction will be outward in a circle
            particles[nextName++] = create({
                center: {
                    // x: entity.components.appearance.center.x,
                    // y: entity.components.appearance.center.y,
                    x: (entity.components.appearance.center.x - (entity.components.appearance.size.width / 2)) + ((entity.components.appearance.size.width / particlesPerSide) * particle),
                    y: entity.components.appearance.center.y - (entity.components.appearance.size.height / 2)
                },
                size: {
                    mean: sizeMean,
                    stdev: sizeSTD
                },
                direction: Random.nextCircleVector(),
                speed: {
                    mean: speedMean,
                    stdev: speedSTD
                },
                lifetime: {
                    mean: lifetimeMean,
                    stdev: lifetimeSTD
                },
                image: imageSRC
            });
        }
        // Create 30 particles evenly spaced starting from the bottom of the entity
        for (let particle = 0; particle < particlesPerSide; particle++) {
            
            // Assign a unique name to each particle
            // Their direction will be outward in a circle
            particles[nextName++] = create({
                center: {
                    // x: entity.components.appearance.center.x,
                    // y: entity.components.appearance.center.y,
                    x: (entity.components.appearance.center.x - (entity.components.appearance.size.width / 2)) + ((entity.components.appearance.size.width / particlesPerSide) * particle),
                    y: entity.components.appearance.center.y + (entity.components.appearance.size.height / 2)
                },
                size: {
                    mean: sizeMean,
                    stdev: sizeSTD
                },
                direction: Random.nextCircleVector(),
                speed: {
                    mean: speedMean,
                    stdev: speedSTD
                },
                lifetime: {
                    mean: lifetimeMean,
                    stdev: lifetimeSTD
                },
                image: imageSRC
            });
        }
    }

    // ---------------------------------------------------------
    //
    // Create the particles around an entity when it changes properties
    // such as when it changes to IS_WIN or IS_YOU
    //
    // ---------------------------------------------------------
    function create_changeProperty_effect_2(entity, color) {
        let numParticles = 30;
        // Create 30 particles from the center (plus offset) of the entity and have them spawn outwards in a circle
        for (let particle = 0; particle < numParticles; particle++) {
            
            // Assign a unique name to each particle
            // Their direction will be outward in a circle
            particles[nextName++] = create({
                center: {
                    // x: entity.components.appearance.center.x,
                    // y: entity.components.appearance.center.y,
                    x: entity.components.appearance.center.x + entity.components.appearance.size.width * Math.cos(Math.PI * 2 * ((360/numParticles) * particle) / 360) * (5/8),
                    y: entity.components.appearance.center.y + entity.components.appearance.size.height * Math.sin(Math.PI * 2 * ((360/numParticles) * particle) / 360) * (5/8)
                },
                size: {
                    mean: 10,
                    stdev: 4
                },
                direction: {
                    x: entity.components.appearance.size.width * Math.cos(Math.PI * 2 * ((360/numParticles) * particle) / 360),
                    y: entity.components.appearance.size.height * Math.sin(Math.PI * 2 * ((360/numParticles) * particle) / 360)
                },
                speed: {
                    mean: 0.5,
                    stdev: 0.1
                },
                lifetime: {
                    mean: 2,
                    stdev: 0.75
                },
                image: assets[`${color}_star`]
            });
        }
    }

    // ---------------------------------------------------------
    //
    // Create the particles when an entity gets destroyed
    //
     // ---------------------------------------------------------
     function create_destroy_effect(entity) {
        let numParticles = 100;
        // Create 30 particles from the center of the entity and have them spawn outwards in a circle
        for (let particle = 0; particle < numParticles; particle++) {
            
            // Assign a unique name to each particle
            // Their direction will be outward in a circle
            particles[nextName++] = create({
                center: {
                    x: entity.components.appearance.center.x,
                    y: entity.components.appearance.center.y,
                },
                size: {
                    mean: 10,
                    stdev: 4
                },
                direction: Random.nextCircleVector(),
                speed: {
                    mean: 150,
                    stdev: 10
                },
                lifetime: {
                    mean: 0.4,
                    stdev: 0.3
                },
                image: assets['red_star']
            });
        }
    }

    function create_fireworks(entity) {
        let numParticles = Random.nextRange(15,50);
        let randomX = Random.nextRange(0,graphics.width);
        let randomY = Random.nextRange(0,graphics.height);
        let randomMean = Random.nextRange(10,15);
        // Create 30 particles from the center of the entity and have them spawn outwards in a circle
        for (let particle = 0; particle < numParticles; particle++) {
            
            // Assign a unique name to each particle
            // Their direction will be outward in a circle
            particles[nextName++] = create({
                center: {
                    x: randomX,
                    y: randomY,
                },
                size: {
                    mean: randomMean,
                    stdev: 2
                },
                direction: Random.nextCircleVector(),
                speed: {
                    mean: 200,
                    stdev: 50
                },
                lifetime: {
                    mean: 0.25,
                    stdev: 0.5
                },
                image: assets['yellow_star']
            });
        }
    }

    //------------------------------------------------------------------
    //
    // This creates one new particle
    //
    //------------------------------------------------------------------
    function create(spec) {
        let size = Random.nextGaussian(spec.size.mean, spec.size.stdev);
        let p = {
                center: { x: spec.center.x, y: spec.center.y },
                size: { width: size, height: size},  // Making square particles
                direction: spec.direction,
                speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev), // pixels per second
                rotation: 0,
                lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),    // How long the particle should live, in seconds
                alive: 0,    // How long the particle has been alive, in seconds
                image: spec.image
            };

        return p;
    }

    function update(elapsedTime) {
        // Don't bother updating if there aren't any particles to render!
        if (Object.keys(particles).length != 0) {
            // Render the particles
            // particleRenderer.render(particles);

            // Start of professor's code ------------------------------------------------------------
            let removeMe = [];

            //
            // We work with time in seconds, elapsedTime comes in as milliseconds
            elapsedTime = elapsedTime / 1000;

            Object.getOwnPropertyNames(particles).forEach(function (value, index, array) {
                let particle = particles[value];
                //
                // Update how long it has been alive
                particle.alive += elapsedTime;

                //
                // Update its center
                particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
                particle.center.y += (elapsedTime * particle.speed * particle.direction.y);

                //
                // Rotate proportional to its speed
                particle.rotation += particle.speed / 500;

                //
                // If the lifetime has expired, identify it for removal
                if (particle.alive > particle.lifetime) {
                    removeMe.push(value);
                }
            });

            //
            // Remove all of the expired particles
            for (let particle = 0; particle < removeMe.length; particle++) {
                delete particles[removeMe[particle]];
            }
            removeMe.length = 0;
            // End of professor's code --------------------------------------------------------------
        }
    };

    function clear_particles() {
        particles = {};
    }

    function game_over_update(elapsedTime) {
        game_over_time_elapsed += elapsedTime;
        if (game_over_time_elapsed > game_over_time_limit) {
            game_over_time_elapsed -= game_over_time_limit;
            create_fireworks();
        }
    }

    let api = {
        createWinEffect: createWinEffect,
        create_changeProperty_effect: create_changeProperty_effect,
        create_destroy_effect: create_destroy_effect,
        clear_particles: clear_particles,
        game_over_update: game_over_update,
        update: update,
        get particles() { return particles; }
    };

    return api;
}
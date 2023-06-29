// --------------------------------------------------------------
//
// Renders the particles in a particle system
//
// --------------------------------------------------------------
MyGame.render.ParticleRender = function(particles, graphics) {
    'use strict';

    //------------------------------------------------------------------
    //
    // Render all particles
    //
    //------------------------------------------------------------------
    Object.getOwnPropertyNames(particles).forEach( function(value) {
        let particle = particles[value];
        graphics.drawTexture(particle.image, particle.center, particle.rotation, particle.size);
    });
};

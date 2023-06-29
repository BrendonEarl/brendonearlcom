// --------------------------------------------------------------
//
// This system is responsible for rendering the whole game, which
// is just the background and the entities with a appearance
// and position components.
//
// --------------------------------------------------------------
MyGame.systems.render = (function (renderer, graphics) {
    'use strict';

    // --------------------------------------------------------------
    //
    // Find all the entities with both appearance and position components
    // and render them as segmented.
    //
    // --------------------------------------------------------------
    function renderEntities(entities, elapsedTime) {
        // Go through priority 4 times
        // 0 for BG
        // 1 for objects
        // 2 for liquids
        // 3 for text
        // 4 for YOU objects
        for (let priority = 0; priority < 5; priority++) {
            for (let id in entities) {
                let currentEntity = entities[id];
                if (currentEntity.components.appearance && currentEntity.components.position && currentEntity.components.appearance.render_priority == priority) {

                    let appearance = currentEntity.components.appearance;

                    // Update entity frame timer
                    appearance.elapsed_frame_timer += elapsedTime;

                    // If current frame timer says it's time to change frames
                    if (appearance.elapsed_frame_timer >= appearance.frame_time) {
                        appearance.elapsed_frame_timer -= appearance.frame_time;
                        // Add one to frame index
                        appearance.current_frame_index++;
                        // Wraps back to first frame when needed
                        appearance.current_frame_index = appearance.current_frame_index % appearance.num_frames;
                    }

                    // Render the entity
                    renderer.entity(graphics, currentEntity);
                }
            }
        }
    }

    function renderParticles(elapsedTime) {

    }

    // --------------------------------------------------------------
    //
    // Public interface used to get the whole game rendered.
    //
    // --------------------------------------------------------------
    function update(elapsedTime, entities, particleSystem) {
        graphics.clear();
        renderer.background(graphics);
        renderEntities(entities, elapsedTime);
        renderer.ParticleRender(particleSystem.particles, graphics);
    }

    let api = {
        update: update
    };

    return api;
}(MyGame.render, MyGame.graphics));

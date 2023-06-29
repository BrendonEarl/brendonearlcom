MyGame.render.entity = function (graphics, entity) {
    'use strict';

    // Render an entity based on its appearance
    graphics.drawSubImage(
        entity.components.appearance.image_src,
        entity.components.appearance.center,
        entity.components.appearance.rotation,
        entity.components.appearance.size,
        entity.components.appearance.pixel_size,
        entity.components.appearance.current_frame_index
    );
};

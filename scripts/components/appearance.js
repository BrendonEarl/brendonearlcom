MyGame.components.Appearance = function(spec) {
    'use strict';

    let elapsed_frame_timer = 0;
    let current_frame_index = 0;

    let api = {
        get name() { return 'appearance'; },

        // Code dealing with the image
        get image_src() { return spec.image_src; },
        set image_src(img) { spec.image_src = img; },
        get size() { return spec.size; },
        get pixel_size() { return spec.pixel_size; },
        get rotation() { return spec.rotation; },
        set rotation(amount) { spec.rotation = amount; },
        get center() { return spec.center; },
        set center(center) { spec.center.x = center.x; spec.center.y = center.y; },

        // Code dealing with frames and animation
        get num_frames() { return spec.num_frames; },
        get frame_time() { return spec.frame_time; },
        get elapsed_frame_timer() { return elapsed_frame_timer; },
        set elapsed_frame_timer(time) { elapsed_frame_timer = time; },
        get current_frame_index() { return current_frame_index; },
        set current_frame_index(index) { current_frame_index = index; },

        get image_ready() {return spec.image_ready;},
        set image_ready(val) {spec.image_ready = val;},

        // Code dealing with rendering
        get render_priority() {return spec.render_priority;},
        set render_priority(val) { spec.render_priority = val; }
    };

    return api;
};
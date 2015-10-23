Pixel_ = function (x, y, data) {
    Pixel.call(this, x, y, data);
    this.state = 0;
};

Pixel_.prototype = {
    __class_name: "Pixel_",
    constructor: Pixel_,
    states: {
        notProcessed: 0,
        processed: 1
    }
}

inherit(Pixel_, Pixel);
function Bin(config) {
    var self = this;

    self.run = function() {
        for (var y = 0; y < config.height; y++) {
            for (var x = 0; x < config.width; x++) {

                if (config.pixels[y][x].R == 0 || config.pixels[y][x].R == 255) continue;

                if (config.pixels[y][x].R < config.porog) {
                    setColor(y, x, { r: 0, g: 0, b: 0 });
                } else {
                    setColor(y, x, { r: 255, g: 255, b: 255 });
                }
            }
        }
    }

    var setColor = function(y,x, rgb) {
        config.pixels[y][x].setRgb(rgb);
        config.pixels[y][x].setPixelData(config.ctx);
    }
}
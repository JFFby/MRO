BinaryImageExtension = function (config) {
    var self = this;

    var masks = [
        [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ],
        [
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1]
        ]
    ];
    var mask = masks[0];
    var maskDimensions = mask[0].length,
        maskCentralElement = ((mask.length - 1) / 2) + 1,
        pixels = config.pixels,
        maskEdgeElements = maskDimensions - maskCentralElement,
            color = {
                r: 0,
                g: 0,
                b: 0
            },
        states = pixels[0][0].states;

    self.Run = function () {
        try {
            for (var y = 0; y < config.height; y++) {
                for (var x = 0; x < config.width; x++) {
                    for (var my = y - maskEdgeElements, maskY = 0; my <= y + maskEdgeElements; my++, maskY++) {
                        for (var mx = x - maskEdgeElements, maskX = 0; mx <= x + maskEdgeElements; mx++, maskX++) {
                            var condition = isInside(mx, my) && pixels[y][x].isWhite() && mask[maskY][maskX] == 1
                                && pixels[my][mx].isBlack() && pixels[my][mx].isNeedToProcess();
                            if (condition) {
                                setColor(pixels[y][x]);
                                pixels[y][x].setPixelData(config.ctx);
                                pixels[y][x].state = states.colorized;

                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.log(e);
            debugger;
        }
    }

    var isInside = function (x, y) {
        return x < config.width && x >= 0 && y >=0  && y < config.height;
    }

    var setColor = function (px) {
        px.R = color.r;
        px.G = color.g;
        px.B = color.b;
    }
}
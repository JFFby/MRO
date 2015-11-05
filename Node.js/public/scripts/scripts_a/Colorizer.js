Colorizer = function (fullColorize) {

    this.colorize = function (obj, pixels, ctx) {
          if (fullColorize) {
        colorize(obj, pixels);
        _.forEach(obj.pixels, function (p) {
            p.setPixelData(ctx);
        });
        } else {
            this.borderColorize(obj, ctx);
        }
    }

    var colorize = function (obj, pixels) {
        _.pxs = pixels;
        _.chain(obj.pixels).sortBy('X').groupBy('Y').forEach(function (e) {
            for (var i = e[0].X, el = e[e.length - 1].X; i <= el; ++i) {
                var px = _.pxs[e[0].Y][i];
                if (px.isBlack()) {
                    px.setRgb($.hexToRgb(obj.color));
                    px.state = px.states.colorized;
                    if (0 > _.findIndex(obj.pixels, function (p) {
                        return p.X == px.X && p.Y == px.Y;
                    })) {
                        obj.pixels.push(px);
                    }
                }
            }
        }).toArray().value();
        _.pxs = null;
    }

    this.borderColorize = function (obj, ctx) { // не тестил 
        _.forEach(obj.pixels, function (e) {
            e.state = e.states.colorized;
            e.setRgb($.hexToRgb(obj.color));
            e.setPixelData(ctx);
        });
    }
}
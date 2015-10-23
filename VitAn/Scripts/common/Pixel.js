function Pixel(x, y, data) {
    var self = this;

    var sourse = _.isArray(data) ? data : data.data;

    self.X = x;
    self.Y = y;
    self.R = sourse[0];
    self.G = sourse[1];
    self.B = sourse[2];
    self.Alpha = sourse[3];
}

Pixel.prototype.pixelData = function(ctx) {
    var px = ctx.createImageData(1, 1);
    px.data[0] = this.R;
    px.data[1] = this.G;
    px.data[2] = this.B;
    px.data[3] = this.Alpha;

    return px;
}

Pixel.prototype.setPixelData = function(ctx, x,y ) {
    ctx.putImageData(this.pixelData(ctx), x, y);
}

Pixel.prototype.isBlack = function() {
    return this.B == 255 && this.R == 255 && this.G == 255;
}

Pixel.prototype.isWhite = function () {
    return this.B == 0 && this.R == 0 && this.G == 0;
}

Pixel.prototype.__class_name = 'Pixel';
Pixel.prototype.constructor = Pixel;
function Pixel(x, y, data) {
    var self = this;

    var sourse = data ?  _.isArray(data) ? data : data.data : [];

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

Pixel.prototype.setPixelData = function(ctx) {
    ctx.putImageData(this.pixelData(ctx), this.X, this.Y);
}

Pixel.prototype.isWhite = function () {
    return this.B == 255 && this.R == 255 && this.G == 255;
}

Pixel.prototype.isBlack = function () {
    return this.B == 0 && this.R == 0 && this.G == 0;
}

Pixel.prototype.setRgb = function (rgb) {
    this.R = rgb.r;
    this.B = rgb.b;
    this.G = rgb.g;
}

Pixel.prototype.__class_name = 'Pixel';
Pixel.prototype.constructor = Pixel;
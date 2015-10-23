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
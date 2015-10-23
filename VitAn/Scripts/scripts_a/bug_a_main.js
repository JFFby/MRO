$(function () {

    var imgs = [
    '../imgs/lbdv.jpg'
    ];

    var $canvas = $('#canv');
    var ctx = $canvas.get(0).getContext('2d');
    var img = new Image();
    img.src = imgs[0];
    ctx.drawImage(img, 0, 0);
    img.onload = function () {
        $canvas.css('width', img.width);
        $canvas.css('height', img.height);
        ctx.drawImage(img, 0, 0);
        var pixel = new Pixel(0, 0, ctx.getImageData(0, 0, 10, 10));
        pixel.R = 255;
        pixel.G = 0;
        pixel.B = 0;
        ctx.putImageData(pixel.pixelData(ctx), pixel.X, pixel.Y);
        pixel.setPixelData(ctx, 0, 1);
        var a = $.getVectorPixels(ctx, 10, 10);
        var b = $.getMatrixPixels(ctx, 10, 10);
        for (var i = 0; i < 100; ++i) {
            console.log($.getRandomColor());
        }
    }
});
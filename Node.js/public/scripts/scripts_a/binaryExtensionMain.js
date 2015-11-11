$(function () {
    var imgs = [
    '../public/imgs/a/test1.png',
    '../public/imgs/a/test2.png',
    '../public/imgs/a/work_image.png',
    '../public/imgs/a/modified/dilateImage.png',
    '../public/imgs/a/modified/erodeImage1.png'
    ];

    var canvas = document.getElementById("canv");
    var ctx = canvas.getContext('2d');
    var img = new Image();
    var imgLink = imgs[2];
    img.src = imgLink;
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var ex = new BinaryImageExtension({
            ctx: ctx,
            height: img.height,
            width: img.width,
            pixels: $.getMatrixPixels(ctx, img.height, img.width, Pixel_)
        });
        var start = new Date();
        ex.Run();
        var end = new Date();
        console.log('elapsed time: ' + (end - start));
    }
})
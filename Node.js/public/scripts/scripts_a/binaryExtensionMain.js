$(function () {

    var canvId = 'canv';

    $('.imgSelector').imgSelector({
        url: '/imgs',
        path: 'public/imgs/a',
        img: canvId,
        onclick: function (ctx, img) {
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
    });
})
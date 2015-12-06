$(function () {
    var canvId = 'canv';
    console.log('bin');
    $('.imgSelector').imgSelector({
        url: '/imgs',
        path: 'public/imgs/a/main/sourse',
        img: canvId,
        defaultImg: 'work_image_small',
        onclick: function (ctx, img) {
            var porog = $('#treshold').val();
            if (!(new RegExp('^\\d+$')).test(porog)) return;

            var bin = new Bin({
                ctx: ctx,
                height: img.height,
                width: img.width,
                pixels: $.getMatrixPixels(ctx, img.height, img.width, Pixel_),
                porog: porog
            });
            var start = new Date();
            bin.run();
            var end = new Date();
            console.log('elapsed time: ' + (end - start));
        }
    });
})
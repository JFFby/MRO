$(function () {

    var imgs = [
    '../imgs/lbdv.jpg',
    '../imgs/test1.png',
    '../imgs/test2.png',
    '../imgs/work_image.png'
    ];

    var canvas = document.getElementById("canv");
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = imgs[3];
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var bug = new Bug({
            ctx: ctx,
            height: img.height,
            width: img.width,
            pixels: $.getMatrixPixels(ctx, img.height, img.width, Pixel_),
            resultProcessor: function (data) {
                objects = data;
                console.log(objects);
                var end = new Date();
                console.log("find: ".concat(end - start));
            },
            isDeepSearch: true
        });
        var start = new Date();
        var objects = bug.Run();
    }
});
$(function () {

    var imgs = [
    '../public/imgs/a/test1.png',
    '../public/imgs/a/work_image.png',
    '../public/imgs/a/modified/dilateImage.png',
    '../public/imgs/a/modified/erodeImage1.png',
    '../public/imgs/a/ex/ex_3_work.png'
    ];

    var canvas = document.getElementById("canv");
    var ctx = canvas.getContext('2d');
    var img = new Image();
    var imgLink = imgs[4];
    img.src = imgLink;
    var isDeepSearch = false;
    var fullColorize = false;
	// true for not deep search :)
    var extended = false;
    var minObjSize = 100;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var bug = new Bug({
            ctx: ctx,
            height: img.height,
            width: img.width,
            pixels: $.getMatrixPixels(ctx, img.height, img.width, Pixel_),
            fullColorize: fullColorize,
            minObjSize: minObjSize,
            extended: extended,
            resultProcessor: function (data) {
                var end = new Date();
                console.log("find: ".concat(end - start));

                var imgName = new RegExp('/(\\w*)[.]').exec(imgLink)[1];
                var fullName = imgName + '_isDeep_' + isDeepSearch + "_" + minObjSize + (extended ? "" : "_notExtended");
                if (fullColorize) {
                    pushResults(data, fullName).done(function (result) {
                        console.log(result);
                        window.open('results/a?filename=' + fullName, '_blank');
                    });

                }
            },
            isDeepSearch: isDeepSearch
        });
        var start = new Date();
        bug.Run();
    }
});

function pushResults(pixels, imgName) {
    return $.ajax({
        method: 'POST',
        url: '/a/push/a',
        data: { data: JSON.stringify(pixels), name: imgName }
    });
}
$(function () {


    var canvId = 'canv';

    $('.imgSelector').imgSelector({
        url: '/imgs',
        path: 'public/imgs/a/main/bug',
        img: canvId,
        onclick: function (ctx, img) {
            var isDeepSearch = false;
            var fullColorize = true;
            // true for not deep search :)
            var extended = false;
            var minObjSize = 100;

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

                    var imgName = new RegExp('/(\\w*)[.]').exec(img.src)[1];
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
});

function pushResults(pixels, imgName) {
    return $.ajax({
        method: 'POST',
        url: '/a/push/a',
        data: { data: JSON.stringify(pixels), name: imgName }
    });
}
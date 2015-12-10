$(function () {
    var canvId = 'canv';
    var sp = $('#spiner');
    sp.hide();
    $('.imgSelector').imgSelector({
        url: '/imgs',
        path: 'public/imgs/a/main/thin',
        img: canvId,
        onclick: function (ctx, img) {
            sp.show();
            sendImage(img.path, function () { sp.hide(); });
        }
    });

    var sendImage = function (path, callback) {
        $.ajax({
            method: "POST",
            url: 'perc/define',
            data: { data: path },
            success: function (result) {
                callback && callback();
                alert('Мы считаем, что это ' + result);
            }
        });
    }
})
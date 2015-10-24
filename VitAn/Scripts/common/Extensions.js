(function ($) {
    var getPixels = function (ctx, height, width, fn) { // need to test
        var constructor = fn || Pixel;
        var data = ctx.getImageData(0, 0, width, height);
        var n = 4;
        var lists = _.chain(data.data).groupBy(function (e, index) {
            return Math.floor(index / n);
        }).map(function (e, i, a) {
            var x = parseInt(i >= width ? i % width : i);
            var y = Math.floor(i / width);
            return new constructor(x, y, e);
        });
        return lists;
    }

    $.getVectorPixels = function (ctx, height, width, fn) {
        return getPixels(ctx, height, width, fn).value();
    }

    $.getMatrixPixels = function (ctx, height, width, fn) { //need to test
        return getPixels(ctx, height, width, fn).groupBy(function (e) {
            return e.Y;
        }).toArray().value();
    }

    var colors = [
        ['000066', '000099', '0000CC', '0000FF'],
        ['00FF00', '00FF33', '00FF66', '00FF99'],
        ['333300', '333366', '333366', '33FF66'],
        ['660066', '660099', '6600CC', '6600FF'],
        ['666633', '669999', '6699CC', '6699FF'],
        ['990000', '993366', '996633', '99CC66'],
        ['CC0099', 'CC66CC', 'CC99CC', 'CCFFFF'],
        ['CC9900', 'CC6633', 'CCCC66', 'CCFF99'],
        ['FFFF00', 'FFCC99', 'CCCC00', 'FF99FF']
    ];

    var target = [];

    for (var j = 0; j < colors[j].length; j++) {
        for (var k = 0; k < colors.length; k++) {
            target.push(colors[k][j]);
        }
    }

    colors = target;
    target = null;
    var i = 0;

    var getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    $.getRandomColor = function () { //need to test
        if (colors[i]) {
            var color = '#' + colors[i++];
            return color;
        }

        return getRandomColor();
    }
})(jQuery);
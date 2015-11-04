function previewFetcher(config) {
    var self = this,
        callBack = config.callback,
        cach = {};

    var queue = (function () {
        var previous = new $.Deferred().resolve();

        return function (fn) {
            return previous = previous.then(fn, fn);
        }
    })();

    var fetch = function (number, tr) {
        return $.ajax({
            method: 'GET',
            url: config.url,
            data: { number: number }
        }).done(function (result) {
            cach[number] = result;
            callBack(result, tr);
        });
    }

    self.loadImg = function (number, tr) {
        if (cach[number]) {
            console.log('from Cache');
            callBack(cach[number], tr);
            return;
        }
        queue(function () {
            return fetch(number, tr);
        });
    }
}
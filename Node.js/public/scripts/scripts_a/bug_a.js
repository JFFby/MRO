Bug = function (config) {

    config = _.extend({
        isDeepSearch: false,
        minObjSize: 50,
        ObjectsPushToServer: 100
    }, config);

    var self = this;

    var pixels = config.pixels;
    var pStates = pixels[0][0].states;
    var directions = {
        right: 1,
        bottom: 2,
        left: 3,
        top: 4
    };

    var bugCache = [];
    var cachSize = 15;
    var cacheBuffer = 5;
    var objects = [];
    var colorizer = new Colorizer(config.fullColorize);

    self.location = { x: 0, y: 0 }
    self.direction = directions.right;
    self.move = {
        step: function () {
            markPx();
            cacheStep();
            switch (self.direction) {
                case directions.right:
                    self.location.x++;
                    break;
                case directions.bottom:
                    self.location.y++;
                    break;
                case directions.left:
                    self.location.x--;
                    break;
                case directions.top:
                    self.location.y--;
                    break;
            }

        },
        turnOn: function (turnOn) {
            switch (turnOn) {
                case directions.right:
                    switch (self.direction) {
                        case directions.right:
                            self.direction = directions.bottom;
                            break;
                        case directions.bottom:
                            self.direction = directions.left;
                            break;
                        case directions.left:
                            self.direction = directions.top;
                            break;
                        case directions.top:
                            self.direction = directions.right;
                            break;
                    }
                    break;
                case directions.left:
                    switch (self.direction) {
                        case directions.right:
                            self.direction = directions.top;
                            break;
                        case directions.bottom:
                            self.direction = directions.right;
                            break;
                        case directions.left:
                            self.direction = directions.bottom;
                            break;
                        case directions.top:
                            self.direction = directions.left;
                            break;
                    }
                    break;
            }
        }
    };

    self.Run = function () {
        var obj = findObject();
        if (obj) {
            console.log(obj);
            colorizer.colorize(obj, pixels, config.ctx);
            if (obj.pixels.length > config.minObjSize) {
                objects.push(new imgEntity(obj));
            }

            _.delay(function () {
                self.Run();
            }, 100);
        } else {
            var result = _.chain(objects).sortBy(function (e) {
                return 0 - e.Pixels.length;
            }).take(config.ObjectsPushToServer).toArray().value();
            config.resultProcessor(result);
        }
    }

    var getStartPixel = function () {
        for (var i = 0, pl = pixels.length; i < pl; ++i) {
            var px = _.find(pixels[i], function (x) {
                return x.isWhite() && x.state == pStates.notProcessed;
            });
            if (px) {
                return px;
            }
        }

        return null;
    };

    var findObject = function () {
        var borderPx = tryFindObject();
        if (borderPx) {
            return bugCore(borderPx);
        } else {
            return null;
        }
    }

    var bugCore = function (startPx) {
        var startPxs = [startPx];
        var obj;
        do {
            if (startPxs.length > 0) {
                var data = tryGetObject(startPxs[0], obj);
                obj = data.object;
                startPxs.splice(0, 1);
                var newValues = _.filter(data.startPxs, function (e) {
                    return !_.find(startPxs, function (p) {
                        return p.X == e.X && p.Y == e.Y;
                    });
                });

                startPxs = startPxs.concat(newValues);
            }

        } while (startPxs.length > 0)

        obj.pixels = _.uniq(obj.pixels, function (e) {
            return JSON.stringify({ x: e.X, y: e.Y });
        });

        return obj;
    }

    var tryGetObject = function (startPx, oldObject) {
        var obj = oldObject || {
            number: objects.length + 1,
            color: $.getRandomColor(),
            pixels: [startPx]
        };

        var needTocheck = findHiddenPxs(startPx, true);

        do {
            var nextPx = findNextBlackPx();
            if (nextPx) {
                if (config.isDeepSearch && config.fullColorize && !config.extended) {
                    console.log('deep deep search');
                    needTocheck = needTocheck || [];
                    needTocheck = needTocheck.concat(findHiddenPxs(nextPx));
                }
                nextPx.state = pStates.inObject;
                obj.pixels.push(nextPx);
            }
        } while (nextPx && (self.location.x != startPx.X || self.location.y != startPx.Y))

        _.remove(needTocheck || [], function (e) {
            return _.contains(obj.pixels, e);
        });

        return {
            object: obj,
            startPxs: needTocheck || []
        };
    }

    var findNextBlackPx = function () {
        do {
            self.move.turnOn(getCurrPx().isBlack() ? directions.left : directions.right);
            self.move.step();
        } while (getCurrPx() && getCurrPx().isWhite())
        return getCurrPx();
    }

    var findHiddenPxs = function (px, isStarted) {
        var result = [];

        if (isStarted && !config.extended) {
            console.log('deep search');
            var cachedDirection = self.direction;
            self.move.turnOn(directions.right);
            self.move.step();
            if (isInside() && getCurrPx().isBlack()) {
                result.push(getCurrPx());
            }

            self.direction = cachedDirection;
            self.location.x = px.X;
            self.location.y = px.Y;
        }

        if (!config.isDeepSearch || !config.extended) return result;

        for (var y = self.location.y - 1, ly = self.location.y + 1; y <= ly; y++) {
            for (var x = self.location.x - 1, slx = self.location.x + 1; x <= slx; x++) {
                if (x == px.X || y == px.Y) {
                    continue;
                }

                if (pixels[y] && pixels[y][x] && pixels[y][x].isBlack() && pixels[y][x].state != pStates.inObject) {
                    result.push(pixels[y][x]);
                }
            }
        }

        return result;
    }

    var runBugFinder = function (px) {
        initBugAlgoritm(px);
        return findBlackPx();
    }

    var initBugAlgoritm = function (px) {
        self.location.x = px.X;
        self.location.y = px.Y;
        self.direction = directions.right;
    }

    var findBlackPx = null;
    var findBlackPx_contur = function () {
        var bPx;
        do {
            self.move.step();
            bPx = getCurrPx();
        } while (isInside() && (!bPx || bPx.isWhite()));

        return bPx && bPx.isNeedToProcess() ? bPx : null;
    }

    var findBlackPx_full = function () {
        var bPx;
        do {
            self.move.step();
            bPx = getCurrPx();
        } while (isInside() && (!bPx || bPx.isWhite() || !bPx.isNeedToProcess()));

        return bPx;
    }

    var tryFindObject = function () {
        var borderPx;
        do {
            var px = getStartPixel();
            borderPx = px ? runBugFinder(px) : null;
        } while (!borderPx && px)

        return borderPx;
    }

    var getCurrPx = function () {
        return pixels[self.location.y] ? pixels[self.location.y][self.location.x] : null;
    }

    var cacheStep = function () {
        var currPx = getCurrPx();
        if (currPx) {
            addStepInChache(currPx);
        }
    }

    var addStepInChache = function (px) {
        if (bugCache.length > cachSize) {
            bugCache.splice(0, cacheBuffer);
        }

        bugCache.push(px);
    }

    var isInside = function () {
        return self.location.x < config.width && self.location.y < config.height;
    }

    var markPx = function (state) {
        try {
            if (isInside() && !state && pixels[self.location.y][self.location.x].isWhite()) {
                pixels[self.location.y][self.location.x].state = pStates.processed;
            }
        } catch (e) {
            debugger;
        }
    }

    findBlackPx = config.fullColorize ? findBlackPx_full : findBlackPx_contur;

}
//var a = [{ x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }]
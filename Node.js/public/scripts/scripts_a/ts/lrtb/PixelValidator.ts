/// <reference path="../../../bower_components/DefinitelyTyped/linq/linq.3.0.3-Beta4.d.ts"/>
/// <reference path="../../../bower_components/DefinitelyTyped/lodash/lodash.d.ts"/>

class PixelValidator {
    static currentValidator: number = 0;

    private indexes: linqjs.Enumerable;
    private checkedIndexes: number[][];
    private tdPoints: number[] = [];
    private validators: any;

    constructor(private enviroment: EnviromentPixel[], private pixel: any) {
        this.indexes = Enumerable.range(1, enviroment.length);
        this.checkedIndexes = [
            [1, 3], [1, 5], [1, 8], [1, 7],
            [1, 6], [2, 8], [2, 7], [2, 6],
            [3, 8], [3, 7], [3, 6], [3, 4],
            [5, 6], [5, 4], [8, 6], [8, 4]
        ];

        this.validators = [
            this.isThin,
            this.isCoherence
        ];
    }

    public isValid(): boolean {
       return this.isEndPoint() || this.validators[PixelValidator.currentValidator].apply(this);
    }

    private isThin() {
        var result = false;
        Enumerable.from(this.checkedIndexes).forEach((e, i) => {
            if (!result) {
                result = this.commonValidation(e[0], e[1]);
            }
        });
        return result;
    }

    private isEndPoint(): boolean {
        return Enumerable.from(this.enviroment).count((i: EnviromentPixel) => i.color == Color.Black) == 1;
    }

    private commonValidation(_1st: number, _2st: number): boolean {
        var notChecked = this.indexes.where(x => x != _1st && x != _2st);
        if (this.enviroment[_1st - 1].color * this.enviroment[_2st - 1].color == 1) {
            this.tdPoints.push(_1st);
            this.tdPoints.push(_2st);

            return (notChecked.where(x => !_.includes(this.tdPoints, x))
                .select(x => this.enviroment[x - 1]).sum(x => x.color) == 0
                || Enumerable.from(this.enviroment).any((x: EnviromentPixel) => x.isBridgeForThis(this.pixel.X, this.pixel.Y)));
        } else {
            return false;
        }
    }

    private isCoherence(): boolean {
        var enviromentQuery = Enumerable.from(this.enviroment);
        var pixel = enviromentQuery.first((p: EnviromentPixel) => p.color == 1);
        pixel.status = State.Processed;
        var result = this.collectPixels(pixel, []);
        enviromentQuery.forEach((e, i) => {
            if (e.status == State.Processed) {
                e.status = State.NotProcessed;
            }
        })
        return result;
    }

    private collectPixels(pixel: EnviromentPixel, pixels: EnviromentPixel[]): boolean {
        var x = pixel.x, y = pixel.y;
        var query = [];
        for (var i = y - 1; i <= y + 1; ++i) {
            for (var j = x - 1; j <= x + 1; ++j) {

                if (i == y && j == x) continue;

                query.push('i.x == ' + j + ' && i.y==' + i);
            }
        }

        var queryString = '(' + query.join(' || ') + ')';
        var nPixels = _.chain(this.enviroment).filter((i: EnviromentPixel) => eval(queryString)
            && i.status == State.NotProcessed && i.color == 1)
            .each((px: EnviromentPixel) => px.status = State.Processed).value();
        pixels = pixels.concat(nPixels);

        if (pixels.length > 0) {
            this.collectPixels(pixels.pop(), pixels);
        }

        

        return _.any(this.enviroment, (p: EnviromentPixel) => p.status == State.NotProcessed && p.color == 1);
    }
}
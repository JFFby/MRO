/// <reference path="../../../bower_components/DefinitelyTyped/linq/linq.3.0.3-Beta4.d.ts"/>

class PixelValidator {
    private indexes: linqjs.Enumerable;
    private checkedIndexes: number[][];

    constructor(private enviroment: EnviromentPixel[], private pixel: any) {
        this.indexes = Enumerable.range(1, enviroment.length);
        this.checkedIndexes = [
            [1, 3], [1, 5], [1, 8], [1, 7],
            [1, 6], [2, 8], [2, 7], [2, 6],
            [3, 8], [3, 7], [3, 6], [3, 4],
            [5, 6], [5, 4], [8, 6], [8, 4]
        ];
    }

    public isValid(): boolean {
        return this.isEndPoint() || this.isThin();
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
        return this.enviroment[_1st - 1].color * this.enviroment[_2st - 1].color == 1;
    }
}
/// <reference path="Enums.ts"/>
/// <reference path="../../../bower_components/DefinitelyTyped/linq/linq.3.0.3-Beta4.d.ts"/>

class EnviromentPixel {
    static size = { width: 0, height: 0 };

    private isBoundaryPx: boolean;
    public status : State;

    constructor(
        public x: number,
        public y: number,
        public index: number,
        public color: Color,
        private enviroment?: EnviromentPixel[]) {
        this.isBoundaryPx = x == EnviromentPixel.size.width - 1 || y == EnviromentPixel.size.height - 1;
        this.status = State.NotProcessed;
    }

    isBridgeForThis(x: number, y: number): boolean {
        var neiborCount = Enumerable.from(this.enviroment).count(px => px.x != x || px.y != y);

        return this.color == Color.Black && this.enviroment &&
            (this.isBoundaryPx ? neiborCount < 1 : neiborCount <= 1);
    }
} 
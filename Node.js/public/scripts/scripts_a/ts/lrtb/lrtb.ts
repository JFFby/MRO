/// <reference path="EnviromentPixel.ts"/>
/// <reference path="Enums.ts"/>
/// <reference path="PixelValidator.ts"/>
/// <reference path="../../../bower_components/DefinitelyTyped/lodash/lodash.d.ts"/>

class Thinner {
    private pixels: any;
    private dimentionWalkerss: Array<ILrtbWalker>;

    constructor(private config: any) {
        this.pixels = config.pixels;
        EnviromentPixel.size = { width: this.config.width, height: this.config.height };

        this.dimentionWalkerss = new Array<ILrtbWalker>();
        this.dimentionWalkerss.push({
            dimension: Directions.L,
            go: () => { this.goLeft(); }
        });
        this.dimentionWalkerss.push({
            dimension: Directions.R,
            go: () => { this.goRight(); }
        });
        this.dimentionWalkerss.push({
            dimension: Directions.T,
            go: () => { this.goTop(); }
        });
        this.dimentionWalkerss.push({
            dimension: Directions.B,
            go: () => { this.goBottom(); }
        });
    }

    public run() {
        this.thininIteration(this);
    }

    private thininIteration(context: Thinner): void {
        var deletedPx = 0;
        for (var i = 0; i < context.dimentionWalkerss.length; i++) {
            context.dimentionWalkerss[i].go();
            deletedPx += context.deleteMarkedPixel();
        }

        if (deletedPx > 0) {
            _.delay(context.thininIteration, 50, context);
        }
    }

    private deleteMarkedPixel(): number {
        var deleteQuery = Enumerable.from(this.pixels).selectMany(x => x).where(x => x.state == State.PrepareToDelete);
        var result = deleteQuery.count();
        deleteQuery.forEach((e, i) => {
            e.state = State.Deleted
            eval("e.setRgb($.hexToRgb('#ffffff'));");
            e.setPixelData(this.config.ctx);
        });

        return result;
    }

    private isInside(x: number, y: number) {
        return x < this.config.width && x >= 0 && y >= 0 && y < this.config.height;
    }

    private processPixel(pixel: any, prevPixel: any) {
        if (pixel.isBlack() && (!prevPixel || this.isPrevPixelWhite(prevPixel))) {
            var validator: PixelValidator = new PixelValidator(this.getEnvirement(pixel.X, pixel.Y), pixel);
            if (!validator.isValid()) {
                pixel.state = State.PrepareToDelete;
            }
        }
    }

    private isPrevPixelWhite(pixel: any): boolean {
        var result = false;

        if (pixel) {
            if (pixel.isWhite()) {
                result = true;
            }
        }

        return result;
    }

    private getEnvirement(x: number, y: number): EnviromentPixel[] {
        var enviroment: Array<EnviromentPixel> = [];
        var counter = 1;
        for (var i = y - 1; i <= y + 1; ++i) {
            for (var j = x - 1; j <= x + 1; ++j) {

                if (i == y && j == x) continue;

                if (this.isInside(j, i)) {
                    enviroment.push(new EnviromentPixel(j, i, counter, this.pixels[i][j].isBlack() ? Color.Black : Color.White, this.getFarEnviroment(j, i)));
                } else {
                    enviroment.push(new EnviromentPixel(j, i, counter, Color.White));
                }
            }
        }

        return enviroment;
    }

    private getFarEnviroment(x: number, y: number): EnviromentPixel[] {
        var enviroment: Array<EnviromentPixel> = [];
        var counter = 1;
        for (var i = y - 1; i <= y + 1; ++i) {
            for (var j = x - 1; j <= x + 1; ++j) {

                if (i == y && j == x) continue;

                if (this.isInside(j, i) && this.pixels[i][j].isBlack()) {
                    enviroment.push(new EnviromentPixel(j, i, counter, Color.Black));
                }
            }
        }

        return enviroment;
    }

    private goLeft(): void {
        for (var i = 0; i < this.config.height; i++) {
            for (var j = 0; j < this.config.width; j++) {
                this.processPixel(this.pixels[i][j], this.pixels[i][j - 1]);
            }
        }
    }

    private goTop() {
        for (var i = 0; i < this.config.width; i++) {
            for (var j = 0; j < this.config.height; j++) {
                this.processPixel(this.pixels[j][i], this.pixels[j - 1] ? this.pixels[j - 1][i] : null);
            }
        }
    }

    private goRight() {
        for (var i = 0; i < this.config.height; i++) {
            for (var j = this.config.width - 1; j >= 0; j--) {
                this.processPixel(this.pixels[i][j], this.pixels[i][j + 1]);
            }
        }
    }

    private goBottom() {
        for (var i = 0; i < this.config.width; i++) {
            for (var j = this.config.height - 1; j >= 0; j--) {
                this.processPixel(this.pixels[j][i], this.pixels[j + 1] ? this.pixels[j + 1][i] : null);
            }
        }
    }
}
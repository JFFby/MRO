/// <reference path="../../../bower_components/DefinitelyTyped/lodash/lodash.d.ts"/>
/// <reference path="FiObject.ts"/>

module FI {
    export class FeatureInformativeness {
        private pixels: any;
        private masks: number[][][];
        private mask: number[][];
        private maskLength: number;
        private maskEdgeLength: number;


        constructor(private config: any) {
            this.pixels = config.pixels;

            this.masks = [
                [
                    [1, 1, 1],
                    [1, 3, 1],
                    [1, 1, 1]
                ],
                [
                    [1, 1, 1, 1, 1],
                    [1, 3, 3, 3, 1],
                    [1, 3, 5, 3, 1],
                    [1, 1, 1, 1, 1],
                    [1, 3, 3, 3, 1]
                ]
            ];

            this.mask = this.masks[this.config.mask];
            this.maskLength = this.mask.length;
            this.maskEdgeLength = ((this.maskLength - 1) / 2);
        }

        public run() {
            return this.createFiMatrix(this, 0);
        }

        private isInside(x: number, y: number) {
            return x < this.config.width && x >= 0 && y >= 0 && y < this.config.height;
        }

        private createFiMatrix(context: FI.FeatureInformativeness, y) {
            if (y == context.config.height) {
                context.onDone();
                return;
            }

            var fiArray = new Array<FI.FiObject>();

            for (var x = 0; x < context.config.width; x++) {
                var f = 0;

                for (var my = y - context.maskEdgeLength, maskY = 0; my <= y + context.maskEdgeLength; my++ , maskY++) {
                    for (var mx = x - context.maskEdgeLength, maskX = 0; mx <= x + context.maskEdgeLength; mx++ , maskX++) {
                        var pxValue = !context.isInside(mx, my) || context.pixels[my][mx].isWhite() ? 0 : 1;
                        f += Math.pow(context.mask[maskY][maskX] - pxValue, 2);
                    }
                }

                fiArray.push(new FI.FiObject(x,
                    y,
                    Math.sqrt(f).toString().substring(0, 5),
                    context.pixels[y][x].isWhite() ? 0 : 1));
            }

            context.config.accept(fiArray);
            _.delay(context.createFiMatrix, 50, context, ++y);
        }

        private onDone() {
            var end = new Date();
            eval("console.log('elapsed time: ' + (end - context.config.startTime))");
            this.config.onDone && this.config.onDone();
        }
    }
}
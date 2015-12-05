/// <reference path="../../../bower_components/DefinitelyTyped/lodash/lodash.d.ts"/>
/// <reference path="Sector.ts"/>
/// <reference path="FiObject.ts"/>

module FI {
    export class CodeBuilder {
        private searchValue: number;
        private pixels: FiObject[][];
        private sectors: SectorCollection;
        private width: number;
        private height: number;
        private items: FiObject[];
        private searchTemplates = [
            {
                value: [
                    [0, 1, 0],
                    [0, 1, 0],
                    [0, 0, 0]
                ],
                template: [
                    [1, 1, 1],
                    [1, 3, 1],
                    [1, 1, 1]
                ]
            }
        ];
        private angels = [0, 45, 90, 135, 180, 225, 270, 315, 360];

        constructor(private objects: any) {
            this.searchValue = this.calculateSearchTemplate(this.searchTemplates[0]);
            this.sectors = new SectorCollection(this.getSectors(this.angels));
            this.pixels = _.map<any, FiObject[]>(objects, 'items');
            this.height = this.pixels.length;
            this.width = (this.pixels[0] || []).length;
        }

        private calculateSearchTemplate(tempalte): number {
            var value = 0;
            for (var my = 0; my <= 2; my++) {
                for (var mx = 0; mx <= 2; mx++) {
                    var pxValue = tempalte.value[my][mx];
                    value += Math.pow(tempalte.template[my][mx] - pxValue, 2);
                }
            }

            return parseFloat(Math.sqrt(value).toString().substring(0, 5));
        }

        public run() {
            this.items = this.getCharacteristicItems();
            this.buildCodes(this.items);
        }

        private getSectors(items) {
            var result = _.map(items, (n, i) => {
                if (items[i + 1]) {
                    return new Sector(items[i], items[i + 1], i + 1);
                }
            });

            return _.compact(result);
        }

        private getCharacteristicItems(): FiObject[] {
            var value = this.searchValue.toString();
            var result: FiObject[] = [];
            _.forEach(this.pixels, (items) => {
                result = result.concat(_.filter(items, 'value', value));
            });

            return result;
        }

        private buildCodes(items: FiObject[]) {
            for (var i = 0; i < items.length; i++) {
                this.buildCode(items[i]);
            }
        }

        private buildCode(item: FiObject) {
            this.sectors.setItem(item);
            for (var i = 0; i < this.sectors.length(); i++) {
                this.serchSector(this.sectors.i(i), item);
            }

            this.sectors.clear();
        }

        private serchSector(sector: Sector, item: FiObject) {
            this.createSectorBound(sector.from, sector);
            this.createSectorBound(sector.to, sector);
            this.processSector(sector, item);
        }

        private createSectorBound(angel: number, sector: Sector) {
            var r = this.drForAngel(angel);
            var x = Math.round(sector.last(angel).x + r * Math.cos(this.toRad(angel)));
            var y = Math.round(sector.last(angel).y - r * Math.sin(this.toRad(angel)));

            if (this.isInside(x, y)) {
                sector.push(angel, { x: x, y: y });
                this.createSectorBound(angel, sector);
            }
        }

        private processSector(sector: Sector, item: FiObject) {
            switch (sector.number) {
                case 1:
                    this.sp1(sector, item);
                    break;
                case 2:
                    this.sp2(sector, item);
                    break;
                case 3:
                    this.sp3(sector, item);
                    break;
                case 4:
                    this.sp4(sector, item);
                    break;
                case 5:
                    this.sp5(sector, item);
                    break;
                case 6:
                    this.sp6(sector, item);
                    break;
                case 7:
                    this.sp7(sector, item);
                    break;
                case 8:
                    this.sp8(sector, item);
                    break;
                default:
                    throw new Error("wrong args");
            }
        }

        private sp1(sector: Sector, item: FiObject) {
            sector.sortByY();
            var lenght = sector.bt().length;
            var result = [];
            var anotherItems = _.reject(this.items, i => i.x == item.x && i.y == item.y);
            for (var i = 0; i < lenght; i++) {
                var ci = sector.bt()[i];
                result = result.concat(_.filter(anotherItems,
                    (p: FiObject) => {
                        return p.y == ci.y && p.x > ci.x;
                    }));
            }

            sector.code = result.length;
        }

        private sp2(sector: Sector, item: FiObject) {
            sector.sortByY();
            var lenght = sector.bt().length;
            var result = [];
            var anotherItems = _.reject(this.items, i => i.x == item.x && i.y == item.y);
            for (var i = 0; i < lenght; i++) {
                var ci = sector.bt()[i];
                var fbIndex = _.findIndex(sector.bf(), 'y', ci.y);
                var fb = fbIndex == -1 ? null : sector.bf()[fbIndex];
                result = result.concat(_.filter(anotherItems,
                    (p: FiObject) => {
                        return p.y == ci.y && p.x > ci.x && (!fb || p.x <= fb.x);
                    }));
            }

            sector.code = result.length;
        }

        private sp3(sector: Sector, item: FiObject) {
            sector.sortByY();
            var lenght = sector.bf().length;
            var result = [];
            var anotherItems = _.reject(this.items, i => i.x == item.x && i.y == item.y);
            for (var i = 0; i < lenght; i++) {
                var ci = sector.bf()[i];
                var tbIndex = _.findIndex(sector.bt(), 'y', ci.y);
                var tb = tbIndex == -1 ? null : sector.bt()[tbIndex];
                result = result.concat(_.filter(anotherItems,
                    (p: FiObject) => {
                        return p.y == ci.y && p.x <= ci.x && (!tb || p.x > tb.x);
                    }));
            }

            sector.code = result.length;
        }

        private sp4(sector: Sector, item: FiObject) {
            sector.sortByY();
            var lenght = sector.bf().length;
            var result = [];
            var anotherItems = _.reject(this.items, i => i.x == item.x && i.y == item.y);
            for (var i = 0; i < lenght; i++) {
                var ci = sector.bf()[i];
                result = result.concat(_.filter(anotherItems,
                    (p: FiObject) => {
                        return p.y == ci.y && p.x < ci.x;
                    }));
            }

            sector.code = result.length;
        }

        private sp5(sector: Sector, item: FiObject) {
            sector.sortByY();
            var lenght = sector.bt().length;
            var result = [];
            var anotherItems = _.reject(this.items, i => i.x == item.x && i.y == item.y);
            for (var i = 0; i < lenght; i++) {
                var ci = sector.bt()[i];
                result = result.concat(_.filter(anotherItems,
                    (p: FiObject) => {
                        return p.y == ci.y && p.x < ci.x;
                    }));
            }

            sector.code = result.length;
        }

        private sp6(sector: Sector, item: FiObject) {
            sector.sortByY();
            var lenght = sector.bt().length;
            var result = [];
            var anotherItems = _.reject(this.items, i => i.x == item.x && i.y == item.y);
            for (var i = 0; i < lenght; i++) {
                var ci = sector.bt()[i];
                var fbIndex = _.findIndex(sector.bf(), 'y', ci.y);
                var fb = fbIndex == -1 ? null : sector.bf()[fbIndex];
                result = result.concat(_.filter(anotherItems,
                    (p: FiObject) => {
                        return p.y == ci.y && p.x < ci.x && (!fb || fb.x <= p.x);
                    }));
            }

            sector.code = result.length;
        }

        private sp7(sector: Sector, item: FiObject) {
            sector.sortByY();
            var lenght = sector.bf().length;
            var result = [];
            var anotherItems = _.reject(this.items, i => i.x == item.x && i.y == item.y);
            for (var i = 0; i < lenght; i++) {
                var ci = sector.bf()[i];
                var tbIndex = _.findIndex(sector.bt(), 'y', ci.y);
                var tb = tbIndex == -1 ? null : sector.bt()[tbIndex];
                result = result.concat(_.filter(anotherItems,
                    (p: FiObject) => {
                        return p.y == ci.y && p.x > ci.x && (!tb || tb.x > p.x);
                    }));
            }

            sector.code = result.length;
        }

        private sp8(sector: Sector, item: FiObject) {
            sector.sortByY();
            var lenght = sector.bf().length;
            var result = [];
            var anotherItems = _.reject(this.items, i => i.x == item.x && i.y == item.y);
            for (var i = 0; i < lenght; i++) {
                var ci = sector.bf()[i];
                result = result.concat(_.filter(anotherItems,
                    (p: FiObject) => {
                        return p.y == ci.y && p.x > ci.x;
                    }));
            }

            sector.code = result.length;
        }

        private toRad(angel: number) {
            return angel * Math.PI / 180;
        }

        private isInside(x: number, y: number) {
            return x < this.width && x >= 0 && y >= 0 && y < this.height;
        }

        private drForAngel(angel: number): number {
            switch (angel) {
                case 0:
                case 90:
                case 180:
                case 270:
                case 360:
                    return 1;
                    break;
                case 45:
                case 135:
                case 315:
                case 225:
                    return Math.sqrt(2);
                    break;
                default:
                    throw new Error("wrong argiment");
            }
        }
    }
} 
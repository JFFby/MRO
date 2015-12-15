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
        private items: HElement[];
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

        public run(): HElement[] {
            this.items = this.getCharacteristicItems();
            return this.buildCodes(this.items);
        }

        private getSectors(items) {
            var result = _.map(items, (n, i) => {
                if (items[i + 1]) {
                    return new Sector(items[i], items[i + 1], i + 1);
                }
            });

            return _.compact(result);
        }

        private getCharacteristicItems(): HElement[] {
            var value = this.searchValue.toString();
            var result: FiObject[] = [];
            _.forEach(this.pixels, (items) => {
                result = result.concat(_.filter(items, 'value', value));
            });

            return _.map(result, (r: FiObject) => new HElement(r));
        }

        private buildCodes(items: HElement[]): HElement[] {
            for (var i = 0; i < items.length; i++) {
                this.buildCode(items[i]);
            }

            return items;
        }

        private buildCode(item: HElement) {
            this.sectors.setItem(item);
            for (var i = 0; i < this.sectors.length(); i++) {
                this.serchSector(this.sectors.i(i), item);
            }

            this.sectors.clear();
        }

        private serchSector(sector: Sector, item: HElement) {
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

        private processSector(sector: Sector, item: HElement) {
            switch (sector.number) {
                case 1:
                    this.baseSp(sector, item, 'bt', this.sp1);
                    break;
                case 2:
                    this.baseSp(sector, item, 'bt', this.sp2);
                    break;
                case 3:
                    this.baseSp(sector, item, 'bf', this.sp3);
                    break;
                case 4:
                    this.baseSp(sector, item, 'bf', this.sp4);
                    break;
                case 5:
                    this.baseSp(sector, item, 'bt', this.sp5);
                    break;
                case 6:
                    this.baseSp(sector, item, 'bt', this.sp6);
                    break;
                case 7:
                    this.baseSp(sector, item, 'bf', this.sp7);
                    break;
                case 8:
                    this.baseSp(sector, item, 'bf', this.sp8);
                    break;
                default:
                    throw new Error("wrong args");
            }
        }

        private baseSp(sector: Sector, item: HElement, bound: string, fn) {
            sector.sortByY();
            var lenght = sector[bound]().length;
            var result = [];
            var anotherItems = _.reject(this.items, i => i.x == item.x && i.y == item.y);
            for (var i = 0; i < lenght; i++) {
                result = result.concat(fn(sector, i, anotherItems));
            }

            item.setCode(sector.number - 1, result.length);
        }

        private sp1(sector: Sector, i: number, anotherItems: HElement[]) {
            var ci = sector.bt()[i];
            return _.filter(anotherItems,
                (p: HElement) => {
                    return p.y == ci.y && p.x > ci.x;
                });
        }

        private sp2(sector: Sector, i: number, anotherItems: HElement[]) {
            var ci = sector.bt()[i];
            var exceptedX = sector.bt()[0].x;
            var fbIndex = _.findIndex(sector.bf(), 'y', ci.y);
            var fb = fbIndex == -1 ? null : sector.bf()[fbIndex];
            return _.filter(anotherItems,
                (p: HElement) => {
                    return p.y == ci.y && p.x != exceptedX && p.x > ci.x && (!fb || p.x <= fb.x);
                });
        }

        private sp3(sector: Sector, i: number, anotherItems: HElement[]) {
            var ci = sector.bf()[i];
            var tbIndex = _.findIndex(sector.bt(), 'y', ci.y);
            var tb = tbIndex == -1 ? null : sector.bt()[tbIndex];
            return _.filter(anotherItems,
                (p: HElement) => {
                    return p.y == ci.y && p.x <= ci.x && (!tb || p.x > tb.x);
                });
        }

        private sp4(sector: Sector, i: number, anotherItems: HElement[]) {
            var ci = sector.bf()[i];
            var exceptedY = sector.bt()[sector.bt().length - 1].y;
            return _.filter(anotherItems,
                (p: HElement) => {
                    return p.y == ci.y && p.x < ci.x && p.y != exceptedY;
                });
        }

        private sp5(sector: Sector, i: number, anotherItems: HElement[]) {
            var ci = sector.bt()[i];
            return _.filter(anotherItems,
                (p: HElement) => {
                    return p.y == ci.y && p.x < ci.x;
                });
        }

        private sp6(sector: Sector, i: number, anotherItems: HElement[]) {
            var ci = sector.bt()[i];
            var exceptedX = sector.bt()[0].x
            var fbIndex = _.findIndex(sector.bf(), 'y', ci.y);
            var fb = fbIndex == -1 ? null : sector.bf()[fbIndex];
            return _.filter(anotherItems,
                (p: HElement) => {
                    return p.y == ci.y && p.x != exceptedX && p.x < ci.x && (!fb || fb.x <= p.x);
                });
        }

        private sp7(sector: Sector, i: number, anotherItems: HElement[]) {
            var ci = sector.bf()[i];
            var tbIndex = _.findIndex(sector.bt(), 'y', ci.y);
            var tb = tbIndex == -1 ? null : sector.bt()[tbIndex];
            return _.filter(anotherItems,
                (p: HElement) => {
                    return p.y == ci.y && p.x > ci.x && (!tb || tb.x > p.x);
                });
        }

        private sp8(sector: Sector, i: number, anotherItems: HElement[]) {
            var ci = sector.bf()[i];
            return _.filter(anotherItems,
                (p: HElement) => {
                    return p.y == ci.y && p.x > ci.x && p.y != sector.bt()[0].y;
                });
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
                    throw new Error("wrong argument");
            }
        }
    }
}
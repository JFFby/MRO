module FI {
    export class Sector {
        private bound: Object;
        private fMaxY: number;
        private fMinY: number;
        private tMaxY: number;
        private tMinY: number;

        constructor(public from: number, public to: number, public number: number) {
            this.bound = {};
            this.bound[this.from] = [];
            this.bound[this.to] = [];
        }

        public bf():FiObject[] {
            return this.bound[this.from];
        }

        public bt(): FiObject[] {
            return this.bound[this.to];
        }

        public push(i: number, pixel) {
            this.bound[i].push(pixel);
        }

        public last(i: number) {
            return this.bound[i][this.bound[i].length - 1];
        }

        public clear() {
            this.bound[this.from] = [];
            this.bound[this.to] = [];
        } s

        public props() {
            return [this.from, this.to];
        }

        public isYEqals() {
            this.checkYs();
            return this.fMaxY == this.tMaxY &&
                this.fMinY == this.tMinY;
        }

        public sortByY() {
            this.bound[this.from] = _.sortBy(this.bf(), 'y');
            this.bound[this.to] = _.sortBy(this.bt(), 'y');
        }

        private checkYs() {
            if (!this.fMaxY) {
                this.fMaxY = _.max<any>(this.bound[this.from], 'y').y;
            }

            if (!this.fMinY) {
                this.fMinY = _.min<any>(this.bound[this.from], 'y').y;
            }

            if (!this.tMaxY) {
                this.tMaxY = _.max<any>(this.bound[this.to], 'y').y;
            }

            if (!this.tMinY) {
                this.tMinY = _.min<any>(this.bound[this.to], 'y').y;
            }
        }
    }

    export class SectorCollection {
        constructor(private sectors: Sector[]) { }

        public i(i: number) {
            return this.sectors[i];
        }

        public clear() {
            for (var i = 0; i < this.sectors.length; i++) {
                this.sectors[i].clear();
            }
        }

        public setItem(item: FiObject) {
            for (var i = 0; i < this.sectors.length; i++) {
                var props = this.sectors[i].props();
                for (var p = 0; p < props.length; ++p) {
                    this.sectors[i].push(props[p], { x: item.x, y: item.y });
                }
            }
        }

        public length() {
            return this.sectors.length;
        }
    }
} 
/// <reference path="../../../bower_components/DefinitelyTyped/lodash/lodash.d.ts"/>

module FI {
    export class Spliter {
        private uniqueValues: number[]
        private stats: any

        constructor(fiMatrix: any[]) {
            this.uniqueValues = this.collectUniqueValues(fiMatrix);
            console.log(this.uniqueValues);
            this.stats = this.getStats(fiMatrix);
            console.log(this.stats);
        }

        private collectUniqueValues(fiMatrix: any[]):number[] {
            var tempArray = new Array<string>() ;
            for (var i = 0; i < fiMatrix.length; i++) {
                tempArray = tempArray.concat(_.unique(_.pluck(fiMatrix[i].items,'value'), false));
            }

            return _.sortBy(_.map(_.unique(tempArray), (i) => parseFloat(i)));
        }

        private getStats(fiMatrix: any[]) {
            var stats = {};
            for (var k in this.uniqueValues) {
                stats[this.uniqueValues[k]] = 0;
            }

            for (var i = 0; i < fiMatrix.length; i++) {
                for (var j = 0; j < fiMatrix[i].items.length; j++) {
                    stats[fiMatrix[i].items[j].value] += 1;
                }
            }

            return stats;
        }
    }
} 
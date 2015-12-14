/// <reference path="../../../bower_components/DefinitelyTyped/lodash/lodash.d.ts"/>

module FI {
    export class DetermineService {
        constructor(private obj, private codes) { }

        public determine() {
            if (this.codes && this.codes.length > 0) {
                return this.defineNumber();
            }

            return this.defineEmtyCodenumber();
        }

        private defineEmtyCodenumber() {
            var numbers = [];
            var values = this.generateNumbers();
            for (var i in this.obj)
                if (this.obj.hasOwnProperty(i) && i.length > 8) {
                    numbers = numbers.concat(this.obj[i]);
                }

            var result = _.difference(values, numbers);
            return result ? result[0] : 'undefined';
        }

        private generateNumbers() {
            var result = [];
            for (var i = 0; i < 10; i++) {
                result.push(i.toString());
            }

            return result;
        }

        private defineNumber() {
            var numbers = this.getApplicants();
            return this.getNumber(numbers);
        }

        private getApplicants() {
            var results = [];
            for (var i = 0; i < this.codes.length; i++) {
                var code = this.codes[i];
                results = this.obj[code] ? results.concat(this.obj[code]) : results;
            }

            return results;
        }

        private getNumber(numbers) {
            if (numbers.length > 0) {
                var result = {};
                for (var i = 0; i < numbers.length; i++) {
                    var num = numbers[i];
                    if (!result[num]) {
                        result[num] = { key: num, value: 1 };
                    } else {
                        result[num].value += 1;
                    }
                }

                var arrRes = [];
                for (var p in result) {
                    if (result.hasOwnProperty(p)) {
                        p = parseInt(p);
                        arrRes.push(result[p]);
                    }
                }

                var counts = _.countBy(this.obj.numbers);
                arrRes = _.each(arrRes, i => {
                    return i.value = i.value / counts[i.key];
                });
                console.log(arrRes);

                return _.max(arrRes, 'value').key;
            }

            return 'undefuned';
        }

    }
} 
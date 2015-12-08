/// <reference path="../../../bower_components/DefinitelyTyped/lodash/lodash.d.ts"/>

module FI {
    export class DetermineService {
        constructor(private obj, private codes) { }

        public determine() {
            if (this.codes && this.codes.length > 0) {
                return this.defineNumber();
            }

            return 'Codes is Required';
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
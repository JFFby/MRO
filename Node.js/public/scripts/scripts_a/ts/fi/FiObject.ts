/// <reference path="../../../bower_components/DefinitelyTyped/knockout/knockout.d.ts"/>
/// <reference path="../lrtb/Enums.ts"/>

module FI {
    export class FiObject {
        constructor(public x: number, public y: number, public value: string, public color: Color) { }
    }

    export class HElement extends FiObject {
        public code;
        public fullName;

        constructor(fo: FiObject) {
            super(fo.x, fo.y, fo.value, fo.color);
            this.code = ko.observableArray([]);
            this.fullName = ko.computed(
                () => 'x:' + this.x + ' y: ' + this.y + '  code: '
                    + this.code().toString().replace(new RegExp(',', 'g'), ' '));
        }

        public setCode(i: number, code: number) {
            var codes = this.code();
            codes[i] = code;
            this.code(codes);
        }
    }
} 
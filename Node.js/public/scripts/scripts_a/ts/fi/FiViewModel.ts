/// <reference path="../../../bower_components/DefinitelyTyped/knockout/knockout.d.ts"/>
/// <reference path="Spliter.ts"/>
/// <reference path="CodeBuilder.ts"/>

module FI {
    export class FiViewModel {
        public spliter;

        constructor(config: Object) { }

        public cellItem = ko.observableArray([]);
        public isTableVisible = ko.computed(() => {
            return this.cellItem().length > 0;
        });

        public addItems(items: FI.FiObject[]) {
            var array = this.cellItem() || [];
            this.cellItem(array.concat([{ items: items}]));
        }

        public createSpliter() {
            //this.spliter = new FI.Spliter(this.cellItem());
            var codeBuilder = new CodeBuilder(this.cellItem());
            codeBuilder.run();
        }
    }
}
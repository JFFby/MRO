/// <reference path="../../../bower_components/DefinitelyTyped/knockout/knockout.d.ts"/>

module FI {
    export class FiViewModel {
        constructor(config: Object) { }

        public cellItem = ko.observableArray([]);
        public isTableVisible = ko.computed(() => {
            return this.cellItem().length > 0;
        });

        public addItems(items: FI.FiObject[]) {
            var array = this.cellItem() || [];
            this.cellItem(array.concat([{ items: items}]));
        }
    }
}
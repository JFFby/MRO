/// <reference path="../../../bower_components/DefinitelyTyped/knockout/knockout.d.ts"/>
/// <reference path="../../../bower_components/DefinitelyTyped/jquery/jquery.d.ts"/>
/// <reference path="../../../bower_components/DefinitelyTyped/lodash/lodash.d.ts"/>
/// <reference path="Spliter.ts"/>
/// <reference path="CodeBuilder.ts"/>

module FI {
    export class FiViewModel {
        public spliter;
        public hElements;
        public showTable
        public lerning;
        public number;
        private cellItemCach;

        constructor(config: Object) {
            this.cellItemCach = [];
            this.hElements = ko.observableArray<HElement>([]);
            this.showTable = ko.observable(false);
            this.lerning = ko.observable(false);
            this.showTable.subscribe((value) => {
                if (value) {
                    this.cellItem(this.cellItemCach);
                } else {
                    var self = this;
                    _.delay(function () { self.cellItemCach = this.cellItem(); }, 20);
                }
            });
            this.number = ko.observable('');
        }

        public cellItem = ko.observableArray([]);

        public isTableVisible = ko.computed(() => {
            return this.cellItem().length > 0 && this.showTable();
        });

        public isCeListVisible = ko.computed(() => typeof this.hElements == "function"
            && this.hElements().length > 0);

        public addItems(items: FI.FiObject[]) {
            var elements = [{ items: items }];
            if (this.showTable()) {
                var array = this.cellItem() || [];
                this.cellItem(array.concat(elements));
            } else {
                this.cellItemCach = this.cellItemCach.concat(elements);
            }
        }

        public createSpliter() {
            //this.spliter = new FI.Spliter(this.cellItem());
            var codeBuilder = new CodeBuilder(this.showTable() ? this.cellItem() : this.cellItemCach);
            var he = codeBuilder.run();
            this.hElements(he);
            if (this.lerning()) {
                var data = { num: this.number(), code: _.map(he, (i:HElement) => i.code()), };
                $.ajax({
                    method: "POST",
                    url: 'fi/save',
                    data: { data: JSON.stringify(data)}
                });
            }
        }
    }
}
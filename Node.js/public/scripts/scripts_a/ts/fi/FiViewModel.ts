/// <reference path="../../../bower_components/DefinitelyTyped/knockout/knockout.d.ts"/>
/// <reference path="../../../bower_components/DefinitelyTyped/lodash/lodash.d.ts"/>
/// <reference path="Spliter.ts"/>
/// <reference path="CodeBuilder.ts"/>
/// <reference path="fiService.ts"/>
/// <reference path="DetermineService.ts"/>

module FI {
    export class FiViewModel {
        public spliter;
        public hElements;
        public showTable
        public lerning;
        public number;
        public spinervisible;
        private cellItemCach;
        private service;

        constructor(config: Object) {
            this.service = new FiSevice({
                saveCodes: 'fi/save',
                getCodes: 'fi/get'
            });
            this.cellItemCach = [];
            this.hElements = ko.observableArray<HElement>([]);
            this.showTable = ko.observable(false);
            this.lerning = ko.observable(true);
            this.spinervisible = ko.observable(false);
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

        public showSpiner() {
            this.spinervisible(true);
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
            var codes = _.map(he, (i: HElement) => i.code());
            if (this.lerning()) {
                if (this.number().length > 0) {
                    var data = { num: this.number(), code: codes, };
                    this.service.saveCodes(data);
                }
                this.spinervisible(false);
            } else {
                this.service.getCodes().done(result => {
                    this.spinervisible(false);
                    var determineService = new DetermineService(result, codes);
                    var answer = determineService.determine();
                    alert('Мы считаем, что это ' + answer);
                });
            }
        }
    }
}
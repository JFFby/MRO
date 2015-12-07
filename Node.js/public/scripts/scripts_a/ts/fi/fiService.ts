/// <reference path="../../../bower_components/DefinitelyTyped/jquery/jquery.d.ts"/>

module FI {
    export class FiSevice {
        constructor(public urls) { }

        public saveCodes(data) {
            $.ajax({
                method: "POST",
                url: this.urls.saveCodes,
                data: { data: JSON.stringify(data) }
            });
        }

        public getCodes(): JQueryDeferred<void> {
            var dfd = jQuery.Deferred<void>();
            $.ajax({
                method: "GET",
                url: this.urls.getCodes,
                success: data => {
                    dfd.resolve(JSON.parse(data));
                }
            });

            return dfd;
        }
    }
} 
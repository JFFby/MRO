/// <reference path="../../../bower_components/DefinitelyTyped/jquery/jquery.d.ts"/>
/// <reference path="../../../bower_components/DefinitelyTyped/knockout/knockout.d.ts"/>
/// <reference path="FeatureInformativeness.ts" /> 
/// <reference path="FiViewModel.ts" /> 

module FI {
    export class Program {
        static main(): void {
            var canvId = 'canv';
            var viewModel = new FI.FiViewModel({});
            $('.container, .tableWrapper').css('width','100%').css('max-width','none');
            var options = {
                url: '/imgs',
                path: 'public/imgs/a',
                img: canvId,
                defaultImg: eval("defaultImg"),
                onclick: (ctx, img) => {
                    var fi = new FI.FeatureInformativeness({
                        pixels: eval("$.getMatrixPixels(ctx, img.height, img.width, Pixel_)"),
                        width: img.width,
                        height: img.height,
                        ctx: ctx,
                        startTime: new Date(),
                        accept: (o) => {
                            viewModel.addItems(o);
                        },
                        mask: eval('mask')
                    });
                    fi.run();
                }
            }

            eval("$('.imgSelector').imgSelector(options)");
            ko.applyBindings(viewModel);
        }
    }
}


$(() => {
    FI.Program.main();
});

//tsc --out fi.js fi_main.ts
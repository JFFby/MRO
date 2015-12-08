/// <reference path="lrtb.ts" /> 
/// <reference path="../../../bower_components/DefinitelyTyped/jquery/jquery.d.ts"/>

class Program {
    static main(): void {

        var canvId = 'canv';

        var start = new Date();
        var options = {
            url: '/imgs',
            path: 'public/imgs/a/main/thin',
            img: canvId,
            defaultImg: eval("defaultImg"),
            onclick: (ctx, img) => {
                var thiner: Thinner = new Thinner({
                    pixels: eval("$.getMatrixPixels(ctx, img.height, img.width, Pixel_)"),
                    width: img.width,
                    height: img.height,
                    startTime: start,
                    ctx: ctx,
                    validator: eval('validator')
                });
                start = new Date();
                thiner.run();
            }
        }

        eval("$('.imgSelector').imgSelector(options)");
    }
} 

$(() => {
    Program.main();
});

//tsc --out thinnig.js lrtb_main.ts
/// <reference path="lrtb.ts" /> 
/// <reference path="../../../bower_components/DefinitelyTyped/jquery/jquery.d.ts"/>

class Program {
    static main(): void {
        var canvas: any = document.getElementById("canv");
        var ctx: any = canvas.getContext('2d');
        var img = new Image();
        img.src = eval('imgLink');
        img.onload = (e: Event) => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            var thiner: Thinner = new Thinner({
                pixels: eval("$.getMatrixPixels(ctx, img.height, img.width, Pixel_)"),
                width: img.width,
                height: img.height,
                ctx: ctx
        });
            thiner.run();
        };
    }
} 

$(() => {
    Program.main();
});

//tsc --out thinnig.js lrtb_main.ts
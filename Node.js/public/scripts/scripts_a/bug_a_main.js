$(function () {

    var imgs = [
    '../public/imgs/lbdv.jpg',
    '../public/imgs/test1.png',
    '../public/imgs/test2.png',
    '../public/imgs/work_image.png'
    ];

    var canvas = document.getElementById("canv");
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = imgs[3];
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
		var px = JSON.stringify(new Pixel(1,3,[33,1,2,3]));
		$.ajax({
			method:'POST',
			url:'push/a',
			data:{data:px},
			succes:function(data){
				console.log(data);
			}
		});
        // var bug = new Bug({
            // ctx: ctx,
            // height: img.height,
            // width: img.width,
            // pixels: $.getMatrixPixels(ctx, img.height, img.width, Pixel_),
            // resultProcessor: function (data) {
                // objects = data;
                // console.log(objects);
                // var end = new Date();
                // console.log("find: ".concat(end - start));
            // },
            // isDeepSearch: true
        // });
        // var start = new Date();
        // var objects = bug.Run();
    }
});
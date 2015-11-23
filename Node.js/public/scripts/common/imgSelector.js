(function ($) {

    var defaults = {
        img: 'canv',
        btnId: '#start'
    }

    var methods = {
        init: function (config) {
            var options = $.extend({}, defaults, config);
            var $element = $(this);

            if ($element.length < 1) return;

            var img,
                canvas = document.getElementById(options.img),
                ctx = canvas.getContext('2d');

            $element.on('change', function () {
                var value = $('option:selected', this).text();
                img = new Image();
                img.src = value;
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                }
            });

            $(options.btnId).on('click', function() {
                options.onclick.call(window, ctx, img);
            });

            $element.parent().css('display', 'block');
            $.ajax({
                method: 'GET',
                url: options.url,
                data: { path: options.path },
                success: function (data) {
                    data = JSON.parse(data);
                    $.each(data.files, function (i, item) {
                        item = item.replace(data.basePath, '').replace(new RegExp('[/\]', 'g'), '//');
                        $element
                            .append($('<option>', { value: i })
                                .text(item));
                    });


                }
            });
        }
    }

    $.fn.imgSelector = function (options) {
        if (typeof options == 'object') {
            methods.init.apply(this, arguments);
        }
    }

})(jQuery)
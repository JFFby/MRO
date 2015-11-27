(function ($) {

    var defaults = {
        img: 'canv',
        btnId: '#start',
        defaultImg: null
    }

    function setImg(value, canvas, ctx) {
        var img = new Image();
        img.src = value;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
        }

        return img;
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
                img = setImg(value, canvas, ctx);
            });

            $(options.btnId).on('click', function () {
                options.onclick.call(window, ctx, img);
            });

            $element.closest('.ui.form').css('display', 'block');
            $.ajax({
                method: 'GET',
                url: options.url,
                data: { path: options.path },
                success: function (data) {
                    data = JSON.parse(data);
                    var items = [];
                    $.each(data.files, function (i, item) {
                        item = item.replace(data.basePath, '').replace(new RegExp('[/\]', 'g'), '//');
                        items.push({ value: i, key: item });
                        $element
                            .append($('<option>', { value: i })
                                .text(item));
                    });

                    if (options.defaultImg) {
                        var reg = new RegExp(options.defaultImg, 'i');
                        var defaultImgs = _.filter(items, function (i) {
                            return reg.test(i.key);
                        });
                        if (defaultImgs.length > 0) {
                            img = setImg(defaultImgs[0].key, canvas, ctx);
                            $('[value="' + defaultImgs[0].value + '"]').prop('selected', true);
                        }
                    }
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
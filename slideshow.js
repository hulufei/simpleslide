/*
 * Feel free to use, copy, modify, merge, publish, distribute the file
 */
(function($) {
    $.fn.slideShow = function(options) {
        var settings = {
            step: 1,
            duration: 800,
            nextCallBack: function() {},
            backCallBack: function() {}
        };
        if (options) {
            $.extend(settings, options);
        }
        var $items = this.children(),
            cache = this.children().clone(true, true).toArray(),
            step = settings.step,
            duration = settings.duration,
            _this = this;
            width = $items.outerWidth();

        var methods = {
            next: function() {
                var nextItems = cache.splice(0, step);
                cache = cache.concat(nextItems);
                _this
                    .append($(nextItems).clone(true, true))
                    .children(':first')
                    .animate({
                        'margin-left': -1 * step * width
                    }, function() {
                        _this.children().slice(0, step).remove();
                    });
                settings.nextCallBack();
            },
            back: function() {
                var nextItems = cache.splice(-1, step);
                cache = nextItems.concat(cache);
                _this
                    .prepend($(nextItems).clone(true, true))
                    .children(':first')
                    .css('marginLeft', -1 * step * width)
                    .animate({
                        'margin-left': 0
                    }, function() {
                        _this.children().slice(-1).remove();
                    });
                settings.backCallBack();
            }
        };
        if (settings.nextElem || settings.backElem) {
            $(settings.backElem).bind('click', methods.back);
            $(settings.nextElem).bind('click', methods.next);
        }
        return this;
    };
})(jQuery);

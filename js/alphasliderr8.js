var sliderUI = {};
! function() {
    "use strict";
    if ("undefined" == typeof window.jQuery) return !1;
    if ($(".js-slider-stage li").length < 2) return $(".js-slider-stage").removeClass("slider__stage--loading"), !1;
    var l = "//cdnjs.cloudflare.com/ajax/libs/flickity/1.0.2/flickity.pkgd.min.js",
        i = "/files/templates/00000000-0000-0000-0000-000000000000/f88a7f3c-df7e-430a-825c-24cfa8dec9a8/flickity.1.0.2.min.js";
    sliderUI.load = function() {
        var l, i = {
            accessibility: !1,
            autoPlay: 5e3,
            cellAlign: "left",
            imagesLoaded: !0,
            pageDots: !1,
            percentPosition: !0,
            prevNextButtons: !1,
            wrapAround: !0
        };
        sliderUI.slider = $(".js-slider-stage").flickity(i), l = '<div class="slider__controls"><button class="slider__control  slider__control--fill    toggle  toggle--brand  is-active    js-slider-autoplay" type="button"><svg class="slider__icon    toggle__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><g class="toggle__layer  toggle__layer--active"><polygon points="11,8 11,22 14,22 14,8"></polygon><polygon points="19,8 19,22 16,22 16,8"></polygon></g><polygon class="toggle__layer" points="11,8 11,22 22,15"/></svg></button><button class="slider__control  slider__control--stroke    toggle  toggle--brand    js-slider-previous" type="button"><svg class="slider__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><polyline fill="none" points="19,8 9,15 19,22" /></svg></button><button class="slider__control  slider__control--stroke    toggle  toggle--brand    js-slider-next" type="button"><svg class="slider__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 30 30"><polyline fill="none" points="11,8 21,15 11,22" /></svg></button></div>', sliderUI.autoPlay = {}, sliderUI.autoPlay.isPlaying = !0, sliderUI.autoPlay.mode = function(l) {
            var i = sliderUI.slider.data("flickity"),
                s = ".js-slider-autoplay",
                e = "is-active";
            "toggle" === l && (l = sliderUI.autoPlay.isPlaying ? "stop" : "play"), "stop" === l && sliderUI.autoPlay.isPlaying ? (i.player.stop(), $(s).removeClass(e), sliderUI.autoPlay.isPlaying = !1) : "play" !== l || sliderUI.autoPlay.isPlaying || (i.player.play(), $(s).addClass(e), sliderUI.autoPlay.isPlaying = !0)
        }, $(".js-slider-stage").removeClass("slider__stage--loading"), $(".js-slider").prepend(l), $(".js-slider-previous").on("click", function() {
            sliderUI.slider.flickity("previous")
        }), $(".js-slider-next").on("click", function() {
            sliderUI.slider.flickity("next")
        }), $(".js-slider-previous, .js-slider-next").on("click", function() {
            sliderUI.autoPlay.isPlaying && sliderUI.autoPlay.mode("stop")
        }), $(".js-slider-autoplay").on("click", function() {
            sliderUI.autoPlay.mode("toggle")
        }), sliderUI.slider.on("pointerDown", function() {
            sliderUI.autoPlay.isPlaying && sliderUI.autoPlay.mode("stop")
        }), sliderUI.slider.on("cellSelect", function() {
            $(".js-slider-stage .slider__cell a").attr("tabindex", "-1"), $(".js-slider-stage .slider__cell.is-selected a").attr("tabindex", "")
        })
    }, $.getScript(l).done(function() {
        sliderUI.load()
    }).fail(function() {
        $.getScript(i).done(function() {
            sliderUI.load()
        })
    })
}();

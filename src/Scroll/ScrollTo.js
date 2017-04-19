/*

const options = {
    destination: 1000,
    duration: 200,
    ease: 'Power3Out',
    callback: afterTop
}

S.ScrollTo(options)

*/

S.ScrollTo = function (options) {
    var opts = options
    var scrollable = S.Sniffer.isFirefox || S.Sniffer.isIE ? document.documentElement : S.Dom.body
    var initialPosition = S.Win.pageY
    var animation = new S.Merom(scrollable, 'scrollTop', initialPosition, opts.destination, opts.duration, opts.ease, {callback: getCb})

    if (opts.destination === initialPosition) {
        getCb()
    } else {
        S.WTDisable.on()
        animation.play()
    }

    function getCb () {
        S.WTDisable.off()

        if (opts.callback) {
            opts.callback()
        }
    }
}

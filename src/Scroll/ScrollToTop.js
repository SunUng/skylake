/*

EXAMPLE
───────

const options = {
    totalHeight: element.offsetHeight,
    callback: afterTop
}
S.ScrollToTop(options)

*/

S.ScrollToTop = function (options) {
    var opts = options
    var currentPosition = S.Win.pageY
    var scrollToOptions = {
        destination: 0,
        duration: getDuration(),
        ease: getEase(),
        callback: opts.callback
    }

    S.ScrollTo(scrollToOptions)

    function getDuration () {
        var coeff = S.Lerp.init(300, 1500, currentPosition / opts.totalHeight)

        return currentPosition === 0 ? 0 : coeff
    }

    function getEase () {
        var step = 500

        if (currentPosition <= step * 5) {
            return 'Power' + Math.ceil(currentPosition / step) + 'InOut'
        } else {
            return 'ExpoInOut'
        }
    }
}

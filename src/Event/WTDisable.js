/*

S.WTDisable.on()
S.WTDisable.off()

*/

S.WTDisable = (function () {
    var on = function () {
        listeners('add')
    }

    var off = function () {
        listeners('remove')
    }

    function listeners (action) {
        var e = S.Sniffer.isTouch ? 'touchmove' : 'mouseWheel'

        S.Listen(document, action, e, prevent)
    }

    function prevent (e) {
        e.preventDefault()
    }

    return {
        on: on,
        off: off
    }
}())

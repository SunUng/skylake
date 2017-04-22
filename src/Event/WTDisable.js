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
        var t

        if (S.Sniffer.isTouch) {
            var c = action === 'add' ? 'none' : ''
            S.Dom.body.style.touchAction = c
            t = 'touchmove'
        } else {
            t = 'mouseWheel'
        }

        S.Listen(document, action, t, prevent)
    }

    function prevent (e) {
        e.preventDefault()
    }

    return {
        on: on,
        off: off
    }
}())

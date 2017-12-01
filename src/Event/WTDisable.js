/*

S.WTDisable.on()
S.WTDisable.off()

*/

S.WTDisable = {
    prevent: function (e) {
        e.preventDefault()
    },

    listener: function (action) {
        var t

        if (S.Sniffer.isTouch) {
            var c = action === 'add' ? 'none' : ''
            S.Dom.body.style.touchAction = c
            t = 'touchmove'
        } else {
            t = 'mouseWheel'
        }

        S.Listen(document, action, t, this.prevent)
    },

    on: function () {
        this.listener('add')
    },

    off: function () {
        this.listener('remove')
    }
}

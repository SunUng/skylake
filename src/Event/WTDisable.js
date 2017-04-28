/*

S.WTDisable.on()
S.WTDisable.off()

*/

S.WTDisable = {
    prevent: function (e) {
        e.preventDefault()
    },

    listeners: function (action) {
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
        this.listeners('add')
    },

    off: function () {
        this.listeners('remove')
    }
}

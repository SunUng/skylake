/*

S.BindMaker(this, ['wtCb'])

this.WT = new S.WT(this.wtCb)

this.WT.on()
this.WT.off()

wtCb (delta, type, event) {

}

type → 'scroll' or 'touch'

*/

S.WT = function (cb) {
    this.cb = cb
    this.iT = S.Sniffer.isTouch

    this.rafTicking = new S.RafTicking()

    S.BindMaker(this, ['touchStart', 'getRAF', 'run'])
}

S.WT.prototype = {

    on: function () {
        this.listeners('add')
    },

    off: function () {
        this.listeners('remove')
    },

    listeners: function (action) {
        var d = document
        if (this.iT) {
            S.Listen(d, action, 'touchstart', this.touchStart)
            S.Listen(d, action, 'touchmove', this.getRAF)
        } else {
            S.Listen(d, action, 'mouseWheel', this.getRAF)
        }
    },

    getRAF: function (e) {
        this.e = e

        this.e.preventDefault()

        this.rafTicking.start(this.run)
    },

    run: function () {
        var eType = this.e.type

        if (eType === 'wheel') {
            this.onWheel()
        } else if (eType === 'mousewheel') {
            this.onMouseWheel()
        } else if (eType === 'touchmove') {
            this.touchMove()
        }
    },

    onWheel: function () {
        this.type = 'scroll'
        this.delta = this.e.wheelDeltaY || this.e.deltaY * -1

        // deltamode === 1 -> wheel mouse, not touch pad
        // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
        if (S.Sniffer.isFirefox && this.e.deltaMode === 1) {
            this.delta *= 40
        }

        this.getCb()
    },

    onMouseWheel: function () {
        this.type = 'scroll'
        this.delta = (this.e.wheelDeltaY) ? this.e.wheelDeltaY : this.e.wheelDelta

        this.getCb()
    },

    touchStart: function (e) {
        this.start = e.targetTouches[0].pageY
    },

    touchMove: function () {
        this.type = 'touch'
        this.delta = this.e.targetTouches[0].pageY - this.start

        this.getCb()
    },

    getCb: function () {
        this.cb(this.delta, this.type, this.e)
    }

}

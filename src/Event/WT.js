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
    this.iM = S.Sniffer.isMobile
    this.tick = false

    S.BindMaker(this, ['touchStart', 'getRaf', 'run'])
}

S.WT.prototype = {

    on: function () {
        this.listener('add')
    },

    off: function () {
        this.listener('remove')
    },

    listener: function (action) {
        var d = document
        if (this.iM) {
            S.Listen(d, action, 'touchstart', this.touchStart)
            S.Listen(d, action, 'touchmove', this.getRaf)
        } else {
            S.Listen(d, action, 'mouseWheel', this.getRaf)
        }
    },

    getRaf: function (e) {
        this.e = e
        this.e.preventDefault()

        if (!this.tick) {
            this.raf = requestAnimationFrame(this.run)
            this.tick = true
        }
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
        this.tick = false
    }

}

/*

S.BindMaker(this, ['resize'])

this.RO = new S.RO({
    callback: this.resize,
    throttle: {
        delay: 100,
        onlyAtEnd: true
    }
})

this.RO.on()
this.RO.off()

resize () {

}

*/

S.RO = function (options) {
    this.opts = options
    this.cb = this.opts.callback
    this.iT = S.Sniffer.isTouch

    S.BindMaker(this, ['getThrottle', 'getRAF'])

    this.throttle = new S.Throttle({
        callback: this.getRAF,
        delay: this.opts.throttle.delay,
        onlyAtEnd: this.opts.throttle.onlyAtEnd
    })
    this.rafTicking = new S.RafTicking()
}

S.RO.prototype = {

    on: function () {
        this.listeners('add')
    },

    off: function () {
        this.listeners('remove')
    },

    listeners: function (action) {
        if (this.iT) {
            S.Listen(window, action, 'orientationchange', this.getThrottle)
        } else {
            S.Listen(window, action, 'resize', this.getThrottle)
        }
    },

    getThrottle: function () {
        this.throttle.init()
    },

    getRAF: function () {
        this.rafTicking.start(this.cb)
    }

}

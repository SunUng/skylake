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

resize (event) {

}

*/

S.RO = function (opts) {
    this.cb = opts.callback
    this.iT = S.Sniffer.isTouch
    this.tick = false

    S.BindMaker(this, ['getThrottle', 'getRaf', 'run'])

    this.throttle = new S.Throttle({
        callback: this.getRaf,
        delay: opts.throttle.delay,
        onlyAtEnd: opts.throttle.onlyAtEnd
    })
}

S.RO.prototype = {

    on: function () {
        this.listener('add')
    },

    off: function () {
        this.listener('remove')
    },

    listener: function (action) {
        if (this.iT) {
            S.Listen(window, action, 'orientationchange', this.getThrottle)
        } else {
            S.Listen(window, action, 'resize', this.getThrottle)
        }
    },

    getThrottle: function (e) {
        this.e = e
        this.throttle.init()
    },

    getRaf: function () {
        if (!this.tick) {
            this.raf = requestAnimationFrame(this.run)
            this.tick = true
        }
    },

    run: function () {
        this.cb(this.e)
        this.tick = false
    }

}

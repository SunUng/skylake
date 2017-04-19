/*

const scroll = new S.Scroll({
    callback: callback,
    throttle: {
        delay: 200,
        atEnd: true
    }
})

scroll.on()
scroll.off()

function callback (currentScrollY, delta) {

}

*/

S.Scroll = function (options) {
    this.opts = options
    this.cb = this.opts.callback

    S.BindMaker(this, ['getThrottle', 'getRAF', 'run'])

    this.throttle = new S.Throttle({
        callback: this.getRAF,
        delay: this.opts.throttle.delay,
        atEnd: this.opts.throttle.atEnd
    })
    this.rafTicking = new S.RafTicking()
}

S.Scroll.prototype = {

    on: function () {
        this.startScrollY = S.Win.pageY

        this.listeners('add')
    },

    off: function () {
        this.listeners('remove')
    },

    listeners: function (action) {
        S.Listen(window, action, 'scroll', this.getThrottle)
    },

    getThrottle: function () {
        this.throttle.init()
    },

    getRAF: function () {
        this.rafTicking.start(this.run)
    },

    run: function () {
        var currentScrollY = window.pageYOffset
        var delta = -(currentScrollY - this.startScrollY)

        // Reset start scroll y
        this.startScrollY = currentScrollY

        this.cb(currentScrollY, delta)
    }

}

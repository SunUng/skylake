/*

const MM = new S.MM({
    callback: callback,
    throttle: {
        delay: 40,
        onlyAtEnd: false
    }
})

MM.on()
MM.off()

function callback (posX, posY) {

}

*/

S.MM = function (opts) {
    this.opts = options
    this.cb = this.opts.callback

    S.BindMaker(this, ['getThrottle', 'getRAF', 'run'])

    this.throttle = new S.Throttle({
        callback: this.getRAF,
        delay: this.opts.throttle.delay,
        onlyAtEnd: this.opts.throttle.onlyAtEnd
    })
    this.rafTicking = new S.RafTicking()
}

S.MM.prototype = {

    on: function () {
        this.listeners('add')
    },

    off: function () {
        this.listeners('remove')
    },

    listeners: function (action) {
        S.Listen(document, action, 'mousemove', this.getThrottle)
    },

    getThrottle: function () {
        this.throttle.init()
    },

    getRAF: function (e) {
        this.e = e

        this.rafTicking.start(this.run)
    },

    run: function () {
        const posX = this.e.pageX
        const posY = this.e.pageY

        this.cb(posX, posY)
    }

}

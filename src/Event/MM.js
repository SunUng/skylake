/*

►►►  element is optional

S.BindMaker(this, ['mmCb'])

this.MM = new S.MM({
    element: '#element',
    callback: this.mmCb,
    throttle: {
        delay: 40,
        onlyAtEnd: false
    }
})

this.MM.on()
this.MM.off()

mmCb (posX, posY) {

}

*/

S.MM = function (options) {
    this.opts = options
    this.el = S.Selector.el(this.opts.element)[0] || document
    this.cb = this.opts.callback
    this.iT = S.Sniffer.isTouch

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
        var e = this.iT ? 'touch' : 'mouse'
        S.Listen(this.el, action, e + 'move', this.getThrottle)
    },

    getThrottle: function (e) {
        this.e = e

        this.throttle.init()
    },

    getRAF: function (e) {
        this.rafTicking.start(this.run)
    },

    run: function () {
        var posX = this.e.pageX
        var posY = this.e.pageY

        this.cb(posX, posY)
    }

}

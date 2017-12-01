/*

►►►  element is optional

S.BindMaker(this, ['mmCb'])

this.MM = new S.MM({
    element: '#element',
    callback: this.mmCb
})

this.MM.on()
this.MM.off()

mmCb (posX, posY, event) {

}

*/

S.MM = function (opts) {
    this.el = S.Selector.el(opts.element)[0] || document
    this.cb = opts.callback
    this.iT = S.Sniffer.isTouch
    this.tick = false

    S.BindMaker(this, ['getRaf', 'run'])
}

S.MM.prototype = {

    on: function () {
        this.listener('add')
    },

    off: function () {
        this.listener('remove')
    },

    listener: function (action) {
        var type = this.iT ? 'touch' : 'mouse'
        S.Listen(this.el, action, type + 'move', this.getRaf)
    },

    getRaf: function (e) {
        this.e = e

        if (!this.tick) {
            this.raf = requestAnimationFrame(this.run)
            this.tick = true
        }
    },

    run: function () {
        var t = this.iT ? this.e.changedTouches[0] : this.e

        this.cb(t['pageX'], t['pageY'], this.e)
        this.tick = false
    }

}

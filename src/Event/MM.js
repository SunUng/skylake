/*

►►►  element is optional

S.BindMaker(this, ['mmCb'])

this.MM = new S.MM({
    element: '#element',
    cb: this.mmCb
})

this.MM.on()
this.MM.off()

mmCb (posX, posY, event) {

}

*/

S.MM = function (opts) {
    this.el = S.Selector.el(opts.element)[0] || document
    this.cb = opts.cb
    this.iM = S.Snif.isMobile
    this.tick = false

    S.BindMaker(this, ['getRaf', 'run'])
}

S.MM.prototype = {

    on: function () {
        this.l('add')
    },

    off: function () {
        this.l('remove')
    },

    l: function (action) {
        var type = this.iM ? 'touch' : 'mouse'
        S.L(this.el, action, type + 'move', this.getRaf)
    },

    getRaf: function (e) {
        this.e = e

        if (!this.tick) {
            this.raf = requestAnimationFrame(this.run)
            this.tick = true
        }
    },

    run: function () {
        var t = this.iM ? this.e.changedTouches[0] : this.e

        this.cb(t['pageX'], t['pageY'], this.e)
        this.tick = false
    }

}

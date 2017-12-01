/*

S.BindMaker(this, ['scrollCb'])

this.scroll = new S.Scroll(this.scrollCb)

this.scroll.on()
this.scroll.off()

scrollCb (currentScrollY, delta, event) {

}

*/

S.Scroll = function (cb) {
    this.cb = cb
    this.tick = false

    S.BindMaker(this, ['getRaf', 'run'])
}

S.Scroll.prototype = {

    on: function () {
        this.startScrollY = pageYOffset

        this.listener('add')
    },

    off: function () {
        this.listener('remove')
    },

    listener: function (action) {
        S.Listen(window, action, 'scroll', this.getRaf)
    },

    getRaf: function (e) {
        this.e = e

        if (!this.tick) {
            this.raf = requestAnimationFrame(this.run)
            this.tick = true
        }
    },

    run: function () {
        var currentScrollY = pageYOffset
        var delta = -(currentScrollY - this.startScrollY)

        // Reset start scroll y
        this.startScrollY = currentScrollY

        this.cb(currentScrollY, delta, this.e)
        this.tick = false
    }

}

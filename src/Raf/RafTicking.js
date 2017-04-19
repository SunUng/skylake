/*

►►►  Auto destroy after callback but can destroy manually if necessary

const rafTicking = new S.RafTicking()

rafTicking.start(callback)
rafTicking.destroy()

*/

S.RafTicking = function () {
    this.ticking = false
    this.rafIndex = new S.RafIndex()
    S.BindMaker(this, ['getCb'])
}

S.RafTicking.prototype = {

    start: function (cb) {
        this.cb = cb

        if (!this.ticking) {
            this.ticking = true
            this.rafIndex.start(this.getCb)
        }
    },

    getCb: function () {
        this.cb()
        this.destroy()
    },

    destroy: function () {
        this.rafIndex.cancel()
        this.ticking = false
    }

}

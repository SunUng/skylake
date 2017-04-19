/*

const MM = new S.MM(callback)

MM.on()
MM.off()

function callback (posX, posY) {

}

*/

S.MM = function (cb) {
    this.cb = cb
    this.posX = 0
    this.posY = 0

    this.rafTicking = new S.RafTicking()

    S.BindMaker(this, ['getRAF', 'run'])
}

S.MM.prototype = {

    on: function () {
        this.listeners('add')
    },

    off: function () {
        this.listeners('remove')
    },

    listeners: function (action) {
        S.Listen(document, action, 'mousemove', this.getRAF)
    },

    getRAF: function (e) {
        this.e = e

        this.rafTicking.start(this.run)
    },

    run: function () {
        this.posX = this.e.pageX
        this.posY = this.e.pageY

        this.cb(this.posX, this.posY)
    }

}

/*

►►►  Need two instances in zoom so no module pattern

const rafIndex = new S.RafIndex()

rafIndex.start(callback)
rafIndex.cancel()

*/

S.RafIndex = function () {

    this.start = function (cb) {
        this.rafCb = S.Raf(cb)
    }

    this.cancel = function () {
        window.cancelAnimationFrame(this.rafCb)
    }
}

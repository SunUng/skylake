/*

this.d = new S.Delay(callback, duration)
this.d.stop()

*/

S.Delay = function (cb, duration) {
    this.t = window.setTimeout(cb, duration)
}

S.Delay.prototype = {

    stop: function () {
        window.clearTimeout(this.t)
    }
}
